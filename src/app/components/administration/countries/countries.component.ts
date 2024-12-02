import { Component, OnInit } from '@angular/core';
import { CountryService } from 'src/app/services/country.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NotifierService } from 'angular-notifier';
import { RegionService } from 'src/app/services/region.service';
import { Country } from 'src/app/models/Country';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { UserTypeEnum } from 'src/app/enums/UserTypeEnum';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  countries:Country[] = [];
  fullCountries: Country[];
  regions = [];
  searchName: string = null;
  searchRegionID: number;
  userData: any;

  constructor(private countryService: CountryService, 
              private regionService: RegionService,
              private loadingSpinner: Ng4LoadingSpinnerService, 
              private notifierService: NotifierService, 
              private auth: UserService, 
              private router: Router) { }

  ngOnInit() {
    this.loadingSpinner.show();

    let user = this.auth.getLoggedInUserData(); 

    if (!user){
      this.router.navigateByUrl('/');
      this.loadingSpinner.hide();
    }

    let userObs = this.auth.getUserData(user.id);
    let regionObs = this.regionService.getRegions();
    let countryObs = this.countryService.getCountries();

    forkJoin([userObs, regionObs, countryObs]).subscribe(data => {
      this.userData = data[0];
      switch(user.userTypeID) 
      {
        case UserTypeEnum.Administrator: 
        case UserTypeEnum.ExecutiveBoard: 
          this.countries = data[2];
          this.fullCountries = data[2];
          this.regions = data[1];
          this.loadingSpinner.hide();
          break;
        case UserTypeEnum.RegionalDirector: 
          this.countries = data[2].filter(c => c.regionID == this.userData.regionID);
          this.fullCountries = data[2].filter(c => c.regionID == this.userData.regionID);;
          this.regions = data[1].filter(r => r.id == this.userData.regionID);
          this.loadingSpinner.hide();
          break;
        case UserTypeEnum.NationalDirector: 
        case UserTypeEnum.ExchangeCoordinator: 
          this.countries = data[2].filter(c => c.id == this.userData.countryID);
          this.fullCountries = data[2].filter(c => c.id == this.userData.countryID);;
          this.regions = data[1].filter(r => r.id == this.countries[0].regionID);
          this.loadingSpinner.hide();
          break;
        default: 
          this.router.navigateByUrl('/');
          break;
      }
    })
  }

  deleteCountry(id: number){
    if (confirm("Are you sure?")) {
      this.loadingSpinner.show();

      this.countryService.deleteCountry(id).subscribe(data => {
        if (data.status == 0) {
          this.notifierService.notify("success", "Country deleted!");
        }
        else {
          this.notifierService.notify("error", "Error while deleting country!");
        }
        this.loadingSpinner.hide();
        this.ngOnInit();
      })
    }
  }

  searchCountries(){
    this.countries = this.fullCountries;

    if (this.searchName) {
      this.countries = this.countries.filter(e => {
        return e.name.toLowerCase().indexOf(this.searchName.toLowerCase()) != -1;
      })
    }

    if (this.searchRegionID) {
      this.countries = this.countries.filter(e => {
        return e.regionID == this.searchRegionID;
      })
    }
  }

  resetFilters(){
    this.searchRegionID = null;
    this.searchName = null;
    this.countries = this.fullCountries;
  }

}
