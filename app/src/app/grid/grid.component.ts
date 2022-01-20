import { Component, OnInit } from '@angular/core';
import { Memory } from '../memory';
import { MemoriesService } from '../memories.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  constructor(public memoriesService: MemoriesService) { }

  ngOnInit(): void {
    this.memoriesService.setDate(new Date());
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    // alert(`${type}: ${event.value}`);
    if (type == 'change') {
      if (event.value != null) {
        this.memoriesService.setDate(event.value);
      }
    }
  }

}
