import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OPTaker } from '../models/OPTaker';
import { OperationResponse } from '../models/OperationResponse';

@Injectable({
  providedIn: 'root'
})
export class OpTakerService {

  apiUrl = environment.apiUrl + '/opTaker';

  constructor(private http: HttpClient) { }

  public getOPTakers(){
    return this.http.get<OPTaker[]>(this.apiUrl);
  }

  public getOPTakerByID(id:number){
    return this.http.get<OPTaker>(`${this.apiUrl}/${id}`);
  }

  public getOPTakerByUserID(id: number){
    return this.http.get<OPTaker>(`${this.apiUrl}/getByUser/${id}`);
  }

  public insertOPTaker(opTaker){
    return this.http.post<OperationResponse>(this.apiUrl, opTaker);
  }

  public updateOPTaker(opTaker) {
    return this.http.put<OperationResponse>(this.apiUrl, opTaker);
  }

  public deleteOPTaker(id){
    return this.http.delete<OperationResponse>(`${this.apiUrl}/${id}`);
  }

  public saveContacts(contacts) {
    return this.http.put<OperationResponse>(`${this.apiUrl}/contacts`, contacts);
  }
}
