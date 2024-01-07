import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FavouriteBlog } from '../models/FavouriteBlog';
import { OperationResponse } from '../models/OperationResponse';

@Injectable({
  providedIn: 'root'
})
export class FavouriteBlogService {

  apiUrl = `${environment.apiUrl}/favouriteBlog`;

  constructor(private http: HttpClient) { }

  getFavouriteBlogForUser(userID) {
    return this.http.get<FavouriteBlog[]>(`${this.apiUrl}/${userID}`);
  }

  insertFavouriteBlog(favouriteBlog){
    return this.http.post<OperationResponse>(this.apiUrl, favouriteBlog);
  }

  deleteFavouriteBlog(id) {
    return this.http.delete<OperationResponse>(`${this.apiUrl}/${id}`);
  }
}
