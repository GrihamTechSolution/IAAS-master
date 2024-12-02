import { Component, OnInit } from '@angular/core';
import { StudyAbroadService } from 'src/app/services/study-abroad.service';
import { StudyAbroadProgram } from 'src/app/models/StudyAbroadProgram';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-study-abroad-list',
  templateUrl: './study-abroad-list.component.html',
  styleUrls: ['./study-abroad-list.component.scss']
})
export class StudyAbroadListComponent implements OnInit {

  programs: StudyAbroadProgram[] = [];
  apiUrl = environment.apiUrl;
  uploadImageSource = environment.uploadImageSource

  constructor(private studyAbroadService: StudyAbroadService) { }

  ngOnInit(): void {
    this.studyAbroadService.getStudyAbroadPrograms().subscribe(data => {
      this.programs = data;
    })
  }

}
