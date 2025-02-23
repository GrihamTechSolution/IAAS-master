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
declare var $: any; // Ensure jQuery is available for Bootstrap modal


@Component({
  selector: 'app-admin-alumini',
  templateUrl: './admin-alumini.component.html',
  styleUrls: ['./admin-alumini.component.scss']
})
export class AdminAluminiomponent implements OnInit {

  students: Student[] = [];
  selectedStudent: any = null;
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
    this.studentsService.getAlumni().subscribe(data => {
      this.students = data;
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

  openModal(student: any): void {
    this.selectedStudent = student;
    $('#studentModal').modal('show'); // Open Bootstrap modal
  }
}
