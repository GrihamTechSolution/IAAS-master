import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CountryCategory } from '../models/CountryCategory';

@Injectable({
  providedIn: 'root'
})
export class CountryCategoryService {

  apiUrl = `${environment.apiUrl}/countryCategory`;

  constructor(private http: HttpClient) { }

  getCountryCategories(){
    return this.http.get<CountryCategory[]>(this.apiUrl);
  }
}
