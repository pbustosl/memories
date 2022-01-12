import { Component, OnInit } from '@angular/core';
import { Photo } from '../photo';
import { PHOTOS } from '../mock-photos';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  constructor() { }

  photos = PHOTOS;

  ngOnInit(): void {
  }

}
