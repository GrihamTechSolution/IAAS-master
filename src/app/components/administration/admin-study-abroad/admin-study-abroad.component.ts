import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { StudyAbroadService } from 'src/app/services/study-abroad.service';
import { StudyAbroadProgram } from 'src/app/models/StudyAbroadProgram';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-admin-study-abroad',
  templateUrl: './admin-study-abroad.component.html',
  styleUrls: ['./admin-study-abroad.component.scss']
})
export class AdminStudyAbroadComponent implements OnInit {

  programs: StudyAbroadProgram[] = [];
  helperPrograms: StudyAbroadProgram[] = [];
  searchName: string; 
  searchlocation: string; 

  constructor(private loadingSpinner: Ng4LoadingSpinnerService, 
              private studyAbroadProgramService: StudyAbroadService, 
              private notifier: NotifierService) { }

  ngOnInit(): void {
    this.loadingSpinner.show(); 
    this.studyAbroadProgramService.getStudyAbroadPrograms().subscribe(data => {
      this.programs = data;
      this.loadingSpinner.hide();
    })
  }

  deleteProgram(id){
    if (confirm("Are you sure?")){
      this.loadingSpinner.show(); 
      this.studyAbroadProgramService.deleteStudyAbroadProgram(id).subscribe(data => {
        if (data.status == 0) {
          this.notifier.notify("info", "Program succesfully deleted!");
          this.ngOnInit();
        }
        else {
          this.notifier.notify('error', "Error while deleting program!");
        }
        this.loadingSpinner.hide();
      })
    }
  }

  search(){
    this.programs = this.helperPrograms.filter(p => {
      return (p.title.toLowerCase().indexOf(this.searchName) != -1 ||
            p.location.toLowerCase().indexOf(this.searchlocation) != -1)
    })
  }
  
  removeFilters(){
    this.searchName = "";
    this.searchlocation = "";
    this.programs = this.helperPrograms;
  }

}
