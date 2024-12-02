import { Component, ViewEncapsulation, ViewChild, OnInit, AfterViewInit } from '@angular/core';

declare var $ : any;

@Component({
  selector: 'app-about-us-map',
  templateUrl: './about-us-map.component.html',
  styleUrls: ['./about-us-map.component.scss']
})
export class AboutUsMapComponent implements OnInit, AfterViewInit {

  constructor() { }
  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {
    
    $('#world-map').vectorMap({map: 'world_mill_en'});
    
  }

}
