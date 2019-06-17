import { Injectable } from '@angular/core';
import { Questionnaire } from 'src/app/models/questionnaire';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public questionnaire = new Questionnaire();
  public dataResponseId = null;

  public stupidThing = false;

  constructor() { }
}
