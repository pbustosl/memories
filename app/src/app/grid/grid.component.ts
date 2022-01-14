import { Component, OnInit } from '@angular/core';
import { Photo } from '../photo';
import { NasService } from '../nas.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  photos: Photo[] = [];
  minDate: Date = new Date();
  maxDate: Date = new Date();

  constructor(private nasService: NasService) { }

  getPhotos(): void {
    this.nasService.getPhotos(this.maxDate).subscribe(photos => this.photos = photos);
  }

  ngOnInit(): void {
    this.minDate = new Date(2001,0);
    this.maxDate = new Date();
    this.getPhotos();
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    if (type == 'change') {
      if (event.value != null) {
        this.maxDate = event.value;
        this.getPhotos();
      }
    }
    // alert(`${type}: ${event.value}`);
  }
}
