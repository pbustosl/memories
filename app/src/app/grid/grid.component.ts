import { Component, OnInit } from '@angular/core';
import { Photo } from '../photo';
import { NasService } from '../nas.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  photos: Photo[] = [];

  constructor(private nasService: NasService) { }

  getPhotos(): void {
    this.photos = this.nasService.getPhotos();
  }

  ngOnInit(): void {
    this.getPhotos();
  }

}
