import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Partner } from '../models/Partner';
import { OperationResponse } from '../models/OperationResponse';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  apiUrl = `${environment.apiUrl}/partner`;

  constructor(private http: HttpClient) { }

  getPartners(){
    return this.http.get<Partner[]>(this.apiUrl);
  }

  getPartnerByID(id:number){
    return  this.http.get<Partner>(`${this.apiUrl}/${id}`);
  }

  insertPartner(partner){
    return this.http.post<OperationResponse>(this.apiUrl, partner);
  }

  updatePartner(partner){
    return this.http.put<OperationResponse>(this.apiUrl, partner);
  }

  deletePartner(id:number){
    return this.http.delete<OperationResponse>(`${this.apiUrl}/${id}`);
  }
}
