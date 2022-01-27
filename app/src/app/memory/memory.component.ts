import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { Memory } from '../memory';
import { MemoriesService } from '../memories.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-image',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.css']
})
export class MemoryComponent implements OnInit {

  memoryIndex: number = 0;
  memory: Memory | undefined;
  touchStart: TouchEvent | undefined;
  touchStartTime: Date = new Date();

  constructor(private route: ActivatedRoute,
              private router: Router,
              public memoriesService: MemoriesService,
              private location: Location) { }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    this.memoryIndex = Number(routeParams.get('memoriesIndex'));
    this.memory = this.memoriesService.memories[this.memoryIndex];
  }

  setTouchStart(evt: any) {
    this.touchStart = evt;
    this.touchStartTime = new Date();
  }
  setTouchEnd(evt: any) {
    if(this.touchStart){
      if (new Date().getTime() - this.touchStartTime.getTime() < 200){ // 200ms
        var dir = this.getTouchDirection(evt);
        if (dir == "left"){
          if(this.memoryIndex > 0){
            this.memoryIndex--;
            this.memory = this.memoriesService.memories[this.memoryIndex];
          }
          else
            this.router.navigate(['/']);
        }
        if (dir == "right"){
          if(this.memoryIndex < this.memoriesService.memories.length - 1){
            this.memoryIndex++;
            this.memory = this.memoriesService.memories[this.memoryIndex];
          }
          else
            this.router.navigate(['/']);
        }
        if (dir == "up")
          this.location.back();
      }
      this.touchStart = undefined;
    }
  }
  getTouchDirection(touchEndEvt: any) {
    if (!this.touchStart)
      return "unknown";
    var deltaX = this.touchStart.touches[0].screenX - touchEndEvt.changedTouches[0].screenX;
    var deltaY = this.touchStart.touches[0].screenY - touchEndEvt.changedTouches[0].screenY;
    if (Math.abs(deltaX) > Math.abs(deltaY)) // horizontal
      return deltaX > 0 ? "left" :  "right";
    else // vertical
      return deltaY > 0 ? "up" : "down";
  }

}
