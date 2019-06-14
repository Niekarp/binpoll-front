import { Component, OnInit, HostListener } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AudioService } from 'src/app/services/audio/audio.service';
import { ApiClientService } from 'src/app/services/api-client/api-client.service';

@Component({
  selector: 'app-finish-page',
  templateUrl: './finish-page.component.html',
  styleUrls: ['./finish-page.component.scss']
})
export class FinishPageComponent implements OnInit {

  private comment: string;
  private isCommeentSend: boolean = false;

  constructor(public snackbar: MatSnackBar, public audio: AudioService, public apiClient: ApiClientService) { }

  ngOnInit() {
  }

  onSendCommentButtonClick() {
    if (this.isCommeentSend === false && this.comment !== '') {
      this.apiClient.sendComment(this.comment, () => {
        this.snackbar.open('comment has been sent', null, {
          duration: 2000,
          verticalPosition: "top",
          panelClass: ['my-snackbar-confirm']
        });
        (document.getElementsByClassName('navigation-button').item(0) as HTMLElement).style.backgroundColor = 'gray';
        this.isCommeentSend = true;
      })
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  displayDialogWithWarning($event) {
    $event.returnValue = false;
  }
}
