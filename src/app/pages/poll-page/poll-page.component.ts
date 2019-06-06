import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { SharedConfig } from '../../config/shared-config';
import { MatSnackBar, MatDialog } from '@angular/material';
import { FurtherHelpDialogComponent } from '../headphones-test/further-help-dialog/further-help-dialog.component';
import { ApiClientService } from '../../services/api-client/api-client.service';
import { AudioService } from 'src/app/services/audio/audio.service';

@Component({
  selector: 'app-poll-page',
  templateUrl: './poll-page.component.html',
  styleUrls: ['./poll-page.component.scss']
})
export class PollPageComponent implements OnInit {

  public testCount: number;
  public currentTestIndex: number = 0;
  private selectedScene: string = null;
  private answers: string[] = new Array(this.testCount);
  private selectedAudio: string[] = new Array(this.testCount);
  private wasAudioPlayed = false;
  private startDate: Date;

  constructor(private router: Router, 
              public sharedConfig: SharedConfig, 
              public snackbar: MatSnackBar,
              public dialog: MatDialog,
              public apiClient: ApiClientService,
              public audio: AudioService) {
    this.testCount = sharedConfig.testCount;
    
    console.log('start poll');
    this.startDate = new Date();
  }
  
  ngOnInit() {
    for(let i = 0; i < this.testCount; ++i) {
      this.answers[i] = 'none';
    }
    this.audio.loadAudioPlayers();
    this.updateCurrentAudio();
  }

  private showMessage(msg: string) {
    this.snackbar.open(msg, null, {
      duration: 2000,
      verticalPosition: "top",
      panelClass: ['my-snackbar'],
    });
  }

  public toggleAudio(): void {
    this.audio.togglePollAudio(this.currentTestIndex);
    this.wasAudioPlayed = true;
    this.updateCurrentAudio()
  }

  public selectScene(selectedSceneButton: HTMLElement): void {
    this.unselectScenes();
    // selectedSceneButton.style.backgroundColor = 'green';
    selectedSceneButton.getElementsByTagName('img').item(0).classList.remove('grayscale');
    selectedSceneButton.getElementsByTagName('img').item(0).classList.add('selected-border');

    this.selectedScene = selectedSceneButton.id;
    this.answers[this.currentTestIndex] = this.selectedScene;
  }

  public goToNextTest(): void {
    if (this.answers[this.currentTestIndex] === 'none') {
      this.showMessage('select acoustic scene');
      return;
    }
    else if (this.wasAudioPlayed === false) {
      this.showMessage('audio wasn\'t played');
      return;
    }

    this.unselectScenes();
    this.currentTestIndex += 1;

    if (this.currentTestIndex === this.testCount) {
      // save results 
      this.apiClient.sendPollData({
        startDate: this.startDate,
        endDate: new Date(),
        answer: this.answers,
        assignedSetId: this.audio.pollAudioSetId
      });
      this.audio.pauseAllPollAudio();
      this.router.navigate(['finish']);
      return;
    } else if(this.currentTestIndex >= 1) {
      if(!this.audio.getPollAudio(this.currentTestIndex - 1).paused) {
        this.audio.playPollAudio(this.currentTestIndex);
      }
    }
    this.updateCurrentAudio();
    
    console.log(this.audio.getPollAudio(this.currentTestIndex).paused);
    if (this.answers[this.currentTestIndex] !== 'none') {
      this.selectScene(document.getElementById(this.answers[this.currentTestIndex]));
      this.wasAudioPlayed = true;
      // console.log('if');
    }
    else if (this.audio.getPollAudio(this.currentTestIndex).paused === false) {
      this.wasAudioPlayed = true;
      // console.log('else if');
    }
    else {
      this.wasAudioPlayed = false;
      // console.log('else');
    }
  }

  public goToPreviousTest(): void {
    this.unselectScenes();
    this.currentTestIndex -= 1;

    if (this.currentTestIndex === -1) {
      // save results
      this.audio.pauseAllPollAudio();
      this.router.navigate(['headphones-test']);
      return;
    } else {
      if(!this.audio.getPollAudio(this.currentTestIndex + 1).paused) {
        this.audio.playPollAudio(this.currentTestIndex);
      }
    }
    this.updateCurrentAudio();

    if (this.answers[this.currentTestIndex] !== 'none') {
      this.selectScene(document.getElementById(this.answers[this.currentTestIndex]));
      this.wasAudioPlayed = true;
    }
  }

  private updateCurrentAudio(): void {
    const iconId = 'audio-icon';
    if (this.audio.getPollAudio(this.currentTestIndex).paused) {
      document.getElementById(iconId).textContent = 'play_circle_outline';
    }
    else {
      document.getElementById(iconId).textContent = 'paused';
    }
  }

  private unselectScenes(): void {
    let selectSceneButtons = document.getElementsByClassName('scene-select-button');
    for (let i = 0; i < selectSceneButtons.length; ++i) {
      // selectSceneButtons.item(i).setAttribute('style', 'background-color: gray');
      selectSceneButtons.item(i).getElementsByTagName('img').item(0).classList.add('grayscale');
      selectSceneButtons.item(i).getElementsByTagName('img').item(0).classList.remove('selected-border');
    }
  }

  private turnOffTheAudio() {
    this.audio.pauseAllPollAudio();
    document.getElementById('audio-icon').textContent = 'play_circle_outline';
  }


  public onFurtherHelpClick() {
    this.turnOffTheAudio();
    const dialogRef = this.dialog.open(FurtherHelpDialogComponent, {
      height: '600px',
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(() => {
      // this.audio.pause();
      this.turnOffTheAudio();
    });
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.goToPreviousTest();
    }
    else if (event.key === 'ArrowRight') {
      this.goToNextTest();
    }
    else if (event.key === ' ') {
      document.getElementById('audio-button').blur();
      
      for (let i = 0; i < document.getElementsByClassName('scene-select-button').length; ++i) {
        (document.getElementsByClassName('scene-select-button').item(i) as HTMLElement).blur();
      }
      this.toggleAudio();
    }
  }

  private shuffle(array): Array<any> {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
}
