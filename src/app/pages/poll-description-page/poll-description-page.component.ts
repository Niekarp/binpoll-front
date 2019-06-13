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

  constructor(public sharedConfig: SharedConfig) {
    this.testCount = sharedConfig.testCount;
  }

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
