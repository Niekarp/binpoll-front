import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terms-all-around-scene-page',
  templateUrl: './terms-all-around-scene-page.component.html',
  styleUrls: ['./terms-all-around-scene-page.component.scss']
})
export class TermsAllAroundScenePageComponent implements OnInit {

  constructor(private router: Router) { }

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
