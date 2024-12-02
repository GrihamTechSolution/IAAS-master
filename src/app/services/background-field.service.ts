import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BackgroundField } from './../models/BackgroundField';
import { OperationResponse } from '../models/OperationResponse';

@Injectable({
  providedIn: 'root'
})
export class BackgroundFieldService {

  apiUrl = environment.apiUrl + '/backgroundField';

  constructor(private http: HttpClient) { }

  public getBackgroundFields(){
    return this.http.get<BackgroundField[]>(this.apiUrl);
  }

  public getBackgroundFieldByID(id){
    return this.http.get<BackgroundField[]>(`${this.apiUrl}/${id}`);
  }

  public insertBackgroundField(field){
    return this.http.post<OperationResponse>(this.apiUrl, field);
  }

  public updateBackgroundField(field){
    return this.http.put<OperationResponse>(this.apiUrl, field);
  }

  public deleteBackgroundField(id){
    return this.http.delete<OperationResponse>(`${this.apiUrl}/${id}`);
  }
}
