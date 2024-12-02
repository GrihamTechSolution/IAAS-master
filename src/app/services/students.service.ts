import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/Student';
import { OperationResponse } from '../models/OperationResponse';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  apiUrl = environment.apiUrl + '/student';

  constructor(private http: HttpClient) { }

  public getStudents(){
    return this.http.get<Student[]>(this.apiUrl);
  }

  public getStudentByID(id:number){
    return this.http.get<Student>(`${this.apiUrl}/${id}`);
  }

  public insertStudent(student){
    return this.http.post<OperationResponse>(this.apiUrl, student);
  }

  public updateStudent(student: Student){
    return this.http.put<OperationResponse>(this.apiUrl, student);
  }

  public getStudentByUserID(userID){
    return this.http.get<Student>(`${this.apiUrl}/getByUser/${userID}`);
  }
}
