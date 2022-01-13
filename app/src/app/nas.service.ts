import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Photo } from './photo';
import { PHOTOS } from './mock-photos';

@Injectable({
  providedIn: 'root'
})
export class NasService {

  constructor(private http: HttpClient) { }

  private photosUrl = '/assets/mock-thumbnails.json';

  getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.photosUrl)
  }

}
