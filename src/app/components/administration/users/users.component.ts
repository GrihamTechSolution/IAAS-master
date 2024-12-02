import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { NotifierService } from 'angular-notifier';
import { Country } from 'src/app/models/Country';
import { Region } from 'src/app/models/Region';
import { ThrowStmt } from '@angular/compiler';
import { CountryService } from 'src/app/services/country.service';
import { RegionService } from 'src/app/services/region.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  iaasUsers: User[] = [];
  helperIaasUsers: User[] = [];
  countries: Country[] = [];
  regions: Region[] = [];

  searchUserTypeID: number; 
  searchCountryID: number;
  searchRegionID: number;

  constructor(private loadingSpinner: Ng4LoadingSpinnerService, 
              private userService: UserService, 
              private notifier: NotifierService,
              private countryService: CountryService, 
              private regionService: RegionService) { }

  ngOnInit(): void {
    this.loadingSpinner.show(); 

    let userObs = this.userService.getIAASUsers();
    let countryObs = this.countryService.getCountries();
    let regionObs = this.regionService.getRegions();

    forkJoin([userObs, countryObs, regionObs]).subscribe(data => {
      this.iaasUsers = data[0];
      this.helperIaasUsers = data[0];
      this.countries = data[1];
      this.regions = data[2];
      this.loadingSpinner.hide();
    })

    this.userService.getIAASUsers().subscribe(data => {
      this.iaasUsers = data;
      this.loadingSpinner.hide();
    })
  }

  deactivateUser(user){
    if (confirm("Are you sure?")) {
      this.loadingSpinner.show(); 
      this.userService.deactivateUser(user).subscribe(data => {
        if (data.status == 0) {
          this.notifier.notify('success', 'User deactivated!');
          // this.loadingSpinner.hide();
          this.ngOnInit();
        }
        else {
          this.notifier.notify('error', 'Error while deactivating student!');
        }
      })
    }
  }

  activateUser(user) {
    if (confirm("Are you sure?")) {
      this.loadingSpinner.show();
      this.userService.activateUser(user).subscribe(data => {
        if (data.status == 0) {
          this.notifier.notify('success', 'User Activated!');
          this.ngOnInit();
        }
        else {
          this.notifier.notify('error', 'Error while activating student!');
        }
      })
    }
  }

  searchUsers(){
    this.iaasUsers = this.helperIaasUsers;
    if (this.searchUserTypeID) 
      this.iaasUsers = this.iaasUsers.filter(u => u.userTypeID == this.searchUserTypeID);
    
    if (this.searchCountryID)
      this.iaasUsers = this.iaasUsers.filter(u => u.countryID == this.searchCountryID);
    
    if (this.searchRegionID)
      this.iaasUsers = this.iaasUsers.filter(u => u.regionID == this.searchRegionID);
  }

  resetFilters(){
    this.iaasUsers = this.helperIaasUsers;
    this.searchUserTypeID = this.searchRegionID = this.searchCountryID = null;
  }

}
