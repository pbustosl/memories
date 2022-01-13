import { Injectable } from '@angular/core';

import { Photo } from './photo';
import { PHOTOS } from './mock-photos';

@Injectable({
  providedIn: 'root'
})
export class NasService {

  constructor() { }

  getPhotos(): Photo[] {
    return PHOTOS;
  }

}
