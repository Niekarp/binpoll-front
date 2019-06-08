import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { SharedConfig } from '../../config/shared-config';
import { MatSnackBar, MatDialog } from '@angular/material';
import { FurtherHelpDialogComponent } from '../headphones-test/further-help-dialog/further-help-dialog.component';
import { ApiClientService } from '../../services/api-client/api-client.service';
import { AudioService } from 'src/app/services/audio/audio.service';
import { PlayAudioButtonComponent } from 'src/app/common/ui-elements/play-audio-button/play-audio-button.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-poll-page',
  templateUrl: './poll-page.component.html',
  styleUrls: ['./poll-page.component.scss']
})
export class PollPageComponent implements OnInit {

  @ViewChild('audioButton') audioButton: PlayAudioButtonComponent;
  @ViewChild('spinnerText') spinnerText: ElementRef;

  public testCount: number;
  public currentTestIndex: number = 0;
  private selectedScene: string = null;
  private answers: string[] = new Array(this.testCount);
  private selectedAudio: string[] = new Array(this.testCount);
  private wasAudioPlayed = false;
  private startDate: Date;

  constructor(public sharedConfig: SharedConfig, 
              public snackbar: MatSnackBar,
              public dialog: MatDialog,
              public apiClient: ApiClientService,
              public audio: AudioService,
              private router: Router,
              private spinner: NgxSpinnerService) {
    this.testCount = sharedConfig.testCount;
    
    console.log('start poll');
    this.startDate = new Date();
  }
  
  ngOnInit() {
    for(let i = 0; i < this.testCount; ++i) {
      this.answers[i] = 'none';
    }
    this.audio.loadAudioPlayers();

    if (this.audio.isAllPollAudioLoaded() === false) {
      setTimeout(() => {
        this.spinner.show();
      }, 100);

      this.audio.notifyOnAllPollAudioLoaded(() => { 
        console.log('audio loaded'); 
        this.spinner.hide();
      }, () => { 
        this.spinnerText.nativeElement.innerText = this.audio.getPollLoadingProgressPercentage() + '%';
      }, () => {
        console.error('loading audio timeout') 
      });
    }
  }

  public onAudioButtonClick() {
    this.audioButton.toggle();
    this.audio.togglePollAudio(this.currentTestIndex);
    this.wasAudioPlayed = true;
  }

  public selectScene(selectedSceneButton: HTMLElement): void {
    this.unselectScenes();

    selectedSceneButton.getElementsByTagName('img').item(0).classList.remove('grayscale');
    selectedSceneButton.getElementsByTagName('img').item(0).classList.add('selected-border');

    this.selectedScene = selectedSceneButton.id;
    this.answers[this.currentTestIndex] = this.selectedScene;
  }

  public unselectScenes() {
    let selectSceneButtons = document.getElementsByClassName('scene-select-button');
    for (let i = 0; i < selectSceneButtons.length; ++i) {
      selectSceneButtons.item(i).getElementsByTagName('img').item(0).classList.add('grayscale');
      selectSceneButtons.item(i).getElementsByTagName('img').item(0).classList.remove('selected-border');
    }
  }

  public goToNextTest() {
    if (this.answers[this.currentTestIndex] === 'none') {
      this.showMessage('select acoustic scene');
      return;
    }
    else if (this.wasAudioPlayed === false) {
      this.showMessage('audio wasn\'t played');
      return;
    }

    let isAudioPlaying = !this.audio.getPollAudio(this.currentTestIndex).paused;

    this.unselectScenes();
    this.audio.pauseAllPollAudio();
    this.currentTestIndex += 1;

    if (this.currentTestIndex === this.testCount) {
      // save results 
      this.apiClient.sendPollData({
        startDate: this.startDate,
        endDate: new Date(),
        answer: this.answers,
        assignedSetId: this.audio.pollAudioSetId
      });
      this.router.navigate(['finish']);
      return;
    } 
    else {
      if(isAudioPlaying) {
        this.audio.playPollAudio(this.currentTestIndex);
      }
    }
    
    if (this.answers[this.currentTestIndex] !== 'none') {
      this.selectScene(document.getElementById(this.answers[this.currentTestIndex]));
      this.wasAudioPlayed = true;
    }
    else if (this.audio.getPollAudio(this.currentTestIndex).paused === false) {
      this.wasAudioPlayed = true;
    }
    else {
      this.wasAudioPlayed = false;
    }
  }

  public goToPreviousTest(): void {
    let isAudioPlaying = !this.audio.getPollAudio(this.currentTestIndex).paused;

    this.unselectScenes();
    this.audio.pauseAllPollAudio();
    this.currentTestIndex -= 1;

    if (this.currentTestIndex === -1) {
      // save results
      this.router.navigate(['headphones-test']);
      return;
    } 
    else {
      if(isAudioPlaying) {
        this.audio.playPollAudio(this.currentTestIndex);
      }
    }

    if (this.answers[this.currentTestIndex] !== 'none') {
      this.selectScene(document.getElementById(this.answers[this.currentTestIndex]));
      this.wasAudioPlayed = true;
    }
  }

  public onFurtherHelpClick() {
    this.turnOffTheAudio();
    const dialogRef = this.dialog.open(FurtherHelpDialogComponent, {
      height: '600px',
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.turnOffTheAudio();
    });
  }

  private turnOffTheAudio() {
    this.audioButton.pause();
    this.audio.pauseAllPollAudio();
  }

  private showMessage(msg: string) {
    this.snackbar.open(msg, null, {
      duration: 2000,
      verticalPosition: "top",
      panelClass: ['my-snackbar'],
    });
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.audio.isAllPollAudioLoaded() === false) return;

    if (event.key === 'ArrowLeft') {
      this.goToPreviousTest();
    }
    else if (event.key === 'ArrowRight') {
      this.goToNextTest();
    }
    else if (event.key === ' ') {
      this.onAudioButtonClick();
    }
  }
}
