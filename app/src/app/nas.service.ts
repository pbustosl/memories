import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Photo } from './photo';

@Injectable({
  providedIn: 'root'
})
export class NasService {

  constructor(private http: HttpClient) { }

  getPhotos(month: Date): Observable<Photo[]> {
    var photosUrl = '/assets/mock-thumbnails.json';
    return this.http.get<Photo[]>(photosUrl);
  }

}
