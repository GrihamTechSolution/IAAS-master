import { Component, OnInit } from '@angular/core';
import { InternshipService } from 'src/app/services/internship.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Internship } from 'src/app/models/Internship';
import { Country } from 'src/app/models/Country';
import { CountryService } from 'src/app/services/country.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { UserTypeEnum } from 'src/app/enums/UserTypeEnum';

@Component({
  selector: 'app-admin-internships',
  templateUrl: './admin-internships.component.html',
  styleUrls: ['./admin-internships.component.scss']
})
export class AdminInternshipsComponent implements OnInit {

  internships: Internship[] = [];
  filteredInternships: Internship[] = [];
  countries: Country[] = [];
  userData: any;

  // search params
  name: string;
  countryID: number;
  opTaker: string;

  constructor(private internshipService: InternshipService,
              private spinner: Ng4LoadingSpinnerService,
              private countryService: CountryService, 
              private auth: UserService, 
              private router: Router) { }

  ngOnInit(): void {
    this.spinner.show();

    let user = this.auth.getLoggedInUserData(); 
    if (!user) {
      this.spinner.hide(); 
      this.router.navigateByUrl('/');
    }

    let userObs = this.auth.getUserData(user.id);
    let countryObs = this.countryService.getCountries();
    let internshipObs = this.internshipService.getInternships();

    forkJoin([userObs, countryObs, internshipObs]).subscribe(data => {
      this.userData = data[0];
      switch(user.userTypeID) {
        case UserTypeEnum.Administrator: 
        case UserTypeEnum.ExecutiveBoard: 
          this.internships = data[2];
          this.filteredInternships = data[2];
          this.countries = data[1];
          this.spinner.hide();
          break;
        case UserTypeEnum.RegionalDirector: 
          this.internships = data[2].filter(i => i.country.regionID == this.userData.regionID);
          this.filteredInternships = data[2].filter(i => i.country.regionID == this.userData.regionID);
          this.countries = data[1].filter(c => c.regionID == this.userData.regionID);
          this.spinner.hide();
          break;
        case UserTypeEnum.NationalDirector:
        case UserTypeEnum.ExchangeCoordinator:
          this.internships = data[2].filter(i => i.country.id == this.userData.countryID);
          this.filteredInternships = data[2].filter(i => i.country.id == this.userData.countryID);
          this.countries = data[1].filter(c => c.id == this.userData.countryID); 
          this.spinner.hide();
          break;
        default: 
          this.spinner.hide();
          this.router.navigateByUrl('/');
          break;
      }
    })
  }

  removeFilters(){
    this.name = '';
    this.opTaker = '';
    this.countryID = 0;
    this.filteredInternships = this.internships;
  }

  searchInternships(){
    this.filteredInternships = this.internships;
    if (this.name) {
      this.filteredInternships = this.filteredInternships.filter(e => {
        return e.name.toLowerCase().indexOf(this.name.toLowerCase()) != -1;
      })
    }

    if (this.opTaker) {
      this.filteredInternships = this.filteredInternships.filter(e => {
        return e.op_taker.name.toLowerCase().indexOf(this.opTaker.toLowerCase()) != -1;
      })
    }

    if (this.countryID) {
      this.filteredInternships = this.filteredInternships.filter(e => {
        return e.countryID == this.countryID;
      })
    }
  }

}
