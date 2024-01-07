import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FavouriteInternship } from '../models/FavouriteInternship';
import { OperationResponse } from '../models/OperationResponse';

@Injectable({
  providedIn: 'root'
})
export class FavouriteInternshipService {

  apiUrl = `${environment.apiUrl}/favouriteInternship`;

  constructor(private http: HttpClient) { }

  getFavouriteInternshipsForUser(userID) {
    return this.http.get<FavouriteInternship[]>(`${this.apiUrl}/${userID}`);
  }

  insertFavouriteInternship(favouriteInternship) {
    return this.http.post<OperationResponse>(this.apiUrl, favouriteInternship);
  }

  deleteFavouriteInternship(id) {
    return this.http.delete<OperationResponse>(`${this.apiUrl}/${id}`);
  }
}
