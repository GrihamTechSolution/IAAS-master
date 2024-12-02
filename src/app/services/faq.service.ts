import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { FAQ } from '../models/FAQ';
import { OperationResponse } from '../models/OperationResponse';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  apiUrl = `${environment.apiUrl}/faq`;

  constructor(private http: HttpClient) { }

  getFaqs(){
    return this.http.get<FAQ[]>(this.apiUrl);
  }

  getFAQByID(id:number){
    return this.http.get<FAQ>(`${this.apiUrl}/${id}`);
  }

  insertFAQ(faq){
    return this.http.post<OperationResponse>(this.apiUrl, faq);
  }

  updateFAQ(faq){
    return this.http.put<OperationResponse>(this.apiUrl, faq);
  }

  deleteFAQ(id:number){
    return this.http.delete<OperationResponse>(`${this.apiUrl}/${id}`);
  }
}
