import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StudyAbroadProgram } from '../models/StudyAbroadProgram';
import { OperationResponse } from '../models/OperationResponse';

@Injectable({
  providedIn: 'root'
})
export class StudyAbroadService {

  apiUrl = `${environment.apiUrl}/studyAbroad`;
  imageApiUrl = `${environment.apiUrl}/studyAbroadImage`;

  constructor(private http: HttpClient) { }

  getStudyAbroadPrograms(){
    return this.http.get<StudyAbroadProgram[]>(this.apiUrl);
  }

  getStudyAbroadProgramByID(id) {
    return this.http.get<StudyAbroadProgram>(`${this.apiUrl}/${id}`);
  }

  insertStudyAbroadProgram(studyAbroad){
    return this.http.post<OperationResponse>(this.apiUrl, studyAbroad);
  }

  updateStudyAbroadProgram(studyAbroad){
    return this.http.put<OperationResponse>(this.apiUrl, studyAbroad);
  }

  deleteStudyAbroadProgram(id){
    return this.http.delete<OperationResponse>(`${this.apiUrl}/${id}`);
  }

  addImageForStudyAbroad(img){
    return this.http.post<OperationResponse>(this.imageApiUrl, img);
  }

  deleteImageForStudyAbroadProgram(id){
    return this.http.delete<OperationResponse>(`${this.imageApiUrl}/${id}`);
  }
}
