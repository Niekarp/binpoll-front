import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-headphones-test',
  templateUrl: './headphones-test.component.html',
  styleUrls: ['./headphones-test.component.scss']
})
export class HeadphonesTestComponent implements OnInit {

  private audio = new Audio();
  private currentChannel: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public playLeftChannelTest(): void {
    if (this.currentChannel !== 'left') {
      this.playTestAudio("Hungarian_1_hrtf4_sector2.wav");
      this.currentChannel = 'left';
    }
    else if (this.audio.paused) {
      this.audio.play();
    }
    else {
      this.audio.pause();
    }
  }

  public playRightChannelTest(): void {
    if (this.currentChannel !== 'right') {
      this.playTestAudio("Hungarian_1_hrtf4_sector4.wav");
      this.currentChannel = 'right';
    }
    else if (this.audio.paused) {
      this.audio.play();
    }
    else {
      this.audio.pause();
    }
  }

  private playTestAudio(filename: string): void {
    this.audio.src = './../../assets/headphones test sounds/' + filename;
    this.audio.load();
    this.audio.play();
  }

  goToPreviousPage() {
    this.router.navigate(['/terms-all-around-scene']);
  }

  gotoNextPage() {
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
}
