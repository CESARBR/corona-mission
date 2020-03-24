import { Component, OnInit} from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss'],
})

export class SlidesComponent implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoHeight: true,
    centeredSlides: true,
    slideToClickedSlide: true
  };

  constructor() { }

  ngOnInit() {
  }

}
