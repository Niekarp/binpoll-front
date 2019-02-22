import { Component, OnInit, HostListener } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

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
  
  public selectedAge: string;
  public selectedHearingDifficulties: boolean;
  public selectedListeningTestParticipation: boolean;
  public typedHeadphonesMakeAndModel: string;
  private ages: Age[] = [
    { value: 'Under 18', viewValue: 'Under 18' },
    { value: '18-24', viewValue: '18-24' },
    { value: '25-34', viewValue: '25-34' },
    { value: '35-44', viewValue: '35-44' },
    { value: '45-54', viewValue: '45-54' },
    { value: 'Above 54', viewValue: 'Above 54' }
  ];

  constructor(private router: Router, public snackbar: MatSnackBar) { }

  ngOnInit() {
  }
  
  public validateForm() {
    if (this.selectedAge == undefined || 
      this.selectedHearingDifficulties == undefined ||
      this.selectedListeningTestParticipation == undefined ||
      this.typedHeadphonesMakeAndModel == undefined ||
      this.typedHeadphonesMakeAndModel == "" || 
      this.typedHeadphonesMakeAndModel.replace(/\s/g, '').length == 0) {
        this.snackbar.open('all fields are required', null, {
          duration: 2000,
          verticalPosition: "top",
          panelClass: ['my-snackbar']
        });
    }
    else {
      this.router.navigate(['/poll-description']);
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.router.navigate(['/']);
    }
    else if (event.key === 'ArrowRight') {
      this.validateForm();
    }
  }
}
