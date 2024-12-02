import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FavouriteAbroad } from 'src/app/models/FavouriteAbroad';
import { OperationResponse } from '../models/OperationResponse';

@Injectable({
  providedIn: 'root'
})
export class FavouriteAbroadService {

  apiUrl = `${environment.apiUrl}/favouriteAbroad`;

  constructor(private http: HttpClient) { }

  getFavouriteAbroadForUser(id){
    return this.http.get<FavouriteAbroad[]>(`${this.apiUrl}/${id}`);
  }

  insertFavouriteAbroad(favAbroad){
    return this.http.post<OperationResponse>(this.apiUrl, favAbroad);
  }

  deleteFavouriteAbroad(id){
    return this.http.delete<OperationResponse>(`${this.apiUrl}/${id}`);
  }
}
