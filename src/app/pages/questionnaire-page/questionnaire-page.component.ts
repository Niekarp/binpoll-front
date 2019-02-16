import { Component, OnInit } from '@angular/core';

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
  private ages: Age[] = [
    { value: 'Under 18', viewValue: 'Under 18' },
    { value: '', viewValue: '18-24' },
    { value: '', viewValue: '25-34' },
    { value: '', viewValue: '35-44' },
    { value: '', viewValue: '45-54' },
    { value: '', viewValue: 'Above 54' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
