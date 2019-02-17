import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-headphones-test',
  templateUrl: './headphones-test.component.html',
  styleUrls: ['./headphones-test.component.scss']
})
export class HeadphonesTestComponent implements OnInit {
  private audio = new Audio();

  constructor() { }

  ngOnInit() {
  }

  public playLeftChannelTest(): void {
    this.playTestAudio("Hungarian_1_hrtf4_sector2.wav");
  }

  public playRightChannelTest(): void {
    this.playTestAudio("Hungarian_1_hrtf4_sector4.wav");
  }

  private playTestAudio(filename: string): void {
    this.audio.src = './../../assets/headphones test sounds/' + filename;
    this.audio.load();
    this.audio.play();
  }
}
