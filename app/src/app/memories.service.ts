import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Memory } from './memory';

@Injectable({
  providedIn: 'root'
})
export class MemoriesService {

  minDate: Date = new Date();
  maxDate: Date = new Date();
  memories: Memory[] = [];

  constructor(private http: HttpClient) { }

  setDate(d: Date) {
    var memoriesUrl = '/assets/mock-thumbnails.json';
    // TODO get list of monthly files
    // this.getMonthlyFiles();
    this.minDate = new Date(2001,0);
    this.maxDate = d;

    // TODO get the monthly file closest to maxDate
    this.http.get<Memory[]>(memoriesUrl).subscribe(mems => this.memories = mems);
  }

}
