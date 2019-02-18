import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poll-page',
  templateUrl: './poll-page.component.html',
  styleUrls: ['./poll-page.component.scss']
})
export class PollPageComponent implements OnInit {

  public testCount: number = 28;
  public currentTestNumber: number = 1;
  private audio = new Audio();
  private selectedScene: string = null;

  constructor(private router: Router) { }

  ngOnInit() {
    this.audio.src = './../../assets/headphones test sounds/Hungarian_1_hrtf4_sector2.wav';
    this.audio.load();
    // this.audio.loop = true;
    this.audio.play();
  }

  public selectScene(selectedSceneButton: HTMLElement): void {
    this.unselectScenes();
    selectedSceneButton.style.backgroundColor = 'green';

    this.selectedScene = selectedSceneButton.textContent;
  }

  public goToNextTest(): void {
    this.unselectScenes();
    this.currentTestNumber += 1;

    if (this.currentTestNumber == this.testCount + 1) {
      // save results
      this.router.navigate(['finish']);
    }
  }

  public goToPreviousTest(): void {
    this.unselectScenes();
    this.currentTestNumber -= 1;

    if (this.currentTestNumber == 0) {
      // save results
      this.router.navigate(['headphones-test']);
    }
  }

  private unselectScenes(): void {
    let selectSceneButtons = document.getElementsByClassName('scene-select-button');
    for (let i = 0; i < selectSceneButtons.length; ++i) {
      selectSceneButtons.item(i).setAttribute('style', 'background-color: gray');
    }
  }
}
