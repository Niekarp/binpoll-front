import { Component, OnInit, HostListener } from '@angular/core';
import { SharedConfig } from '../../config/shared-config';
import { Router } from '@angular/router';
import { MatCheckboxChange, MatSnackBar } from '@angular/material';
import * as $ from 'jquery';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  public consentChecked: boolean = false;
  public testCount: number;
  public appVersion: string;

  constructor(public sharedConfig: SharedConfig, public snackbar: MatSnackBar) { 
    this.appVersion = sharedConfig.appVersion;
    this.testCount = sharedConfig.testCount;
   }

  ngOnInit() {
  }

  public showProblemMessage() {
    this.snackbar.open('terms and policy must be accepted', null, {
      duration: 2000,
      verticalPosition: "top",
      panelClass: ['my-snackbar-problem']
    });
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') {
      // this.goToNextPageIfConsentIsGiven();
    }
  }
}
