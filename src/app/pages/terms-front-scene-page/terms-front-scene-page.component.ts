import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terms-front-scene-page',
  templateUrl: './terms-front-scene-page.component.html',
  styleUrls: ['./terms-front-scene-page.component.scss']
})
export class TermsFrontScenePageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToPreviousPage() {
    this.router.navigateByUrl('/poll-description', { skipLocationChange: true });
  }

  gotoNextPage() {
    this.router.navigateByUrl('/terms-back-scene', { skipLocationChange: true });
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
