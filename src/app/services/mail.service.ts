import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ExproMail } from '../models/ExproMail';
import { OperationResponse } from '../models/OperationResponse';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  apiUrl = environment.apiUrl ;

  constructor(private http: HttpClient) { }

  public sendExproMail(mail: ExproMail) {
    return this.http.post<OperationResponse>(`${this.apiUrl}/mail`, mail);
  }

  public sendApplicationMail(mail: ExproMail){
    return this.http.post<OperationResponse>(`${this.apiUrl}/applicationMail`, mail);
  }

  public sendVotingNotificationMail(mail: ExproMail){
    return this.http.post<OperationResponse>(`${this.apiUrl}/votingNotificationMail`, mail);
  }
}
