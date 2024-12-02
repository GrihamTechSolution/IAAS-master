import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { SponsorService } from 'src/app/services/sponsor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from 'src/app/services/country.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Sponsor } from 'src/app/models/Sponsor';
import { Country } from 'src/app/models/Country';
import { NotifierService } from 'angular-notifier';
import { UserService } from 'src/app/services/user.service';
import { forkJoin } from 'rxjs';
import { UserType } from 'src/app/models/UserType';
import { UserTypeEnum } from 'src/app/enums/UserTypeEnum';

@Component({
  selector: 'app-addeditsponsor',
  templateUrl: './addeditsponsor.component.html',
  styleUrls: ['./addeditsponsor.component.css']
})
export class AddeditsponsorComponent implements OnInit {

  uploader: FileUploader = new FileUploader({
    url: `${environment.apiUrl}/upload`,
    itemAlias: 'doc'
  })

  countries: Country[];
  sponsor: Sponsor = new Sponsor();
  edit: boolean = false;
  fileAdded: boolean = false;
  apiStaticUrl = `${environment.apiUrl}/`;
  uploadImageSource = environment.uploadImageSource
  userData: any;

  constructor(private sponsorService: SponsorService,
              private activatedRoute: ActivatedRoute, 
              private countryService: CountryService, 
              private loadingSpinner: Ng4LoadingSpinnerService,
              private notifier: NotifierService,
              private router: Router, 
              private auth: UserService) { }

  ngOnInit() {

    this.loadingSpinner.show();

    let user = this.auth.getLoggedInUserData(); 
    if (!user){
      this.loadingSpinner.hide(); 
      this.router.navigateByUrl('/');
    }

    let userObs = this.auth.getUserData(user.id);
    let countryObs = this.countryService.getCountries(); 
    forkJoin([userObs, countryObs]).subscribe(data => {
      this.userData = data[0];
      console.log(this.userData)
      switch(user.userTypeID) {
        case UserTypeEnum.Administrator: 
        case UserTypeEnum.ExecutiveBoard: 
          this.countries = data[1];
          break;
        case UserTypeEnum.RegionalDirector: 
          this.countries = data[1].filter(c => c.regionID == this.userData.regionID);
          break;
        case UserTypeEnum.NationalDirector: 
        case UserTypeEnum.ExchangeCoordinator: 
          this.countries = data[1].filter(c => c.id == this.userData.countryID);
          break;
        default: 
          this.router.navigateByUrl('/');
          break;
      }
    })

    this.activatedRoute.params.subscribe(params => {
      if (params['id']){
        this.edit = true;
        this.sponsorService.getSponsorByID(params['id']).subscribe(data => {
          this.sponsor = data;
          this.loadingSpinner.hide();
        })
      }
      else {
        this.loadingSpinner.hide();
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
        this.sponsor.imagePath = response.filename;
        this.notifier.notify('success', 'Image uploaded!');
        // this.addEditSponsor();
        // window.location.reload();
      }
    }


  }

  addEditSponsor(){
    this.loadingSpinner.show();

    if (this.edit) {
      this.sponsorService.updateSponsor(this.sponsor).subscribe(data => {
        this.loadingSpinner.hide();
        if (data.status == 0) {
          this.notifier.notify("success", "Sponsor updated!");
          this.router.navigateByUrl('/administration/sponsors');
        }
        else {
          this.notifier.notify("error", "Error while inserting sponsor");
        }
      })
    }
    else {
      if (this.userData.userTypeID != 3 && this.userData.userTypeID != 4) 
        this.sponsor.isShown = 0;

      this.sponsorService.insertSponsor(this.sponsor).subscribe(data => {
        this.loadingSpinner.hide();
        if (data.status == 0) {
          this.notifier.notify("success", "Sponsor inserted!");
          this.router.navigateByUrl('/administration/sponsors');
        }
        else {
          this.notifier.notify("success", "Error while inserting sponsor!");
        }
      })
    }
  }

  validateInput(){
    if (!this.sponsor.name ||
        !this.sponsor.countryID || 
        !this.sponsor.description) {
          this.notifier.notify("error", "Please insert all sponsor data!");
          return;
        }

    if (!this.sponsor.imagePath) {
      this.notifier.notify("error", "Please attach logo file!");
      return;
    }

    if (this.fileAdded) {
      this.uploader.uploadAll();
    }
    else {
      this.addEditSponsor();
    }
  }
}
