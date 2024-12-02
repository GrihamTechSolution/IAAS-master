import { Component, OnInit } from '@angular/core';
import { OpTakerService } from 'src/app/services/op-taker.service';
import { environment } from 'src/environments/environment';
import { OPTaker } from 'src/app/models/OPTaker';
import { Country } from 'src/app/models/Country';
import { CountryService } from 'src/app/services/country.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NotifierService } from 'angular-notifier';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { UserTypeEnum } from 'src/app/enums/UserTypeEnum';

@Component({
  selector: 'app-admin-op-takers',
  templateUrl: './admin-op-takers.component.html',
  styleUrls: ['./admin-op-takers.component.scss']
})
export class AdminOpTakersComponent implements OnInit {

  apiUrl = environment.apiUrl;
  opTakers: OPTaker[] = [];
  filteredOPTakers: OPTaker[] = [];
  countries: Country[] = [];
  userData: any;

  name: string;
  countryID: number;

  uploadImageSource = environment.uploadImageSource

  constructor(private opTakerService: OpTakerService, 
              private countryService: CountryService, 
              private spinner: Ng4LoadingSpinnerService,
              private notifier: NotifierService,
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
    let opTakersObs = this.opTakerService.getOPTakers();

    forkJoin([userObs, countryObs, opTakersObs]).subscribe(data => {
      this.userData = data[0];
      switch(user.userTypeID) {
        case UserTypeEnum.Administrator: 
        case UserTypeEnum.ExecutiveBoard: 
          this.opTakers = data[2];
          this.filteredOPTakers = data[2];
          this.countries = data[1];
          this.spinner.hide();
          break;
        case UserTypeEnum.RegionalDirector: 
          this.opTakers = data[2].filter(op => op.user.countryID ? op.user.country.regionID == this.userData.regionID : false);
          this.filteredOPTakers = data[2].filter(op => op.user.countryID ? op.user.country.regionID == this.userData.regionID : false);
          this.countries = data[1].filter(c => c.regionID == this.userData.regionID);
          this.spinner.hide();
          break;
        case UserTypeEnum.NationalDirector:
        case UserTypeEnum.ExchangeCoordinator:
          this.opTakers = data[2].filter(op => op.user.countryID ? op.user.country.id == this.userData.countryID : false);
          this.filteredOPTakers = data[2].filter(op => op.user.countryID ? op.user.country.id == this.userData.countryID : false);
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

  removeFilters() {
    this.name = '';
    this.countryID = 0;
    this.filteredOPTakers = this.opTakers;
  }

  searchOPTakers(){
    this.filteredOPTakers = this.opTakers;
    if (this.name) {
      this.filteredOPTakers = this.filteredOPTakers.filter(e => {
        return e.user.firstName.toLowerCase().indexOf(this.name.toLowerCase()) != -1;
      })
    }

    if (this.countryID) {
      this.filteredOPTakers = this.filteredOPTakers.filter(e => {
        return e.user.countryID == this.countryID;
      })
    }
  }

  approveOPTaker(opTaker: OPTaker){
    if (confirm("Are you sure you want to approve OP Taker?")) {
      this.spinner.show();
      let user = opTaker.user;
      user.isActive = 1;
      this.auth.activateUser(user).subscribe(data => {
        if (data.status == 0) {
          this.notifier.notify('success', 'OP Taker approved!');
          this.spinner.hide();
          this.ngOnInit();
        }
      })
    }
  }
  
  disapproveOPTaker(opTaker: OPTaker){
    if (confirm("Are you sure you want to disapprove OP Taker?")) {
      this.spinner.show();
      let user = opTaker.user;
      user.isActive = 0;
      this.auth.deactivateUser(user).subscribe(data => {
        if (data.status == 0) {
          this.notifier.notify('success', 'OP Taker disapproved!');
          this.ngOnInit();
        }
      })
      this.spinner.hide();
    }
  }
  
  deleteOPTaker(id) {
    if (confirm("Are you sure you want to delete selected OP taker?")) {
      this.spinner.show(); 
      this.opTakerService.deleteOPTaker(id).subscribe(data => {
        if (data.status == 0) {
          this.notifier.notify('success', 'OP Taker deleted!');
          this.spinner.hide();
          this.ngOnInit();
        }
        else {
          this.notifier.notify('error', 'There are database objects that prevent this OP Taker to delete');
          this.spinner.hide();
        }
      })
    }
  }
}
