import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Memory } from '../memory';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  memory: Memory | undefined;
  touchStart: TouchEvent | undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const memoryIdFromRoute = Number(routeParams.get('id'));
    this.memory = {
      id: memoryIdFromRoute,
      type: "image",
      path: "/hello/image.jpg",
      tnpath: "/tn/image.jpg",
      url: "https://m.media-amazon.com/images/I/81o+mpJbPmL._SX679_PIbundle-6,TopRight,0,0_AA679SH20_.jpg",
      tnurl: "tntest.jpg",
      datetime: new Date(),
    };

    // Find the product that correspond with the id provided in route.
    // this.product = products.find(product => product.id === memoryIdFromRoute);
  }

  logTouch(evt: any, type: string) {
    if (type == "start") {
      this.touchStart = evt;
    }
    if (type == "end") {
      alert(evt.changedTouches[0].screenX);
      if(this.touchStart){
        alert(this.touchStart.touches[0].screenX);
      }
    }
  }

}
