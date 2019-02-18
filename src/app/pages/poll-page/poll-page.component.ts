import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-poll-page',
  templateUrl: './poll-page.component.html',
  styleUrls: ['./poll-page.component.scss']
})
export class PollPageComponent implements OnInit {
  
  public testCount: number = 28;
  public currentTestNumber: number = 1;
  private selectedScene: string = null;

  constructor() { }

  ngOnInit() {
  }

  public selectScene(selectedSceneButton: HTMLElement) {
    this.unselectScenes();
    selectedSceneButton.style.backgroundColor = 'green';

    this.selectedScene = selectedSceneButton.textContent;
  }

  private unselectScenes() {
    let selectSceneButtons = document.getElementsByClassName('scene-select-button');
    for (let i = 0; i < selectSceneButtons.length; ++i) {
      selectSceneButtons.item(i).setAttribute('style', 'background-color: gray');
    }
  }
}
