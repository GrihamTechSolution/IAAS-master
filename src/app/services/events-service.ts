import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { OperationResponse } from '../models/OperationResponse';
import { Events } from '../models/Events';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  apiUrl = environment.apiUrl + '/events';

  constructor(private http: HttpClient) { }

  public getAllEvents() {
    return this.http.get<any>(this.apiUrl);
  }

  public getEventsById(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  public insertEvents(event) {
    return this.http.post<any>(this.apiUrl, event);
  }

  public updateEvent(id, event) {
    return this.http.put<any>(`${this.apiUrl}/${id}`, event);
  }

  public deleteEvent(id: number) {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
