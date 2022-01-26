import { Component, OnInit } from '@angular/core';
import { Album } from '../album';
import { MemoriesService } from '../memories.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  constructor(public memoriesService: MemoriesService) { }

  ngOnInit(): void {
  }

}
