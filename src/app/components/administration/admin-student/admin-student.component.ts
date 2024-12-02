import { Component, OnInit } from '@angular/core';
import { StudentsService } from 'src/app/services/students.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Student } from 'src/app/models/Student';
import { environment } from 'src/environments/environment';
import { Country } from 'src/app/models/Country';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-admin-student',
  templateUrl: './admin-student.component.html',
  styleUrls: ['./admin-student.component.scss']
})
export class AdminStudentComponent implements OnInit {

  student: Student = new Student();
  apiUrl = environment.apiUrl;
  uploadImageSource = environment.uploadImageSource
  constructor(private router: Router,
              private studentService: StudentsService,
              private spinner: Ng4LoadingSpinnerService,
              private activatedRoute: ActivatedRoute, 
              private countryService: CountryService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.activatedRoute.params.subscribe(data => {
      if (data['id']){
        this.studentService.getStudentByID(data['id']).subscribe(studentData => {
          this.student = studentData;
          if(!this.student.user.country) {
            this.student.user.country = new Country();
            if (this.student.user.originalCountryCode) {
              this.student.user.country.name = this.countryService.allCountries().filter(c => c.code.toLowerCase() === this.student.user.originalCountryCode.toLowerCase())[0].name;
            }

          }
          this.spinner.hide();
        })
      }
    })
  }

}
