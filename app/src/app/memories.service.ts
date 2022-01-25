import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Memory } from './memory';

@Injectable({
  providedIn: 'root'
})
export class MemoriesService {

  memories: Memory[] = [];
  dirName: string = "";

  constructor(private http: HttpClient) { }

  setDirIndexUrl(dirIndexUrl: string) { // /files/201505/dir_index.json
    this.http.get<Memory[]>(dirIndexUrl).subscribe(mems => this.memories = mems);
    var a = dirIndexUrl.split('/')
    this.dirName = a[a.length - 2]
  }

}
