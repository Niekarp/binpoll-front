import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { FurtherHelpDialogComponent } from './further-help-dialog/further-help-dialog.component';
import { AudioService } from 'src/app/services/audio/audio.service';
import { PlayAudioButtonComponent } from 'src/app/common/ui-elements/play-audio-button/play-audio-button.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-headphones-test',
  templateUrl: './headphones-test.component.html',
  styleUrls: ['./headphones-test.component.scss']
})
export class HeadphonesTestComponent implements OnInit {

  @ViewChild('leftAudioButton')  leftAudioButton:  PlayAudioButtonComponent;
  @ViewChild('rightAudioButton') rightAudioButton: PlayAudioButtonComponent;
  @ViewChild('spinnerText') spinnerText: ElementRef;

  constructor(private router: Router,
              private dialog: MatDialog,
              private audio: AudioService,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.audio.loadAudioPlayers();

    if (this.audio.isAllAudioLoaded() === false) {
      setTimeout(() => {
        this.spinner.show();
      }, 100);

      this.audio.notifyOnAllAudioLoaded(() => { 
        console.log('audio loaded'); 
        this.spinner.hide();
      }, () => { 
        this.spinnerText.nativeElement.innerText = this.audio.getLoadingProgressPercentage() + '%';
      }, () => {
        console.log('timeout') 
      });
    }

    this.audio.headphonesTestLeftChannelAudio.onended = () => {
      console.log('left audio stopped');
      this.leftAudioButton.toggle();
    }
    this.audio.headphonesTestRightChannelAudio.onended = () => {
      this.rightAudioButton.toggle();
    }
  }

  public onLeftAudioButtonClick() {
    if (this.audio.headphonesTestRightChannelAudio.paused === false) this.toggleRightAudioButtonAndAudio();
    this.toggleLeftAudioButtonAndAudio();
  }

  public onRightAudioButtonClick() {
    if (this.audio.headphonesTestLeftChannelAudio.paused === false) this.toggleLeftAudioButtonAndAudio();
    this.toggleRightAudioButtonAndAudio();
  }

  public toggleLeftAudioButtonAndAudio() {
    this.leftAudioButton.toggle();
    this.audio.toggleHeadphonesTestLeftChannelAudio();
  }

  public toggleRightAudioButtonAndAudio() {
    this.rightAudioButton.toggle();
    this.audio.toggleHeadphonesTestRightChannelAudio();
  }

  public onFurtherHelpClick() {
    this.audio.pauseHeadphonesTestAudio();

    const dialogRef = this.dialog.open(FurtherHelpDialogComponent, {
      height: '600px',
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.audio.pauseHeadphonesTestAudio();
    });
  }

  goToPreviousPage() {
    this.audio.pauseHeadphonesTestAudio();
    this.router.navigate(['/terms-all-around-scene']);
  }

  gotoNextPage() {
    this.audio.pauseHeadphonesTestAudio();
    this.router.navigate(['/poll']);
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft')       this.goToPreviousPage();
    else if (event.key === 'ArrowRight') this.gotoNextPage();
  }
}
