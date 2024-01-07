import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Region } from '../models/Region';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  apiUrl = `${environment.apiUrl}/region`;

  constructor(private http: HttpClient) { }

  getRegions(){
    return this.http.get<Region[]>(this.apiUrl);
  }
}
