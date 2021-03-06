import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Memory } from '../memory';
import { MemoriesService } from '../memories.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  constructor(public memoriesService: MemoriesService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    var i = Number(routeParams.get('albumIndex'));
    this.memoriesService.setAlbum(i);
  }

  ngAfterViewInit(): void {
    this.scrollToLatestMemoryVisited();
  }

  scrollToLatestMemoryVisited(): void {
    if (this.memoriesService.memoryIndex == 0)
      return;
    var elem = document.getElementById(this.memoriesService.memoryIndex.toString());
    if (elem != null){
      elem.scrollIntoView();
    }
  }

}
