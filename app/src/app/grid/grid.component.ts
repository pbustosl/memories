import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  minDate = new Date(2001,0);
  maxDate = new FormControl(new Date());

  constructor(private nasService: NasService) { }

  getPhotos(): void {
    this.nasService.getPhotos().subscribe(photos => this.photos = photos);
  }

  ngOnInit(): void {
    this.getPhotos();
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    alert(`${type}: ${event.value}`);
  }
}
