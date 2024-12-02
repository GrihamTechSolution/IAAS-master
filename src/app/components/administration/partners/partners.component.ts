import { Component, OnInit } from '@angular/core';
import { Partner } from 'src/app/models/Partner';
import { PartnerService } from 'src/app/services/partner.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NotifierService } from 'angular-notifier';
import { environment } from 'src/environments/environment';
import { Country } from 'src/app/models/Country';
import { CountryService } from 'src/app/services/country.service';
import { forkJoin } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { UserTypeEnum } from 'src/app/enums/UserTypeEnum';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit {

  partners: Partner[] = [];
  fullPartners: Partner[] = [];
  apiStaticUrl = `${environment.apiUrl}/`;
  searchName: string;
  searchCountryID: number;
  countries: Country[] = [];
  userData: any;
  uploadImageSource = environment.uploadImageSource

  constructor(private partnerService: PartnerService,
              private countryService: CountryService,
              private loadingSpinner: Ng4LoadingSpinnerService,
              private notifier: NotifierService, 
              private auth: UserService, 
              private router: Router) { }

  ngOnInit() {
    this.loadingSpinner.show();

    let user = this.auth.getLoggedInUserData(); 

    if (!user) {
      this.loadingSpinner.hide();
      this.router.navigateByUrl('/');
    }

    let userObs = this.auth.getUserData(user.id);
    let countryObs = this.countryService.getCountries(); 
    let partnerObs = this.partnerService.getPartners(); 

    forkJoin([countryObs, partnerObs, userObs]).subscribe(data => {
      this.userData = data[2]; 
      switch(user.userTypeID) {
        case UserTypeEnum.Administrator: 
        case UserTypeEnum.ExecutiveBoard: 
          this.partners = data[1];
          this.fullPartners = data[1];
          this.countries = data[0];
          this.loadingSpinner.hide();
          break;
        case UserTypeEnum.RegionalDirector: 
          this.partners = data[1].filter(c => c.country.regionID == this.userData.regionID);
          this.fullPartners = data[1].filter(c => c.country.regionID == this.userData.regionID);
          this.countries = data[0].filter(c => c.regionID == this.userData.regionID);
          this.loadingSpinner.hide();
          break;
        case UserTypeEnum.NationalDirector:
        case UserTypeEnum.ExchangeCoordinator:
          this.partners = data[1].filter(s => s.countryID == this.userData.countryID);
          this.fullPartners = data[1].filter(s => s.countryID == this.userData.countryID);
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

  deletePartner(id:number){
    if (confirm("Are you sure?")) {
      this.loadingSpinner.show();

      this.partnerService.deletePartner(id).subscribe(data => {
        if (data.status == 0) {
          this.notifier.notify("info", "Partner succesfully deleted!");
          this.ngOnInit();
        }
        else {
          this.notifier.notify("error", "Error while deleting partner!");
        }
        this.loadingSpinner.hide();
      })
    }
  }

  searchPartners(){
    this.partners = this.fullPartners;

    if (this.searchName) {
      this.partners = this.partners.filter(e => {
        return e.name.toLowerCase().indexOf(this.searchName.toLowerCase()) != -1;
      })
    }

    if (this.searchCountryID){
      this.partners = this.partners.filter(e => {
        return e.countryID == this.searchCountryID;
      })
    }
  }

  resetFilters(){
    this.partners = this.fullPartners;
    this.searchName = null;
    this.searchCountryID = null;
  }

}
