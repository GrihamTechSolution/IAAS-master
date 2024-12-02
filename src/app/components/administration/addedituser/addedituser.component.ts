import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/models/Country';
import { CountryService } from 'src/app/services/country.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { NotifierService } from 'angular-notifier';
import { Region } from 'src/app/models/Region';
import { RegionService } from 'src/app/services/region.service';

@Component({
  selector: 'app-addedituser',
  templateUrl: './addedituser.component.html',
  styleUrls: ['./addedituser.component.scss']
})
export class AddedituserComponent implements OnInit {

  countries: Country[] = [];
  user: User = new User();
  edit: boolean = false;
  regions: Region[] = [];

  constructor(private countryService: CountryService, 
              private loadingSpinner: Ng4LoadingSpinnerService, 
              private activatedRoute: ActivatedRoute, 
              private userService: UserService, 
              private notifier: NotifierService, 
              private regionService: RegionService,
              private router: Router) { }

  ngOnInit(): void {  
    this.loadingSpinner.show(); 
    this.countryService.getCountries().subscribe(data => {
      this.countries = data;
    })

    this.regionService.getRegions().subscribe(data => {
      this.regions = data;
    })

    this.activatedRoute.params.subscribe(data => {
      if (data['id']){
        this.userService.getUserData(data['id']).subscribe(userData => {
          this.user = userData;
          this.edit = true;
          this.loadingSpinner.hide();
        })
      }
      else {
        this.loadingSpinner.hide();
      }
    })
  }

  insertOrEditUser(){
    if (this.user.password != this.user.confirmPassword) {
      this.notifier.notify('error', 'Passwords do not match!');
      return ;
    }

    if (confirm('Are you sure? ')) {

    if (this.edit) {
      this.userService.updateUser(this.user).subscribe(updateData => {
        if (updateData.status == 0) {
          this.notifier.notify('success', 'Account updated!');
          this.router.navigateByUrl('/administration/iaas-users');
          this.loadingSpinner.hide();
        }
        else {
          this.notifier.notify('error', 'Error while updating user!');
          this.loadingSpinner.hide();
        } 
      })
    }
    else {
        this.loadingSpinner.show(); 
        this.user.isActive = 1;

        this.userService.register(this.user).subscribe(registerData => {
          if (registerData.status == 0) {
            this.notifier.notify('success', 'Account created!');
            this.router.navigateByUrl('/administration/iaas-users');
            this.loadingSpinner.hide();
          }
          else {
            this.notifier.notify('error', 'Error while creating user!');
            this.loadingSpinner.hide();
          }
        })
      }
    }
  }

}
