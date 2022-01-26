import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Memory } from '../memory';
import { MemoriesService } from '../memories.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  constructor(public memoriesService: MemoriesService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    var i = Number(routeParams.get('albumIndex'));
    this.memoriesService.setAlbum(i);
  }

}
