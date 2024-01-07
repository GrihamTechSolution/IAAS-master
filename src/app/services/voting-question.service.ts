import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { VotingQuestion, VotingQuestionType } from '../models/VotingQuestion';
import { OperationResponse } from '../models/OperationResponse';

@Injectable({
  providedIn: 'root'
})
export class VotingQuestionService {

  apiUrl = `${environment.apiUrl}/voting`;

  constructor(private http: HttpClient) { }

  getVotingQuestionTypes() {
    return this.http.get<VotingQuestionType[]>(`${environment.apiUrl}/votingquestiontype`);
  }

  getVotingQuestions(votingID: number) {
    return this.http.get<VotingQuestion[]>(`${this.apiUrl}/${votingID}/question`);
  }

  getVotingQuestionByID(votingID: number, id: number) {
    return this.http.get<VotingQuestion>(`${this.apiUrl}/${votingID}/question/${id}`);
  }

  getVotingQuestionResult(id: number) {
    return this.http.get<any[]>(`${environment.apiUrl}/question/${id}/result`);
  }

  insertVotingQuestion(votingID: number, votingQuestion) {
    return this.http.post<OperationResponse>(`${this.apiUrl}/${votingID}/question`, votingQuestion);
  }

  updateVotingQuestion(votingID: number, votingQuestion) {
    return this.http.put<OperationResponse>(`${this.apiUrl}/${votingID}/question`, votingQuestion);
  }

  deleteVotingQuestion(votingID: number, id: number) {
    return this.http.delete<OperationResponse>(`${this.apiUrl}/${votingID}/question/${id}`);
  }
}
