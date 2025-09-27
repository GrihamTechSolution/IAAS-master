import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitorCounterService {

  apiUrl = environment.apiUrl + '/visitor-counter';

  constructor(private http: HttpClient) { }

  // Get current visitor count
  getVisitorCount(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Increment visitor count
  incrementVisitorCount(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/increment`, {});
  }
}
