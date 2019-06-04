import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { FurtherHelpDialogComponent } from './further-help-dialog/further-help-dialog.component';
import { AudioService } from 'src/app/services/audio/audio.service';

enum CHANNELS {
  left, right, none
}

@Component({
  selector: 'app-headphones-test',
  templateUrl: './headphones-test.component.html',
  styleUrls: ['./headphones-test.component.scss']
})
export class HeadphonesTestComponent implements OnInit {

  // private leftChannelAudio = new Audio();
  // private rightChannelAudio = new Audio();
  // private currentChannel = CHANNELS.none;

  constructor(private router: Router, private dialog: MatDialog, private audio: AudioService) { }

  ngOnInit() {
    this.audio.loadAudioPlayers();
  }

  gotoNextPage() {
    this.audio.testAudio();
  }

  goToPreviousPage() {
    this.router.navigate(['/finish']);
  }
  /*
  ngOnInit() {
    this.loadTestAudio(this.leftChannelAudio, "Hungarian_1_hrtf4_sector2.wav");
    this.loadTestAudio(this.rightChannelAudio, "Hungarian_1_hrtf4_sector4.wav");
    this.leftChannelAudio.onended = () => {
      this.toggleTestAudioIcon(CHANNELS.left);
    }
    this.rightChannelAudio.onended = () => {
      this.toggleTestAudioIcon(CHANNELS.right);
    }
  }

  public toggleLeftChannelTest(): void {
    if (this.currentChannel !== CHANNELS.left) {
      if (this.rightChannelAudio.paused === false) {
        this.toggleTestAudio(CHANNELS.right);
        this.toggleTestAudioIcon(CHANNELS.right);
      }
      this.currentChannel = CHANNELS.left;
    }
    this.toggleTestAudio(CHANNELS.left);
    this.toggleTestAudioIcon(CHANNELS.left);
  }

  public toggleRightChannelTest(): void {
    if (this.currentChannel !== CHANNELS.right) {
      if (this.leftChannelAudio.paused === false) {
        this.toggleTestAudio(CHANNELS.left);
        this.toggleTestAudioIcon(CHANNELS.left);
      }
      this.currentChannel = CHANNELS.right;
    }
    this.toggleTestAudio(CHANNELS.right);
    this.toggleTestAudioIcon(CHANNELS.right);
  }

  private toggleTestAudio(channel: CHANNELS): void {
    if (channel === CHANNELS.left) {
      if (this.leftChannelAudio.paused) {
        this.leftChannelAudio.play();
      }
      else {
        this.leftChannelAudio.pause();
      }
    }
    else {
      if (this.rightChannelAudio.paused) {
        this.rightChannelAudio.play();
      }
      else {
        this.rightChannelAudio.pause();
      }
    }
  }

  private toggleTestAudioIcon(channel: CHANNELS): void {
    let iconId;
    if (channel === CHANNELS.left) {
      iconId = 'left-icon';
    }
    else {
      iconId = 'right-icon';
    }

    if (document.getElementById(iconId).textContent === 'play_circle_outline') {
      document.getElementById(iconId).textContent = 'pause';
    }
    else {
      document.getElementById(iconId).textContent = 'play_circle_outline';
    }
  }

  private loadTestAudio(audio: HTMLAudioElement, filename: string): void {
    audio.src = './../../assets/headphones test sounds/' + filename;
    audio.load();
  }

  private turnOffTheAudio() {
    this.leftChannelAudio.pause();
    this.rightChannelAudio.pause();
    document.getElementById('left-icon').textContent = 'play_circle_outline';
    document.getElementById('right-icon').textContent = 'play_circle_outline';
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


  goToPreviousPage() {
    this.leftChannelAudio.pause();
    this.rightChannelAudio.pause();
    this.router.navigate(['/terms-all-around-scene']);
  }

  gotoNextPage() {
    this.leftChannelAudio.pause();
    this.rightChannelAudio.pause();
    this.router.navigate(['/poll']);
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.goToPreviousPage();
    }
    else if (event.key === 'ArrowRight') {
      this.gotoNextPage();
    }
  }
   */
}
