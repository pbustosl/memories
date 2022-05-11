import { Component, OnInit, HostListener } from '@angular/core';
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

  memory: Memory | undefined;
  touchStart: TouchEvent | undefined;
  touchStartTime: Date = new Date();

  @HostListener('window:keydown.ArrowLeft', ['$event'])
  @HostListener('window:keydown.ArrowRight', ['$event'])
  @HostListener('window:keydown.ArrowUp', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if(event.code == 'ArrowLeft')
      this.handlePageFlip("right");
    if(event.code == 'ArrowRight')
      this.handlePageFlip("left");
    if(event.code == 'ArrowUp')
      this.handlePageFlip("up");
  }

  constructor(private route: ActivatedRoute,
              private router: Router,
              public memoriesService: MemoriesService,
              private location: Location) { }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    this.memoriesService.memoryIndex = Number(routeParams.get('memoriesIndex'));
    this.memory = this.memoriesService.memories[this.memoriesService.memoryIndex];
  }

  setTouchStart(evt: any) {
    this.touchStart = evt;
    this.touchStartTime = new Date();
  }
  setTouchEnd(evt: any) {
    if(this.touchStart){
      if (new Date().getTime() - this.touchStartTime.getTime() < 200){ // 200ms
        this.handlePageFlip(this.getTouchDirection(evt))
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

  handlePageFlip(direction: String) {
    if (direction == "right"){
      if(this.memoriesService.memoryIndex > 0){
        this.memoriesService.memoryIndex--;
        this.memory = this.memoriesService.memories[this.memoriesService.memoryIndex];
      }
      else
        this.router.navigate(['/']);
    }
    if (direction == "left"){
      if(this.memoriesService.memoryIndex < this.memoriesService.memories.length - 1){
        this.memoriesService.memoryIndex++;
        this.memory = this.memoriesService.memories[this.memoriesService.memoryIndex];
      }
      else
        this.router.navigate(['/']);
    }
    if (direction == "up")
      this.location.back();
    return false; // in case it's called from html anchor onclick
  }

}
