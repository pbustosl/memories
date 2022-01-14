import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Memory } from './memory';

@Injectable({
  providedIn: 'root'
})
export class NasService {

  constructor(private http: HttpClient) { }

  getMemories(month: Date): Observable<Memory[]> {
    var memoriesUrl = '/assets/mock-thumbnails.json';
    return this.http.get<Memory[]>(memoriesUrl);
  }

}
