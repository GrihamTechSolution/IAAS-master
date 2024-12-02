import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentsService } from 'src/app/services/students.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Student } from 'src/app/models/Student';
import { Country } from 'src/app/models/Country';
import { CountryService } from 'src/app/services/country.service';
import { forkJoin } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { UserTypeEnum } from 'src/app/enums/UserTypeEnum';

@Component({
  selector: 'app-admin-students',
  templateUrl: './admin-students.component.html',
  styleUrls: ['./admin-students.component.scss']
})
export class AdminStudentsComponent implements OnInit {

  students: Student[] = [];
  filteredStudents: Student[] = [];
  countries: Country[] = [];
  allCountries: any = [];
  userData: any;

  // search params
  firstName: string;
  lastName: string;
  countryID: number;
  email: string;

  constructor(private router: Router,
              private studentsService: StudentsService, 
              private spinner: Ng4LoadingSpinnerService,
              private countryService: CountryService, 
              private auth: UserService) { }

  ngOnInit(): void {
    this.spinner.show();

    this.allCountries = this.countryService.allCountries();

    let user = this.auth.getLoggedInUserData(); 
    if (!user) {
      this.spinner.hide(); 
      this.router.navigateByUrl('/');
    }

    let countryObs = this.countryService.getCountries();
    let studentsObs = this.studentsService.getStudents();
    let userObs = this.auth.getUserData(user.id);

    forkJoin([countryObs, studentsObs, userObs]).subscribe(data => {
      this.userData = data[2];

      data[1].forEach(student => {
        if (!student.user.countryID) {
          if (student.user.originalCountryCode) 
            student.user.countryName = this.allCountries.filter(c => c.code.toLowerCase() === student.user.originalCountryCode.toLowerCase())[0].name;
        }
      })

      switch(user.userTypeID) {
        case UserTypeEnum.Administrator: 
        case UserTypeEnum.ExecutiveBoard: 
          this.students = data[1];
          this.filteredStudents = data[1];
          this.countries = data[0];
          this.spinner.hide();
          break;
        case UserTypeEnum.RegionalDirector:         
          this.students = data[1].filter(s => (s.user.country && s.user.country.regionID == this.userData.regionID) ||
                                        s.user.applications.some(app => app.internship.country.region.id == this.userData.regionID));
          this.filteredStudents = data[1].filter(s => (s.user.country && s.user.country.regionID == this.userData.regionID) ||
                                        s.user.applications.some(app => app.internship.country.region.id == this.userData.regionID));
          this.countries = data[0].filter(c => c.regionID == this.userData.regionID);
          this.spinner.hide();
          break;
        case UserTypeEnum.NationalDirector:
        case UserTypeEnum.ExchangeCoordinator:
          this.students = data[1].filter(s => (s.user.country && s.user.country.id == this.userData.countryID) || 
                                              s.user.applications.some(app => app.internship.country.id == this.userData.countryID));
          this.filteredStudents = data[1].filter(s => (s.user.country && s.user.country.id == this.userData.countryID) || 
                            s.user.applications.some(app => app.internship.country.id == this.userData.countryID));
          this.countries = data[0].filter(c => c.id == this.userData.countryID); 
          this.spinner.hide();
          break;
        default: 
          this.spinner.hide();
          this.router.navigateByUrl('/');
          break;
      }
      this.spinner.hide();
    })
  }

  searchStudents(){
    this.filteredStudents = this.students;
    if (this.firstName) {
      this.filteredStudents = this.filteredStudents.filter(e => {
        return e.user.firstName.toLowerCase().indexOf(this.firstName.toLowerCase()) != -1;
      })
    }

    if (this.lastName) {
      this.filteredStudents = this.filteredStudents.filter(e => {
        return e.user.lastName.toLowerCase().indexOf(this.lastName.toLowerCase()) != -1;
      })
    }

    if (this.countryID){
      this.filteredStudents = this.filteredStudents.filter(e => {
        return e.user.countryID && e.user.countryID == this.countryID;
      })
    }

    if (this.email) {
      this.filteredStudents = this.filteredStudents.filter(e => {
        return e.user.email.toLowerCase().indexOf(this.email.toLowerCase()) != -1;
      })
    }
  }

  removeFilters(){
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.countryID = 0;
    this.filteredStudents = this.students;
  }

}
