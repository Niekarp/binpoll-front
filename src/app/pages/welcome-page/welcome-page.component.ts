import { Component, OnInit, HostListener } from '@angular/core';
import { SharedConfig } from '../../config/shared-config';
import { Router } from '@angular/router';
import { MatCheckboxChange, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  public consentChecked: boolean = false;
  public testCount: number;
  public appVersion: string;

  constructor(private router: Router, public sharedConfig: SharedConfig, public snackbar: MatSnackBar) { 
    this.appVersion = sharedConfig.appVersion;
    this.testCount = sharedConfig.testCount;
   }

  ngOnInit() {
    console.log('test');
    this.router.initialNavigation();
    sessionStorage.clear();
  }

  public onConsentCheckboxChange(change: MatCheckboxChange) {
    if (change.checked) {
      (document.getElementsByClassName('navigation-button').item(0) as HTMLElement).style.backgroundColor = 'rgb(91, 155, 213)';
    }
    else {
      (document.getElementsByClassName('navigation-button').item(0) as HTMLElement).style.backgroundColor = 'gray';
    }
  }

  goToNextPageIfConsentIsGiven() {
    if (this.consentChecked) {
      this.gotoNextPage();
    }
    else {
      this.snackbar.open('terms and policy must be accepted', null, {
        duration: 2000,
        verticalPosition: "top",
        panelClass: ['my-snackbar-problem']
      });
    }
  }

  gotoNextPage() {
    this.router.navigateByUrl('/questionnaire', { skipLocationChange: true });
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') {
      this.goToNextPageIfConsentIsGiven();
    }
  }
}
