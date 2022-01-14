import { Component, OnInit } from '@angular/core';
import { Memory } from '../memory';
import { NasService } from '../nas.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  memories: Memory[] = [];
  minDate: Date = new Date();
  maxDate: Date = new Date();

  constructor(private nasService: NasService) { }

  getMemories(): void {
    // TODO get the monthly file closest to maxDate
    this.nasService.getMemories(this.maxDate).subscribe(memories => this.memories = memories);
  }

  ngOnInit(): void {
    // TODO get list of monthly files
    // this.getMonthlyFiles();
    this.minDate = new Date(2001,0);
    this.maxDate = new Date();
    this.getMemories();
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    // alert(`${type}: ${event.value}`);
    if (type == 'change') {
      if (event.value != null) {
        this.maxDate = event.value;
        this.getMemories();
      }
    }
  }

  openThumbnail(memory: Memory) {
    alert(memory.id);
  }
}
