import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-presentation-study-abroad-about',
  templateUrl: './presentation-study-abroad-about.component.html',
  styleUrls: ['./presentation-study-abroad-about.component.scss']
})
export class PresentationStudyAbroadAboutComponent implements OnInit {

  constructor() { }

  imageSource = environment.imageSource

  ngOnInit(): void {
  }

}
