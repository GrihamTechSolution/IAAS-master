import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { forkJoin } from 'rxjs';
import { UserTypeEnum } from 'src/app/enums/UserTypeEnum';
import { Application } from 'src/app/models/Application';
import { Internship } from 'src/app/models/Internship';
import { Student } from 'src/app/models/Student';
import { User } from 'src/app/models/User';
import { ApplicationService } from 'src/app/services/application.service';
import { InternshipService } from 'src/app/services/internship.service';
import { StudentsService } from 'src/app/services/students.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-applications',
  templateUrl: './admin-applications.component.html',
  styleUrls: ['./admin-applications.component.scss']
})
export class AdminApplicationsComponent implements OnInit {

  applications: Application[] = [];
  helperApplications: Application[] = [];
  internships: Internship[] = [];
  students: Student[] = [];
  userData: any;
  apiUrl = environment.apiUrl;
  uploadImageSource = environment.uploadImageSource
  
  selectedInternshipID: number; 
  filterStudentText: string;

  constructor(private loadingSpinner: Ng4LoadingSpinnerService, 
              private applicationService: ApplicationService,
              private internshipService: InternshipService,
              private router: Router, 
              private notifier: NotifierService,
              private auth: UserService) { }

  ngOnInit(): void {
    this.loadingSpinner.show(); 

    let user = this.auth.getLoggedInUserData();
    if (!user) {
      this.loadingSpinner.hide();
      this.router.navigateByUrl('/');
    }

    let userObs = this.auth.getUserData(user.id);
    let internshipsObs = this.internshipService.getInternships(); 
    let applicationsObs = this.applicationService.getApplications();

    forkJoin([internshipsObs, applicationsObs, userObs]).subscribe(data => {
      this.userData = data[2];

      switch(user.userTypeID) {
        case UserTypeEnum.Administrator: 
        case UserTypeEnum.ExecutiveBoard: 
        this.internships = data[0];
        this.applications = data[1].filter(a => !a.status);
        this.helperApplications = data[1].filter(a => !a.status);
          this.loadingSpinner.hide();
          break;
        case UserTypeEnum.RegionalDirector: 
          this.internships = data[0].filter(i => i.country && i.country.regionID == this.userData.regionID);
          this.applications = data[1].filter(a => (a.user.country && a.user.country.regionID == this.userData.regionID) ||
                                                  (a.internship.country && a.internship.country.regionID == this.userData.regionID));
          this.helperApplications = data[1].filter(a => (a.user.country && a.user.country.regionID == this.userData.regionID) ||
                                                  (a.internship.country && a.internship.country.regionID == this.userData.regionID));
          this.loadingSpinner.hide();
          break;
        case UserTypeEnum.NationalDirector:
        case UserTypeEnum.ExchangeCoordinator:
          this.internships = data[0].filter(i => i.country && i.country.id == this.userData.countryID);
          this.applications = data[1].filter(a => (a.user.country && a.user.country.id == this.userData.countryID) ||
                                                  (a.internship.country && a.internship.country.id == this.userData.countryID));
          this.helperApplications = data[1].filter(a => (a.user.country && a.user.country.id == this.userData.countryID) ||
                                                  (a.internship.country && a.internship.country.id == this.userData.countryID));
          this.loadingSpinner.hide();
          break;
        default: 
          this.loadingSpinner.hide();
          this.router.navigateByUrl('/');
          break;
      }

      
      this.loadingSpinner.hide();
    })
  }

  searchApplications(){
    this.applications = this.helperApplications;

    if (this.selectedInternshipID) {
      this.applications = this.applications.filter(a => a.internshipID == this.selectedInternshipID);
    }

    if (this.filterStudentText) {
      this.applications = this.applications.filter(a => {
        return a.user.firstName.toLowerCase().indexOf(this.filterStudentText.toLowerCase()) != -1 ||
        a.user.lastName.toLowerCase().indexOf(this.filterStudentText.toLowerCase()) != -1;
      })
    }
  }

  removeFilters(){
    this.applications = this.helperApplications;
    this.selectedInternshipID = 0; 
    this.filterStudentText = "";
  }

}
