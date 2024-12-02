import { Component, OnInit } from '@angular/core';
import { CountryService } from 'src/app/services/country.service';
import { Country } from 'src/app/models/Country';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { Internship } from 'src/app/models/Internship';
import { InternshipService } from 'src/app/services/internship.service';
import { OPTaker } from 'src/app/models/OPTaker';
import { OpTakerService } from 'src/app/services/op-taker.service';
import { BackgroundField } from 'src/app/models/BackgroundField';
import { BackgroundFieldService } from 'src/app/services/background-field.service';
import { Language } from 'src/app/models/Language';
import { LanguageService } from 'src/app/services/language.service';
import { NotifierService } from 'angular-notifier';
import { UserService } from 'src/app/services/user.service';
import { forkJoin } from 'rxjs';
import { UserTypeEnum } from 'src/app/enums/UserTypeEnum';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { InternshipImage } from 'src/app/models/InternshipImage';

@Component({
  selector: 'app-admin-addeditinternship',
  templateUrl: './admin-addeditinternship.component.html',
  styleUrls: ['./admin-addeditinternship.component.scss']
})
export class AdminAddeditinternshipComponent implements OnInit {
  
  public daterange: any = {};

  uploadImageSource = environment.uploadImageSource
 
  // see original project for full list of options
  // can also be setup using the config service to apply to multiple pickers
  public options: any = {
    locale: { format: 'MM/DD' },
    alwaysShowCalendars: false,
  };

  countries: Country[] = [];
  opTakers: OPTaker[] = [];
  internship: Internship = new Internship();
  backgroundFields: BackgroundField[] = [];
  backgroundFieldList: number[] = [];
  languages: Language[] = [];
  userData: any;
  edit: boolean = false;
  apiUrl = environment.apiUrl;

  uploader: FileUploader = new FileUploader({
    url: `${environment.apiUrl}/upload`,
    itemAlias: 'doc'
  })



  constructor(private countriesService: CountryService,
              private spinner: Ng4LoadingSpinnerService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private internshipService: InternshipService,
              private opTakerService: OpTakerService,
              private backgroundFieldService: BackgroundFieldService,
              private languagesService: LanguageService,
              private notifier: NotifierService,
              private auth: UserService) { }

