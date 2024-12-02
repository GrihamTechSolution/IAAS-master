import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { OperationResponse } from '../models/OperationResponse';
import { environment } from 'src/environments/environment';
import { AuthenticationResponse } from '../models/AuthenticationResponse';
import { ResetPasswordRequest } from '../models/ResetPasswordRequest';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = `${environment.apiUrl}/user`;

  constructor(private http: HttpClient) { }

  register(user: User){
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/register`, user);
  }

  login(user: User){
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/login`, user);
  }

  getUserData(id:number){
    return this.http.get<User>(`${this.apiUrl}/getData/${id}`);
  }

  updateUser(user){
    return this.http.put<OperationResponse>(`${this.apiUrl}`, user);
  }

  isLoggedIn(){
    let iaasUser = window.localStorage.getItem('iaas-user');
    if (!iaasUser) {
      return false;
    }

    let user = JSON.parse(iaasUser);
    if (user.id) {
      return true;
    }

    return true;
  }

  getLoggedInUserData(){
    let iaasUser = window.localStorage.getItem('iaas-user');
    return JSON.parse(iaasUser);
  }

  public activateUser(user) {
    return this.http.put<OperationResponse>(`${this.apiUrl}/activate`, user);
  }

  public deactivateUser(user) {
    return this.http.put<OperationResponse>(`${this.apiUrl}/deactivate`, user);
  }

  public getIAASUsers(){
    return this.http.get<User[]>(`${this.apiUrl}/getIAASUsers`);
  }

  public getResetLink(resetPass){
    return this.http.post<OperationResponse>(`${this.apiUrl}/getResetLink`, resetPass);
  }

  public getResetLinkByGuid(guid) {
    return this.http.get<ResetPasswordRequest>(`${this.apiUrl}/getResetLinkInfo/${guid}`);
  }

  public serveResetLink(resetPass){
    return this.http.put<OperationResponse>(`${this.apiUrl}/serveResetLink`, resetPass);
  }

  public getUserByID(id){
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  public getUsersByType(userTypeID){
    return this.http.get<User[]>(`${this.apiUrl}/getByType/${userTypeID}`);
  }

  public deleteUser(id){
    return this.http.delete<OperationResponse>(`${this.apiUrl}/delete/${id}`);
  }

  public checkIfExists(email){
    return this.http.get<OperationResponse>(`${this.apiUrl}/checkIfExists/${email}`);
  }

  public checkIfRDExists(regionID){
    return this.http.get<OperationResponse>(`${this.apiUrl}/checkIfRDExists/${regionID}`);
  }

  public checkIfExCoExists(countryID) {
    return this.http.get<OperationResponse>(`${this.apiUrl}/checkIfExCoExists/${countryID}`);
  }

  public checkIfNDExists(countryID) {
    return this.http.get<OperationResponse>(`${this.apiUrl}/checkIfNDExists/${countryID}`);
  }
}
