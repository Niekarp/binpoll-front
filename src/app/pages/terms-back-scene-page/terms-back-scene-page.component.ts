import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terms-back-scene-page',
  templateUrl: './terms-back-scene-page.component.html',
  styleUrls: ['./terms-back-scene-page.component.scss']
})
export class TermsBackScenePageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToPreviousPage() {
    this.router.navigateByUrl('/terms-front-scene', { skipLocationChange: true });
  }

  gotoNextPage() {
    this.router.navigateByUrl('/terms-all-around-scene', { skipLocationChange: true });
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
