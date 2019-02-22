import { Component, OnInit } from '@angular/core';
import { SharedConfig } from '../../config/shared-config';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  private testCount: number;

  constructor(public sharedConfig: SharedConfig) { 
    this.testCount = sharedConfig.testCount;
   }

  ngOnInit() {
  }

}
