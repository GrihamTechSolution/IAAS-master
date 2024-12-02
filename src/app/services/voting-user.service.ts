import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OperationResponse } from '../models/OperationResponse';
import { VotingUser } from '../models/VotingUser';

@Injectable({
    providedIn: 'root'
})
export class VotingUserService {

    apiUrl = `${environment.apiUrl}/voting`;

    constructor(private http: HttpClient) { }

    // TODO: Does this make sence
    insertVotingUser(votingID: number, userID: number) {
        return this.http.post<OperationResponse>(`${this.apiUrl}/${votingID}/user/${userID}`, null);
    }

    getVotingUser(votingID: number, userID: number) {
        return this.http.get<VotingUser>(`${this.apiUrl}/${votingID}/user/${userID}`);
    }
}
