import { Component, OnInit, HostListener } from '@angular/core';
import { SharedConfig } from '../../config/shared-config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  private testCount: number;
  private appVersion: number;

  constructor(private router: Router, public sharedConfig: SharedConfig) { 
    this.appVersion = sharedConfig.appVersion;
    this.testCount = sharedConfig.testCount;
   }

  ngOnInit() {
  }

  gotoNextPage() {
    this.router.navigate(['/questionnaire']);
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') {
      this.gotoNextPage();
    }
  }
}
