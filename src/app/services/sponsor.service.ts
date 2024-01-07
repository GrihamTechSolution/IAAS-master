import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { Observable } from "rxjs";
import { OperationResponse } from '../models/OperationResponse';
import { Sponsor } from '../models/Sponsor';

@Injectable({
  providedIn: 'root'
})
export class SponsorService {

  apiUrl = `${environment.apiUrl}/sponsor`;

  constructor(private http: HttpClient) { }

  // getElections(): Observable<Elections[]> {
  //   return this.http.get<Elections[]>(environment.apiUrl + '/election/getlist', {
  //     headers: new HttpHeaders().set('Authorization', this.authHeader)
  //   });

  // }

  getSponsors(){
    return this.http.get<Sponsor[]>(this.apiUrl);
  }

  getSponsorByID(id: number) {
    return this.http.get<Sponsor>(`${this.apiUrl}/${id}`);
  }

  insertSponsor(sponsor) {
    return this.http.post<OperationResponse>(`${this.apiUrl}`, sponsor);
  }

  updateSponsor(sponsor) {
    return this.http.put<OperationResponse>(`${this.apiUrl}`, sponsor);
  }

  deleteSponsor(id: number) {
    return this.http.delete<OperationResponse>(`${this.apiUrl}/${id}`);
  }
}
