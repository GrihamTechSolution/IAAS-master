import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { EmailSubscription } from '../models/EmailSubscription';
import { OperationResponse } from '../models/OperationResponse';

@Injectable({
  providedIn: 'root'
})
export class EmailSubscriptionService {

  apiUrl = environment.apiUrl + '/emailSubscription';

  constructor(private http: HttpClient) { }

  public getEmailSubscriptions(){
    return this.http.get<OperationResponse>(this.apiUrl);
  }

  public getActiveEmailSubscriptions(){
    return this.http.get<OperationResponse>(`${this.apiUrl}/active`);
  }

  public getEmailSubscriptionByID(id: number){
    return this.http.get<OperationResponse>(`${this.apiUrl}/${id}`);
  }

  public subscribeEmail(email: string){
    return this.http.post<OperationResponse>(this.apiUrl, { email: email });
  }

  public unsubscribeEmail(token: string){
    return this.http.put<OperationResponse>(`${this.apiUrl}/unsubscribe`, { token: token });
  }

  public deleteEmailSubscription(id: number){
    return this.http.delete<OperationResponse>(`${this.apiUrl}/${id}`);
  }

  public updateEmailSubscription(emailSubscription: EmailSubscription){
    return this.http.put<OperationResponse>(this.apiUrl, emailSubscription);
  }
}
