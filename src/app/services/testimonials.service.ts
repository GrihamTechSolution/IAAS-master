import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { OperationResponse } from '../models/OperationResponse';
import { InsertTestimonial, Testimonial } from '../models/Testimonials';

@Injectable({
  providedIn: 'root',
})
export class TestimonialService {
  apiUrl = environment.apiUrl + '/testimonials';

  constructor(private http: HttpClient) {}

  public getAllTestimonials(page: number, limit: number) {
    return this.http.get<any>(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }

  public getTestimonialById(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  public insertTestimonial(testimonial: InsertTestimonial) {
    return this.http.post<OperationResponse>(this.apiUrl, testimonial);
  }

  public getOneTestimonial(applicationID, userID, internshipID) {
    let queryParameters = [];

    if (applicationID) {
      queryParameters.push(`applicationID=${applicationID}`);
    }

    if (userID) {
      queryParameters.push(`userID=${userID}`);
    }

    if (internshipID) {
      queryParameters.push(`internshipID=${internshipID}`);
    }

    let apiUrl =
      this.apiUrl +
      (queryParameters.length > 0 ? '?' + queryParameters.join('&') : '');

    return this.http.get<Testimonial>(apiUrl);
  }
}
