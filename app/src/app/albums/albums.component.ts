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

  sections() {
    let ret = new Set<string>();
    for (var album of this.memoriesService.albums) {
      ret.add(this.section(album))
    }
    return ret;
  }
  section(album: Album) {
    return album.name.split(' ')[0];
  }

}
