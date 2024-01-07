import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Download } from '../models/Download';
import { OperationResponse } from '../models/OperationResponse';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  apiUrl = `${environment.apiUrl}/download`;
  
  constructor(private http: HttpClient) { }

  getDownloads(){
    return this.http.get<Download[]>(this.apiUrl);
  }

  getDownloadByID(id:Number){
    return this.http.get<Download>(`${this.apiUrl}/${id}`);
  }

  insertDownload(download){
    return this.http.post<OperationResponse>(this.apiUrl, download);
  }

  updateDownload(download){
    return this.http.put<OperationResponse>(this.apiUrl, download);
  }

  deleteDownload(id:number){
    return this.http.delete<OperationResponse>(`${this.apiUrl}/${id}`);
  }

  
}
