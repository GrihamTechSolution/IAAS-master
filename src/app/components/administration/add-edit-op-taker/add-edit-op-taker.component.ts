import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NotifierService } from 'angular-notifier';
import { UserService } from 'src/app/services/user.service';
import { OpTakerService } from 'src/app/services/op-taker.service';
import { CountryService } from 'src/app/services/country.service';
import { Country } from 'src/app/models/Country';
import { User } from 'src/app/models/User';
import { OPTaker } from 'src/app/models/OPTaker';
import { ActivatedRoute, Router } from '@angular/router';
import { OPTakerContact } from 'src/app/models/OPTakerContact';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { forkJoin } from 'rxjs';
import { UserTypeEnum } from 'src/app/enums/UserTypeEnum';

@Component({
  selector: 'app-add-edit-op-taker',
  templateUrl: './add-edit-op-taker.component.html',
  styleUrls: ['./add-edit-op-taker.component.scss']
})
export class AddEditOpTakerComponent implements OnInit {

  opTakerTypes = ['NGO', 'Farm', 'University', 'Other'];
  countries: Country[] = [];
  user: User = new User();
  contacts: OPTakerContact[] = [];
  opTaker: OPTaker = new OPTaker();
  edit: boolean = false;
  fileAdded: boolean = false;
  apiUrl = environment.apiUrl;
  userData: any;

  uploadImageSource = environment.uploadImageSource

  uploader: FileUploader = new FileUploader({
    url: `${environment.apiUrl}/upload`,
    itemAlias: 'doc'
  })

  constructor(private spinner: Ng4LoadingSpinnerService, 
              private notifier: NotifierService, 
              private auth: UserService,
              private opTakerService: OpTakerService,
              private countryService: CountryService,
              private activatedRoute: ActivatedRoute,
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

    forkJoin([userObs, countryObs]).subscribe(data => {
      this.userData = data[0];
      switch(user.userTypeID) {
        case UserTypeEnum.Administrator: 
        case UserTypeEnum.ExecutiveBoard: 
          this.countries = data[1];
          this.spinner.hide();
          break;
        case UserTypeEnum.RegionalDirector: 
          this.countries = data[1].filter(c => c.regionID == this.userData.regionID);
          this.spinner.hide();
          break;
        case UserTypeEnum.NationalDirector:
        case UserTypeEnum.ExchangeCoordinator:
          this.countries = data[1].filter(c => c.id == this.userData.countryID); 
          this.spinner.hide();
          break;
        default: 
          this.spinner.hide();
          this.router.navigateByUrl('/');
          break;
      }
    })

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false; 
      this.fileAdded = true;
    }

    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      response = JSON.parse(response);
      if (response.status == 0) {
        this.opTaker.logo = response.filename;
        this.saveOPTakerInfo();
      }
    }

    this.activatedRoute.params.subscribe(data => {
      if (data['id']) {
        this.edit = true;
        this.opTakerService.getOPTakerByID(data['id']).subscribe(opTakerData => {
          this.opTaker = opTakerData;
          this.user = this.opTaker.user;
          this.contacts = this.opTaker.contacts;
          this.spinner.hide();
        })
      }
      else {
        this.spinner.hide();
      }
    })
  }

  saveAccount(){
    this.spinner.show();
    if (this.edit){

    }
    else {
      if (!this.user.newPassword || 
          !this.user.email || 
          !this.user.firstName) {
            this.notifier.notify('error', 'Please insert all data!');
            this.spinner.hide();
            return;
          }

      if (this.user.newPassword != this.user.confirmPassword) {
        this.notifier.notify('error', 'Passwords do not match!');
        this.spinner.hide();
        return;
      }

      if (confirm("Are you sure?")) {
        this.user.userTypeID = 2;
        this.user.password = this.user.newPassword;
        this.auth.register(this.user).subscribe(data => {
          if (data.status == 0) {
            this.opTaker.user = this.user;
            this.opTaker.userID = data.id;
            this.user.id = data.id;
            this.notifier.notify('success', 'OP Taker account created! Fill the rest of data');

            this.opTakerService.insertOPTaker(this.opTaker).subscribe(opTakerData => {
              this.opTaker.id = opTakerData.data.id;
              this.spinner.hide();
              this.router.navigateByUrl(`/administration/addeditoptaker/${this.opTaker.id}`);
            })
          }
          else {
            this.notifier.notify('error', 'Error while creating OP Taker account!');
            this.spinner.hide();
          }
        })
      }
      else {
        this.spinner.hide();
      }
    }
  }

  initSaveOPTakerInfo() {
    if (confirm("Are you sure? ")) {
      this.spinner.show();
      if (this.fileAdded) {
        this.uploader.uploadAll();
      }
      else {
        this.saveOPTakerInfo();
      }
    }
  }

  saveOPTakerInfo(){
    this.opTakerService.updateOPTaker(this.opTaker).subscribe(data => {
      this.notifier.notify('success', 'OP Taker data changed!');
      this.spinner.hide();
    })
    
  }

  addContact(){
    let contact = new OPTakerContact();
    contact.opTakerID = this.opTaker.id;
    contact.status = 1;
    contact.id = Math.floor(1000 * Math.random());
    this.contacts.push(contact);
  }

  removeContact(id:number){
    for(let i = 0; i < this.contacts.length; i++) {
      if (this.contacts[i].id == id) {
        this.contacts[i].status = 3;
        break;
      }
    }
  }

  saveContacts() {
    this.spinner.show();
    this.opTakerService.saveContacts(this.contacts).subscribe(data => {
      if (data.status == 0) {
        this.notifier.notify('success', 'Contacts updated!');
        this.spinner.hide();
      }
    })
  }

}
