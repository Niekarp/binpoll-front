import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { KeyboardNavigationService } from './services/keyboard-navigation/keyboard-navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'binpoll-front';
  
  constructor(public router: Router, public keyboardNav: KeyboardNavigationService) {
    this.router.navigate(['/'], { replaceUrl: true });
    this.keyboardNav.router = this.router;
    this.keyboardNav.active = true;
  }

  ngOnInit() { }

  onActivate($event)
	{
		console.log('onActivate called');
    console.log($event);
    
    this.keyboardNav.goBackCondition = () => { return false };
    this.keyboardNav.goNextCondition = () => { return false };
    this.keyboardNav.onGoNextConditionFail = () => { };
  }

  @HostListener('window:beforeunload', ['$event'])
  displayDialogWithWarning($event) {
    $event.returnValue = true;
  }
}
