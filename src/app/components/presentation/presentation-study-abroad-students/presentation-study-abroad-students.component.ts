import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-presentation-study-abroad-students',
  templateUrl: './presentation-study-abroad-students.component.html',
  styleUrls: ['./presentation-study-abroad-students.component.scss']
})
export class PresentationStudyAbroadStudentsComponent implements OnInit {

  apiUrl = environment.apiUrl;

  imageSource = environment.imageSource
  uploadImageSource = environment.uploadImageSource
  constructor() { }

  ngOnInit(): void {
  }

}
