import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { SharedConfig } from '../../config/shared-config';
import { MatSnackBar, MatDialog } from '@angular/material';
import { FurtherHelpDialogComponent } from '../headphones-test/further-help-dialog/further-help-dialog.component';
import { ApiClientService } from '../../api_client/api-client.service';

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
              public apiClient: ApiClientService) {
    this.testCount = sharedConfig.testCount;
    
    console.log('start poll');
    this.startDate = new Date();
  }

  ngOnInit() {
    for(let i = 0; i < this.testCount; ++i) {
      this.answers[i] = 'none';
    }
    this.selectedAudio = this.shuffle(this.soundsFilenames).concat(this.shuffle(this.soundsFilenames));

    /* let randedRands = new Array(15);
    for (let i = 0; i < 15;) {
      let newRand = this.soundsFilenames[Math.floor(Math.random() * this.soundsFilenames.length)];
      console.log(newRand, '::', randedRands)
      if (newRand.includes(newRand) === false) {
        randedRands.push(newRand);
        this.selectedAudio[i] = newRand;
        ++i;
        console.log(i);
      }
    }

    randedRands = new Array(15);
    for (let i = 15; i < 30; ++i) {
      let newRand = this.soundsFilenames[Math.floor(Math.random() * this.soundsFilenames.length)];
      if (newRand.includes(newRand) === false) {
        randedRands.push(newRand);
        this.selectedAudio[i] = newRand;
        ++i;
      }
    }
 */

    this.audio.loop = true;
    this.updateCurrentAudio();
  }

  public toggleAudio(): void {
    if (this.audio.paused) {
      this.audio.play();
      this.wasAudioPlayed = true;
      // this.audioOn = false;
    }
    else {
      this.audio.pause();
      // this.audioOn = true;
    }
    const iconId = 'audio-icon';
    if (document.getElementById(iconId).textContent === 'play_circle_outline') {
      document.getElementById(iconId).textContent = 'pause';
    }
    else {
      document.getElementById(iconId).textContent = 'play_circle_outline';
    }
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
      this.snackbar.open('select acoustic scene', null, {
        duration: 2000,
        verticalPosition: "top",
        panelClass: ['my-snackbar']
      });
      return;
    }
    else if (this.wasAudioPlayed === false) {
      this.snackbar.open("audio wasn't played", null, {
        duration: 2000,
        verticalPosition: "top",
        panelClass: ['my-snackbar']
      });
      return;
    }

    this.unselectScenes();
    this.currentTestIndex += 1;

    if (this.currentTestIndex === this.testCount) {
      // save results 
      let pollData: PollData = {
        startDate: this.startDate,
        endDate: new Date(),
        answer: this.answers,
        assignedSetId: 0
      };
      this.apiClient.sendPollData(pollData);
      this.audio.pause();
      this.router.navigate(['finish']);
      return;
    }
    this.updateCurrentAudio();
    
    console.log(this.audio.paused);
    if (this.answers[this.currentTestIndex] !== 'none') {
      this.selectScene(document.getElementById(this.answers[this.currentTestIndex]));
      this.wasAudioPlayed = true;
      // console.log('if');
    }
    else if (this.audio.paused === false) {
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
      this.audio.pause();
      this.router.navigate(['headphones-test']);
      return;
    }
    this.updateCurrentAudio();

    if (this.answers[this.currentTestIndex] !== 'none') {
      this.selectScene(document.getElementById(this.answers[this.currentTestIndex]));
      this.wasAudioPlayed = true;
    }
  }

  private updateCurrentAudio(): void {
    const state = this.audio.paused;
    this.audio.pause();
    this.audio.src = this.selectedAudio[this.currentTestIndex];
    this.audio.load();
  
    if (state === false) {
      this.audio.play();
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
    this.audio.pause();
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
