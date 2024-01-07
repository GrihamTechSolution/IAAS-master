import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-icya',
  templateUrl: './icya.component.html',
  styleUrls: ['./icya.component.scss']
})
export class IcyaComponent implements OnInit {

  imageSource = environment.imageSource

  constructor() { }

  ngOnInit(): void {
  }

}
