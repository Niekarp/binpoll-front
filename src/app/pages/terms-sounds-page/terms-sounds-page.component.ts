import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terms-sounds-page',
  templateUrl: './terms-sounds-page.component.html',
  styleUrls: ['./terms-sounds-page.component.scss']
})
export class TermsSoundsPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToPreviousPage() {
    this.router.navigate(['/poll-description']);
  }

  gotoNextPage() {
    this.router.navigate(['/terms-front-scene']);
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.goToPreviousPage();
    }
    else if (event.key === 'ArrowRight') {
      this.gotoNextPage();
    }
  }
}
