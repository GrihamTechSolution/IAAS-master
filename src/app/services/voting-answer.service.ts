import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OperationResponse } from '../models/OperationResponse';
import { VotingAnswer } from '../models/VotingAnswer';

@Injectable({
    providedIn: 'root'
})
export class VotingAnswerService {

    apiUrl = `${environment.apiUrl}/votingquestion`;

    constructor(private http: HttpClient) { }

    // TODO: Does this make sence
    insertVotingAnswer(votingQuestionID: number, votingAnswer: VotingAnswer) {
        return this.http.post<OperationResponse>(`${this.apiUrl}/${votingQuestionID}/answer`, votingAnswer);
    }
}
