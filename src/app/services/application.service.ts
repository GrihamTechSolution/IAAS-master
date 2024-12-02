import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Application } from '../models/Application';
import { OperationResponse } from '../models/OperationResponse';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  apiUrl = environment.apiUrl + '/application';

  constructor(private http: HttpClient) { }

  public getApplications(){
    return this.http.get<Application[]>(this.apiUrl);
  }

  public insertApplication(application){
    return this.http.post<OperationResponse>(this.apiUrl, application);
  }

  public updateApplication(application){
    return this.http.put<OperationResponse>(this.apiUrl, application);
  }

  public deleteApplication(id){
    return this.http.delete<OperationResponse>(`${this.apiUrl}/${id}`);
  }

  public getApplicationByID(id){
    return this.http.get<Application>(`${this.apiUrl}/${id}`);
  }

  public getApplicationsByInternship(internshipID) {
    return this.http.get<Application[]>(`${this.apiUrl}/internship/${internshipID}`);
  }

  public getApplicationsByStudent(studentID){
    return this.http.get<Application[]>(`${this.apiUrl}/student/${studentID}`);
  }

  public createStep(step){
    return this.http.post<OperationResponse>(`${this.apiUrl}/step`, step);
  }

  public updateStep(step) {
    return this.http.put<OperationResponse>(`${this.apiUrl}/step`, step)
  }
}
