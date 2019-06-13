import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terms-back-scene-page',
  templateUrl: './terms-back-scene-page.component.html',
  styleUrls: ['./terms-back-scene-page.component.scss']
})
export class TermsBackScenePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      // this.goToPreviousPage();
    }
    else if (event.key === 'ArrowRight') {
      // this.gotoNextPage();
    }
  }
}
