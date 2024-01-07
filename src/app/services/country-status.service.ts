import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CountryStatus } from '../models/CountryStatus';

@Injectable({
  providedIn: 'root'
})
export class CountryStatusService {

  apiUrl = `${environment.apiUrl}/countryStatus`;

  constructor(private http: HttpClient) { }

  getCountryStatuses(){
    return this.http.get<CountryStatus[]>(this.apiUrl);
  }
}
