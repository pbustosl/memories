import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { Memory } from '../memory';
import { MemoriesService } from '../memories.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  memoryIndex: number = 0;
  touchStart: TouchEvent | undefined;

  constructor(private route: ActivatedRoute, private router: Router, public memoriesService: MemoriesService) { }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    this.memoryIndex = Number(routeParams.get('memoriesIndex'));
  }

  logTouch(evt: any, type: string) {
    if (type == "start") {
      this.touchStart = evt;
    }
    if (type == "end") {
      if(this.touchStart){
        var deltaX = this.touchStart.touches[0].screenX - evt.changedTouches[0].screenX;
        var deltaY = this.touchStart.touches[0].screenY - evt.changedTouches[0].screenY;
        if (Math.abs(deltaX) > Math.abs(deltaY)){
          if (deltaX > 0){ // left
            if(this.memoryIndex > 0)
              this.memoryIndex--;
          }
          else{ // right
            if(this.memoryIndex < this.memoriesService.memories.length - 1)
              this.memoryIndex++;
          }
        }
        else {
          if (deltaY > 0) // up
            this.router.navigate(['/']);
        }
        this.touchStart = undefined;
      }
    }
  }

}
