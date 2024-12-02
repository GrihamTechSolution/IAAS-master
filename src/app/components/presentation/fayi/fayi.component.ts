import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-fayi',
  templateUrl: './fayi.component.html',
  styleUrls: ['./fayi.component.scss']
})
export class FayiComponent implements OnInit {

  imageSource = environment.imageSource

  constructor() { }

  ngOnInit(): void {
  }

}
