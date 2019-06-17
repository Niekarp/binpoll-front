import { Component, OnInit, Input, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { MatAnchor } from '@angular/material';

@Component({
  selector: 'app-navigation-button',
  templateUrl: './navigation-button.component.html',
  styleUrls: ['./navigation-button.component.scss']
})
export class NavigationButtonComponent implements OnInit {

  @ViewChild('button')
  public button: MatAnchor;

  @Input()
  public text: string;

  @Input()
  public destinationUrl: string;

  @Input()
  public condition: boolean;

  @Input()
  set disabled(b: boolean) {
    console.log(this.button);
    if (b) this.button._elementRef.nativeElement.style.backgroundColor  = 'gray';
    else   this.button._elementRef.nativeElement.style.backgroundColor = 'rgb(91, 155, 213)';

    // if (b) this.button.style.backgroundColor = 'gray';
    // else   this.button.style.backgroundColor = 'rgb(91, 155, 213)';
    // $(".navigation-button").css('backgroundColor', 'gray');
    // $(".navigation-button").css('backgroundColor', 'rgb(91, 155, 213)');
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
