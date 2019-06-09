import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { SharedConfig } from 'src/app/config/shared-config';

@Component({
  selector: 'app-poll-description-page',
  templateUrl: './poll-description-page.component.html',
  styleUrls: ['./poll-description-page.component.scss']
})
export class PollDescriptionPageComponent implements OnInit {

  private testCount: number;

  constructor(private router: Router, public sharedConfig: SharedConfig) {
    this.testCount = sharedConfig.testCount;
  }

  ngOnInit() {
  }

  goToPreviousPage() {
    this.router.navigateByUrl('/questionnaire', { skipLocationChange: true });
  }

  gotoNextPage() {
    this.router.navigateByUrl('/terms-front-scene', { skipLocationChange: true });
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
