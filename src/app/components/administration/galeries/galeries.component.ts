import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-galeries',
  templateUrl: './galeries.component.html',
  styleUrls: ['./galeries.component.css']
})
export class GaleriesComponent implements OnInit {
  imageSource = environment.imageSource
  constructor() { }

  ngOnInit() {
  }

}
