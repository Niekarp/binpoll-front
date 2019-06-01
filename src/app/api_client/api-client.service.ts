import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { ConfigService } from '../config/config.service'
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  private configObservable: Observable<any>;

  constructor(
    private http: HttpClient,
    private configService: ConfigService) { 
      this.configObservable = configService.getConfig();
    }

  public sendPollData(pollData: PollData): void {
    this.configObservable.subscribe(config => {
      let url: string = config['apiUrl'];
      if(url == null) {
        console.error('apiUrl property not found');
      } else {
        url += 'poll_data/';
        this.http.post(url, {
          'start_date': pollData.startDate.toISOString(),
          'end_date': pollData.endDate.toISOString(),
          'assigned_set_id': pollData.assignedSetId,
          'answer': pollData.answer.join(',')
        }).pipe(
          catchError((err: HttpErrorResponse) => {
            console.error(err);
            return of({})
          })).subscribe(response => {
            console.log('poll data sent: ', url);
            console.log(pollData);
          });
      }
    });
  }
}