  ngOnInit(): void {
    this.spinner.show();

    let user = this.auth.getLoggedInUserData(); 
    if (!user) {
      this.spinner.hide(); 
      this.router.navigateByUrl('/');
    }

    let userObs = this.auth.getUserData(user.id);
    let countryObs = this.countriesService.getCountries();
    let opTakerObs = this.opTakerService.getOPTakers(); 
    let languagesObs = this.languagesService.getLanguages(); 
    let backgroundFieldObs = this.backgroundFieldService.getBackgroundFields(); 
    
    forkJoin([userObs, countryObs, opTakerObs, languagesObs, backgroundFieldObs]).subscribe(data => {
      this.userData = data[0];
      this.countries = data[1];
      this.opTakers = data[2].filter(op => op.user.isActive);
      this.languages = data[3];
      // this.backgroundFields = data[4];

      this.activatedRoute.params.subscribe(data => {
      if (data['id']) {
        this.internshipService.getInternshipByID(data['id']).subscribe(data => {
          
          this.internship = data;
          if (this.internship.backgrounds) {
            let backgroundFieldsHelper = this.internship.backgrounds.split(',');
            let stupidHelper2 = [];
            for (let i = 0; i < backgroundFieldsHelper.length; i++) {
              let backgroundField = new BackgroundField(); 
              backgroundField.name = backgroundFieldsHelper[i];
              
              stupidHelper2.push(backgroundField);
            }
            
            this.backgroundFields = stupidHelper2;
            setTimeout(() => {
              this.internship.backgroundFieldsArr = backgroundFieldsHelper;
            }, 10)
          }
          else {
            this.internship.backgroundFieldsArr = [];
          }

          // debugger;
          if (this.internship.languages){
            let langHelper: any[] = this.internship.languages.split(',');
            for (let i = 0; i < langHelper.length; i++)
              langHelper[i] = +langHelper[i];
            setTimeout(() => {
              this.internship.languagesArr = langHelper;
            }, 10)
            
            console.log(this.internship.languagesArr);
          } 
          else {
            this.internship.languagesArr = [];
          }
          
          this.edit = true;
          this.spinner.hide();
        })
      }
      else {
        this.spinner.hide();
      }
    })

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

      this.activatedRoute.params.subscribe(data => {
        if (data['id']) {
          this.internshipService.getInternshipByID(data['id']).subscribe(internshipData => {
          
            setTimeout(() => {
              this.internship = internshipData;
              // debugger;
            if (this.internship.backgrounds) {
              let backgroundFieldsHelper = this.internship.backgrounds.split(',');
              let stupidHelper2 = [];
              for (let i = 0; i < backgroundFieldsHelper.length; i++) {
                let backgroundField = new BackgroundField(); 
                backgroundField.name = backgroundFieldsHelper[i];
                
                stupidHelper2.push(backgroundField);
              }
              
              this.backgroundFields = stupidHelper2;
              setTimeout(() => {
                this.internship.backgroundFieldsArr = backgroundFieldsHelper;
              }, 10)
            }
            else {
              this.internship.backgroundFieldsArr = [];
            }
  
            // debugger;
            if (this.internship.languages){
              let langHelper: any[] = this.internship.languages.split(',');
              for (let i = 0; i < langHelper.length; i++)
                langHelper[i] = +langHelper[i];
              setTimeout(() => {
                this.internship.languagesArr = langHelper;
              }, 10)
              
              console.log(this.internship.languagesArr);
            } 
            else {
              this.internship.languagesArr = [];
            }
            }, 10);

            
            
            this.edit = true;
            this.spinner.hide();
          })
        }
        else {
          this.spinner.hide();
        }
      })
    })

   

    this.uploader.onAfterAddingFile = (file) => {
      this.spinner.show();
      file.withCredentials = false; 
      this.uploader.uploadAll();
    }

    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      this.spinner.hide();
      response = JSON.parse(response);
      if (response.status == 0) {
        
        let img = new InternshipImage();
        img.internshipID = this.internship.id;
        img.imagePath = response.filename;
        this.internshipService.insertInternshipImage(img).subscribe(data => {
          if (data.status == 0) {
            this.notifier.notify('success', 'Image uploaded!');
            window.location.reload();
          }
          else {
            this.notifier.notify('error', 'Error while uploading image');
          }
        })
        // this.addEditSponsor();
      }
    }
  }

  saveInternship(){
    
    this.internship.languages = this.internship.languagesArr.toString();

    if (confirm("Are you sure?")){
      this.spinner.show();
      if (this.edit) {
        this.internshipService.updateInternship(this.internship).subscribe(data => {
          this.spinner.hide();
          if (data.status == 0){
            this.notifier.notify('success', 'Internship updated!');
            this.router.navigateByUrl('/administration/internships');
          }
          else {
            this.notifier.notify('error', 'Error while creating internship');
          }
        })
      }
      else {
        this.internshipService.insertInternship(this.internship).subscribe(data => {
          this.spinner.hide();
          if (data.status == 0){
            this.notifier.notify('success', 'Internship created!');
            this.router.navigateByUrl(`/administration/addeditinternship/${data.data.id}`);
          }
          else {
            console.log(data);
            this.notifier.notify('error', 'Error while creating internship');
          }
        })
      }
    }
  }

  removeImage(id){
    this.spinner.show(); 
    this.internshipService.deleteInternshipImage(id).subscribe(data => {
      if (data.status == 0){
        this.spinner.hide(); 
        this.notifier.notify('success', 'Image removed!');
        this.ngOnInit();
      }
      else {
        this.spinner.hide(); 
        this.notifier.notify('error', 'Error while deleting image!');
      }
    })
  }

}
