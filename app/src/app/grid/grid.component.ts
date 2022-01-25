import { Component, OnInit } from '@angular/core';
import { Memory } from '../memory';
import { MemoriesService } from '../memories.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  constructor(public memoriesService: MemoriesService) { }

  ngOnInit(): void {
    this.memoriesService.setDirIndexUrl('/files/201505/dir_index.json');
    // this.memoriesService.setDirIndexUrl('/assets/mock-thumbnails.json');
  }

}
