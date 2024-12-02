import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OperationResponse } from '../models/OperationResponse';
import { VotingQuestionOption } from '../models/VotingQuestionOption';

@Injectable({
  providedIn: 'root'
})
export class VotingQuestionOptionService {

  apiUrl = `${environment.apiUrl}/question`;

  constructor(private http: HttpClient) { }

  getVotingQuestionOptions(questionID: number) {
    return this.http.get<VotingQuestionOption[]>(`${this.apiUrl}/${questionID}/option`);
  }

  getVotingQuestionOptionByID(questionID: number, id: number) {
    return this.http.get<VotingQuestionOption>(`${this.apiUrl}/${questionID}/option/${id}`);
  }

  insertVotingQuestionOption(questionID: number, votingQuestionOption) {
    return this.http.post<OperationResponse>(`${this.apiUrl}/${questionID}/option`, votingQuestionOption);
  }

  updateVotingQuestionOption(questionID: number, votingQuestionOption) {
    return this.http.put<OperationResponse>(`${this.apiUrl}/${questionID}/option`, votingQuestionOption);
  }

  deleteVotingQuestionOption(questionID: number, id: number) {
    return this.http.delete<OperationResponse>(`${this.apiUrl}/${questionID}/option/${id}`);
  }
}
