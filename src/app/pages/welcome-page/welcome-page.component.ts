import { Component, OnInit, HostListener } from '@angular/core';
import { SharedConfig } from '../../config/shared-config';
import { Router } from '@angular/router';
import { MatCheckboxChange, MatSnackBar } from '@angular/material';
import * as $ from 'jquery';
import { KeyboardNavigationService } from 'src/app/services/keyboard-navigation/keyboard-navigation.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  public consentChecked: boolean = false;
  public testCount: number;
  public appVersion: string;

  constructor(public sharedConfig: SharedConfig,
              public router: Router,
              public snackbar: MatSnackBar,
              public keyboardNav: KeyboardNavigationService) { 
    this.appVersion = sharedConfig.appVersion;
    this.testCount = sharedConfig.testCount;
  }

  ngOnInit() {
    this.keyboardNav.goNextCondition = () => { return this.consentChecked };
    this.keyboardNav.onGoNextConditionFail = () => { this.showProblemMessage(); }
  }

  public showProblemMessage() {
    this.snackbar.open('terms and policy must be accepted', null, {
      duration: 2000,
      verticalPosition: "top",
      panelClass: ['my-snackbar-problem']
    });
  }
}
