import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Language } from '../models/Language';
import { OperationResponse } from '../models/OperationResponse';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  apiUrl = `${environment.apiUrl}/language`;

  constructor(private http: HttpClient) { }

  getLanguages(){
    return this.http.get<Language[]>(this.apiUrl);
  }

  getLanguageByID(id) {
    return this.http.get<Language>(`${this.apiUrl}/${id}`);
  }

  insertLanguage(language){
    return this.http.post<OperationResponse>(this.apiUrl, language);
  }

  updateLanguage(language){
    return this.http.put<OperationResponse>(this.apiUrl, language);
  }

  deleteLanguage(id){
    return this.http.delete<OperationResponse>(`${this.apiUrl}/${id}`);
  }

  
}
