import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Album } from './album';
import { Memory } from './memory';

@Injectable({
  providedIn: 'root'
})
export class MemoriesService {

  albums: Album[] = [];
  albumIndex: number = 0;
  memories: Memory[] = [];

  headers = new HttpHeaders({
    'Cache-Control':  'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
    'Pragma': 'no-cache',
    'Expires': '0'
  });

  constructor(private http: HttpClient) {
    this.http.get<Album[]>("/assets/albums.json", { headers: this.headers}).subscribe(albms => this.albums = albms);
  }

  setAlbum(index: number) {
    this.albumIndex = index
    this.http.get<Memory[]>(this.albums[index].path, { headers: this.headers}).subscribe(mems => this.memories = mems);
  }

}
