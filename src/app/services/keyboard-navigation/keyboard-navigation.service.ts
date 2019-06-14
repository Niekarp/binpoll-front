import { Injectable, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeyboardNavigationService {

  public router: Router;

  public active = false;

  public goBackCondition: () => boolean;
  public goNextCondition: () => boolean;

  public onGoNextConditionFail = () => {};

  constructor() { 
    // window.addEventListener('keydown', this.onKeyDown); 

    fromEvent(document, 'keydown').subscribe((event: KeyboardEvent) => {
    if (this.active === false) return;
    // console.log('activated');

    let currentRouteIndex = this.router.config.findIndex((route: any) => {
      // console.log(this.router.url + '===' + route.path);
      return this.router.url === '/' + route.path;
    });
    // console.log('idx: ' + currentRouteIndex);

    if (event.key === 'ArrowLeft') {
      if (this.goBackCondition()) 
        this.router.navigateByUrl(this.router.config[currentRouteIndex - 1].path, { skipLocationChange: true });
    }
    else if (event.key === 'ArrowRight') {
      // console.log('right arrow down');
      // console.log(this.goNextCondition());
      if (this.goNextCondition()) 
        this.router.navigateByUrl(this.router.config[currentRouteIndex + 1].path, { skipLocationChange: true });
      else
        this.onGoNextConditionFail();
    }
    });
  }
  /*
  onKeyDown(event: KeyboardEvent) {
    console.log('keyboardNav: key down!');
    console.log('router: ' + this.router);
    console.log('activate: ' + this.active);
    if (this.active === false) return;

    let currentRouteIndex = this.router.config.findIndex((route: Route) => {
      return this.router.url === route
    });

    if (event.key === 'ArrowLeft') {
      if (this.goBackCondition) 
        this.router.navigateByUrl(this.router.config[currentRouteIndex - 1].path, { skipLocationChange: true });
    }
    else if (event.key === 'ArrowRight') {
      if (this.goNextCondition) 
        this.router.navigateByUrl(this.router.config[currentRouteIndex + 1].path, { skipLocationChange: true });
    }
  }
  */
}
