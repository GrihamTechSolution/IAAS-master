import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { FAQCategory } from '../models/FAQCategory';
import { OperationResponse } from '../models/OperationResponse';

@Injectable({
  providedIn: 'root'
})
export class FaqCategoryService {

  apiUrl = `${environment.apiUrl}/faqcategory`;

  constructor(private http: HttpClient) { }

  getFAQCategories(){
    return this.http.get<FAQCategory[]>(this.apiUrl);
  }

  getFAQCategoryByID(id:number){
    return this.http.get<FAQCategory>(`${this.apiUrl}/${id}`);
  }

  insertFAQCategory(faqCategory){
    return this.http.post<OperationResponse>(this.apiUrl, faqCategory);
  }

  updateFAQCategory(faqCategory){
    return this.http.put<OperationResponse>(this.apiUrl, faqCategory);
  }

  deleteFAQCategory(id:number){
    return this.http.delete<OperationResponse>(`${this.apiUrl}/${id}`);
  }
}
