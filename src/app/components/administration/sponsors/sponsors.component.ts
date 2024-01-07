import { Component, OnInit } from '@angular/core';
import { SponsorService } from 'src/app/services/sponsor.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { environment } from './../../../../environments/environment';
import { NotifierService } from 'angular-notifier';
import { Sponsor } from 'src/app/models/Sponsor';
import { Country } from 'src/app/models/Country';
import { CountryService } from 'src/app/services/country.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { UserTypeEnum } from 'src/app/enums/UserTypeEnum';
import { User } from 'src/app/models/User';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.css']
})
export class SponsorsComponent implements OnInit {

  sponsors: Sponsor[] = [];
  fullSponsors: Sponsor[] = [];
  countries: Country[] = [];
  apiStaticUrl = `${environment.apiUrl}/`;
  uploadImageSource = environment.uploadImageSource
  searchName: string;
  searchCountryID: number;
  userData: any;

  constructor(private sponsorService : SponsorService,
              private countryService: CountryService,
              private loadingSpinner: Ng4LoadingSpinnerService,
              private notifierService: NotifierService,
              private auth: UserService, 
              private router: Router) { }

  ngOnInit() {

    let user = this.auth.getLoggedInUserData(); 

    if (!user){
      this.router.navigateByUrl('/');
    }

    this.auth.getUserData(user.id).subscribe(data => {
      this.userData = data;
    })

    this.loadingSpinner.show();

    let countryObs = this.countryService.getCountries(); 
    let sponsorsObs = this.sponsorService.getSponsors();

    forkJoin([countryObs, sponsorsObs]).subscribe(data => {
      switch(user.userTypeID) 
      {
        case UserTypeEnum.Administrator: 
        case UserTypeEnum.ExecutiveBoard: 
          this.sponsors = data[1];
          this.fullSponsors = data[1];
          this.countries = data[0];
          this.loadingSpinner.hide();
          break;
        case UserTypeEnum.RegionalDirector: 
          this.sponsors = data[1].filter(c => c.country.regionID == this.userData.regionID);
          this.fullSponsors = data[1].filter(c => c.country.regionID == this.userData.regionID);
          this.countries = data[0].filter(c => c.regionID == this.userData.regionID);
          this.loadingSpinner.hide();
          break;
        case UserTypeEnum.NationalDirector:
        case UserTypeEnum.ExchangeCoordinator:
          this.sponsors = data[1].filter(s => s.countryID == this.userData.countryID);
          this.fullSponsors = data[1].filter(s => s.countryID == this.userData.countryID);
          this.countries = data[0].filter(c => c.id == this.userData.countryID); 
          this.loadingSpinner.hide();
          break;
        default: 
          this.loadingSpinner.hide();
          this.router.navigateByUrl('/');
          break;
      }
    })
  }

  deleteSponsor(id: number){
    if (confirm("Are you sure?")) {
      this.loadingSpinner.show();

      this.sponsorService.deleteSponsor(id).subscribe(data => {
        if (data.status == 0) {
          this.notifierService.notify("success", "Sponsor deleted!");
        }
        else {
          this.notifierService.notify("error", "Error while deleting sponsor!");
        }
        this.loadingSpinner.hide();
        this.ngOnInit();
      })
    }
  }

  searchSponsors(){
    this.sponsors = this.fullSponsors;

    if (this.searchName) {
      this.sponsors = this.sponsors.filter(e => {
        return e.name.toLowerCase().indexOf(this.searchName.toLowerCase()) != -1;
      })
    }

    if (this.searchCountryID){
      this.sponsors = this.sponsors.filter(e => {
        return e.countryID == this.searchCountryID;
      })
    }
  }

  resetFilters(){
    this.sponsors = this.fullSponsors;
    this.searchName = null;
    this.searchCountryID = null;
  }

}
