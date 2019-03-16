import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-finish-page',
  templateUrl: './finish-page.component.html',
  styleUrls: ['./finish-page.component.scss']
})
export class FinishPageComponent implements OnInit {

  private isCommeentSend: boolean = false;

  constructor(public snackbar: MatSnackBar) { }

  ngOnInit() {
  }

  onSendCommentButtonClick() {
    if (this.isCommeentSend === false) {
      this.snackbar.open('comment has been sent', null, {
        duration: 2000,
        verticalPosition: "top",
        panelClass: ['my-snackbar']
      });
      (document.getElementsByClassName('navigation-button').item(0) as HTMLElement).style.backgroundColor = 'gray';
      this.isCommeentSend = true;
    }
  }
}
