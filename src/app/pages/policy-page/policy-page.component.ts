import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-policy-page',
  templateUrl: './policy-page.component.html',
  styleUrls: ['./policy-page.component.scss']
})
export class PolicyPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToPreviousPage() {
    this.router.navigateByUrl('/', { skipLocationChange: true });
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.goToPreviousPage();
    }
  }
}
