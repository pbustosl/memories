import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Photo } from './photo';
import { PHOTOS } from './mock-photos';

@Injectable({
  providedIn: 'root'
})
export class NasService {

  constructor() { }

  getPhotos(): Observable<Photo[]> {
    const photos = of(PHOTOS)
    return photos;
  }

}
