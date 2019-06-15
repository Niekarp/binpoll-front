import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ApiClientService } from 'src/app/services/api-client/api-client.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-report-problem-page',
  templateUrl: './report-problem-page.component.html',
  styleUrls: ['./report-problem-page.component.scss']
})
export class ReportProblemPageComponent implements OnInit {
  public message: string;
  private isReportSend: boolean = false;

  constructor(public snackbar: MatSnackBar,
    private api: ApiClientService,
    private data: DataService) { }

  ngOnInit() {
  }

  onSendCommentButtonClick() {
    if (this.isReportSend === false) {
      this.api.reportProblem({
        user_info: {
          headphones_make_and_model: this.data.questionnaire.typedHeadphonesMakeAndModel,
          hearing_difficulties: this.data.questionnaire.hearingDifficulties,
          listening_test_participated: this.data.questionnaire.listeningTestParticipation,
          age: this.data.questionnaire.age,
        },
        message: this.message
      }).subscribe(() => {
        this.snackbar.open('report has been sent', null, {
          duration: 2000,
          verticalPosition: "top",
          panelClass: ['my-snackbar-confirm']
        });
        (document.getElementsByClassName('navigation-button').item(0) as HTMLElement).style.backgroundColor = 'gray';
        this.isReportSend = true;
      });
    }
  }
}
