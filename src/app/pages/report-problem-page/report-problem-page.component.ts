import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-report-problem-page',
  templateUrl: './report-problem-page.component.html',
  styleUrls: ['./report-problem-page.component.scss']
})
export class ReportProblemPageComponent implements OnInit {

  private isReportSend: boolean = false;

  constructor(public snackbar: MatSnackBar) { }

  ngOnInit() {
  }

  onSendCommentButtonClick() {
    if (this.isReportSend === false) {
      this.snackbar.open('report has been sent', null, {
        duration: 2000,
        verticalPosition: "top",
        panelClass: ['my-snackbar']
      });
      (document.getElementsByClassName('navigation-button').item(0) as HTMLElement).style.backgroundColor = 'gray';
      this.isReportSend = true;
    }
  }
}
