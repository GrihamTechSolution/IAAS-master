import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/models/Country';
import { Partner } from 'src/app/models/Partner';
import { environment } from 'src/environments/environment';
import { PartnerService } from 'src/app/services/partner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from 'src/app/services/country.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NotifierService } from 'angular-notifier';
import { FileUploader } from 'ng2-file-upload';
import { UserService } from 'src/app/services/user.service';
import { forkJoin } from 'rxjs';
import { UserTypeEnum } from 'src/app/enums/UserTypeEnum';

@Component({
  selector: 'app-addeditpartner',
  templateUrl: './addeditpartner.component.html',
  styleUrls: ['./addeditpartner.component.css']
})
export class AddeditpartnerComponent implements OnInit {

  uploader: FileUploader = new FileUploader({
    url: `${environment.apiUrl}/upload`,
    itemAlias: 'doc'
  })

  countries: Country[] = [];
  partner: Partner = new Partner();
  edit: boolean = false;
  fileAdded: boolean = false;
  apiStaticUrl = `${environment.apiUrl}/`;
  userData: any;
  uploadImageSource = environment.uploadImageSource

  constructor(private partnerService: PartnerService,
              private activatedRoute: ActivatedRoute,
              private countryService: CountryService,
              private loadingSpinner: Ng4LoadingSpinnerService,
              private notifier: NotifierService,
              private router: Router,
              private auth: UserService) { }

  ngOnInit() {
    this.loadingSpinner.show();

    let user = this.auth.getLoggedInUserData();
    if (!user) {
      this.loadingSpinner.hide();
      this.router.navigateByUrl('/');
    }

    let userObs = this.auth.getUserData(user.id);
    let countryObs = this.countryService.getCountries(); 

    forkJoin([userObs, countryObs]).subscribe(data => {
      this.userData = data[0];
      switch(user.userTypeID) {
        case UserTypeEnum.Administrator: 
        case UserTypeEnum.ExecutiveBoard: 
          this.countries = data[1];
          this.loadingSpinner.hide();
          break;
        case UserTypeEnum.RegionalDirector: 
          this.countries = data[1].filter(c => c.regionID == this.userData.regionID);
          this.loadingSpinner.hide();
          break;
        case UserTypeEnum.NationalDirector:
        case UserTypeEnum.ExchangeCoordinator:
          this.countries = data[1].filter(c => c.id == this.userData.countryID); 
          this.loadingSpinner.hide();
          break;
        default: 
          this.loadingSpinner.hide();
          this.router.navigateByUrl('/');
          break;
      }
    })

    this.activatedRoute.params.subscribe(params => {
      if (params['id']){
        this.edit = true;
        this.partnerService.getPartnerByID(params['id']).subscribe(data => {
          this.partner = data;
          this.loadingSpinner.hide();
        })
      }
    })

    this.uploader.onAfterAddingFile = (file) => {
      this.loadingSpinner.show();
      file.withCredentials = false; 
      this.uploader.uploadAll();
    }

    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      this.loadingSpinner.hide();
      response = JSON.parse(response);
      if (response.status == 0) {
        this.partner.imagePath = response.filename;
          this.partner.imagePath = response.filename;
          this.notifier.notify('success', 'Image uploaded!');
          // this.addEditSponsor();
      }
    }

    this.loadingSpinner.hide();
  }

  addEditPartner(){
    this.loadingSpinner.show();

    if (this.edit){
      this.partnerService.updatePartner(this.partner).subscribe(data => {
        this.loadingSpinner.hide();
        if (data.status == 0) {
          this.notifier.notify("info", "Partner updated!");
          this.router.navigateByUrl('/administration/partners');
        }
        else {
          this.notifier.notify("error", "Error while updating partner");
        }
      })
    }
    else {

      if (this.userData.userTypeID != 3 && this.userData.userTypeID != 4) {
        this.partner.isShown = 0;
        this.partner.studyAbroad = 0;
      }

      this.partnerService.insertPartner(this.partner).subscribe(data => {
        this.loadingSpinner.hide();
        if (data.status == 0) {
          this.notifier.notify("info", "Partner inserted!");
          this.router.navigateByUrl('/administration/partners');
        }
        else {
          this.notifier.notify("error", "Error while inserting partner!");
        }
      })
    }
  }

  validateInput(){
    if (!this.partner.name ||
        !this.partner.countryID ||
        !this.partner.description) {
      this.notifier.notify("error", "Please insert all partner data!");
      return;
    }

    this.addEditPartner();
  }

}
