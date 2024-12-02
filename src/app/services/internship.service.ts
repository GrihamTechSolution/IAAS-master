import { Injectable } from '@angular/core';
import { Internship } from './../models/Internship';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { OperationResponse } from '../models/OperationResponse';

@Injectable({
  providedIn: 'root'
})
export class InternshipService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getInternships() {
    return this.http.get<Internship[]>(`${this.apiUrl}/internship`);
  }

  public getInternshipByID(id){
    return this.http.get<Internship>(`${this.apiUrl}/internship/${id}`);
  }

  public insertInternship(internship){
    return this.http.post<OperationResponse>(`${this.apiUrl}/internship`, internship);
  }

  public updateInternship(internship){
    return this.http.put<OperationResponse>(`${this.apiUrl}/internship`, internship);
  }

  public deleteInternship(id){
    return this.http.delete<OperationResponse>(`${this.apiUrl}/internship/${id}`);
  }

  public insertInternshipImage(image){
    return this.http.post<OperationResponse>(`${this.apiUrl}/internshipImage`, image);
  }

  public deleteInternshipImage(id){
    return this.http.delete<OperationResponse>(`${this.apiUrl}/internshipImage/${id}`);
  }
}
