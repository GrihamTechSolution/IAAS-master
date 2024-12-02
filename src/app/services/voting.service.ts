import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Voting, VotingType } from '../models/Voting';
import { OperationResponse } from '../models/OperationResponse';

@Injectable({
  providedIn: 'root'
})
export class VotingService {

  apiUrl = `${environment.apiUrl}/voting`;

  constructor(private http: HttpClient) { }

  getVotingTypes() {
    return this.http.get<VotingType[]>(`${environment.apiUrl}/votingtype`);
  }

  getVotings() {
    return this.http.get<Voting[]>(this.apiUrl);
  }

  getVotingByID(id: number) {
    return this.http.get<Voting>(`${this.apiUrl}/${id}`);
  }

  insertVoting(voting) {
    return this.http.post<OperationResponse>(this.apiUrl, voting);
  }

  updateVoting(voting) {
    return this.http.put<OperationResponse>(this.apiUrl, voting);
  }

  deleteVoting(id) {
    return this.http.delete<OperationResponse>(`${this.apiUrl}/${id}`);
  }
}
