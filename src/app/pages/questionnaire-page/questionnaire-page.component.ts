import { Component, OnInit, HostListener } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AudioService } from 'src/app/services/audio/audio.service';
import { Questionnaire } from 'src/app/models/questionnaire';

export interface Age {
  value: String,
  viewValue: String
}

@Component({
  selector: 'app-questionnaire-page',
  templateUrl: './questionnaire-page.component.html',
  styleUrls: ['./questionnaire-page.component.scss']
})
export class QuestionnairePageComponent implements OnInit {
  
  public model = new Questionnaire();

  // public selectedAge: string;
  // public selectedHearingDifficulties: boolean;
  // public selectedListeningTestParticipation: boolean;
  // public typedHeadphonesMakeAndModel: string;
  public ages: Age[] = [
    { value: 'Under 18', viewValue: 'Under 18' },
    { value: '18-24', viewValue: '18-24' },
    { value: '25-34', viewValue: '25-34' },
    { value: '35-44', viewValue: '35-44' },
    { value: '45-54', viewValue: '45-54' },
    { value: 'Above 54', viewValue: 'Above 54' }
  ];

  constructor(private router: Router, public snackbar: MatSnackBar, public audio: AudioService) { }

  ngOnInit() {
    this.audio.loadAudioPlayers();
  }
  
  // this.typedHeadphonesMakeAndModel == undefined ||
  // this.typedHeadphonesMakeAndModel == "" || 
  // this.typedHeadphonesMakeAndModel.replace(/\s/g, '').length == 0
  public validateForm(): boolean {
    if (this.model.age == '' || 
        this.model.hearingDifficulties == '' ||
        this.model.listeningTestParticipation == '')
    {
        this.snackbar.open('the first three fields are required', null, {
          duration: 2000,
          verticalPosition: "top",
          panelClass: ['my-snackbar']
        });
        return false;
    }
    else {
      return true;
    }
  }

  goToNextPageIfFormIsValid() {
    if (this.validateForm()) {
      sessionStorage.setItem('questionnaire', JSON.stringify(this.model));
      this.gotoNextPage();
    }
  }

  goToPreviousPage() {
    this.router.navigate(['/']);
  }

  gotoNextPage() {
    // this.audio.testAudio();
    this.router.navigate(['/poll-description']);
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if ((event.target as HTMLTextAreaElement).localName === 'textarea') {
      return;
    }
    if (event.key === 'ArrowLeft') {
      this.goToPreviousPage();
    }
    else if (event.key === 'ArrowRight') {
      if (this.validateForm()) {
        this.gotoNextPage();
      }
    }
  }
}
