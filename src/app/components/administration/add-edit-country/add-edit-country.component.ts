import { Component, OnInit } from '@angular/core';
import { Region } from 'src/app/models/Region';
import { CountryStatus } from 'src/app/models/CountryStatus';
import { CountryCategory } from 'src/app/models/CountryCategory';
import { Country } from 'src/app/models/Country';
import { RegionService } from 'src/app/services/region.service';
import { CountryStatusService } from 'src/app/services/country-status.service';
import { CountryCategoryService } from 'src/app/services/country-category.service';
import { CountryService } from 'src/app/services/country.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NotifierService } from 'angular-notifier';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user.service';
import { UserTypeEnum } from 'src/app/enums/UserTypeEnum';

@Component({
  selector: 'app-add-edit-country',
  templateUrl: './add-edit-country.component.html',
  styleUrls: ['./add-edit-country.component.css']
})
export class AddEditCountryComponent implements OnInit {

  regions: Region[] = [];
  statuses: CountryStatus[] = [];
  categories: CountryCategory[] = [];
  country: Country = new Country();
  edit: boolean = false;
  fileAdded: boolean = false;
  apiStaticUrl = `${environment.apiUrl}/`;
  userData: any;

  uploader: FileUploader = new FileUploader({
    url: `${environment.apiUrl}/upload`,
    itemAlias: 'doc'
  })

  constructor(private regionService: RegionService,
              private statusService: CountryStatusService,
              private categoryService: CountryCategoryService,
              private countryService: CountryService, 
              private activatedRoute: ActivatedRoute, 
              private router: Router,
              private loadingSpinner: Ng4LoadingSpinnerService,
              private notifier: NotifierService, 
              private auth: UserService) { }

  ngOnInit() {

    let user = this.auth.getLoggedInUserData(); 

    if (!user){
      this.router.navigateByUrl('/');
    }

    this.auth.getUserData(user.id).subscribe(data => {
      this.userData = data;
      if (this.userData.userTypeID == UserTypeEnum.RegionalDirector) {
        this.country.regionID = this.userData.regionID;
        console.log(this.country);
      }
    })

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false; 
      this.fileAdded = true;
    }

    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      response = JSON.parse(response);
      if (response.status == 0) {
        this.country.photo = response.filename;
        this.addEditCountry();
      }
    }

    this.regionService.getRegions().subscribe(data => {
      this.regions = data;
    })

    this.categoryService.getCountryCategories().subscribe(data => {
      this.categories = data;
    })

    this.statusService.getCountryStatuses().subscribe(data => {
      this.statuses = data;
    })

    this.activatedRoute.params.subscribe(params => {
      if (params['id']){
        this.edit = true;
        this.countryService.getCountryByID(params['id']).subscribe(data => {
          this.country = data;
          this.loadingSpinner.hide();
        })
      }
      else {
        this.loadingSpinner.hide();
      }
    })
  }

  addEditCountry(){
    this.loadingSpinner.show();

    if (this.edit) {
      this.countryService.updateCountry(this.country).subscribe(data => {
        this.loadingSpinner.hide();
        if (data.status == 0) {
          this.notifier.notify("success", "Country updated!");
          this.router.navigateByUrl('/administration/countries');
        }
        else {
          this.notifier.notify("error", "Error while updating country");
        }
      })
    }
    else {
      this.countryService.insertCountry(this.country).subscribe(data => {
        this.loadingSpinner.hide();
        if (data.status == 0) {
          this.notifier.notify("success", "Country inserted!");
          this.router.navigateByUrl('/administration/countries');
        }
        else {
          this.notifier.notify("error", "Error while inserting country!");
        }
      })
    }
  }

  validateInput(){
    if (!this.country.name ||
        !this.country.regionID || 
        !this.country.statusID || 
        !this.country.categoryID) {
          this.notifier.notify("error", "Please insert all necessary country data!");
          return;
        }

    if (!this.edit && !this.fileAdded) {
      this.notifier.notify("error", "Please attach logo file!");
      return;
    }

    if (this.fileAdded) {
      this.uploader.uploadAll();
    }
    else {
      this.addEditCountry();
    }
  }

}
