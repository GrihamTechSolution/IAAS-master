import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-presentation-study-abroad-universities',
  templateUrl: './presentation-study-abroad-universities.component.html',
  styleUrls: ['./presentation-study-abroad-universities.component.scss']
})
export class PresentationStudyAbroadUniversitiesComponent implements OnInit {

  apiUrl = environment.apiUrl;

  imageSource = environment.imageSource
  uploadImageSource = environment.uploadImageSource

  constructor() { }

  ngOnInit(): void {
  }

}
