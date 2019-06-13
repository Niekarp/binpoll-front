import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-navigation-button',
  templateUrl: './navigation-button.component.html',
  styleUrls: ['./navigation-button.component.scss']
})
export class NavigationButtonComponent implements OnInit {

  // @ViewChild('anchor')
  // public anchor: HTMLAnchorElement;

  @Input()
  public text: string;

  @Input()
  public destinationUrl: string;

  @Input()
  public condition: boolean;

  @Input()
  set disabled(b: boolean) {
    if (b) $(".navigation-button").css('backgroundColor', 'gray');
    else   $(".navigation-button").css('backgroundColor', 'rgb(91, 155, 213)');
  }

  @Output()
  public success = new EventEmitter();

  @Output()
  public failure = new EventEmitter();

  constructor(public router: Router) { }

  ngOnInit() { }

  onNavigationButtonClick() {
    if (this.condition || this.condition === undefined) {
      this.success.emit();
      this.router.navigateByUrl(this.destinationUrl, { skipLocationChange: true });
    }
    else {
      this.failure.emit();
    }
  }

}
