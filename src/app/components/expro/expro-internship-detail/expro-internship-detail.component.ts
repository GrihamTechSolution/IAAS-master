import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Internship } from 'src/app/models/Internship';
import { InternshipService } from 'src/app/services/internship.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Country } from 'src/app/models/Country';
import { CountryService } from 'src/app/services/country.service';
import { OPTaker } from 'src/app/models/OPTaker';
import { OpTakerService } from 'src/app/services/op-taker.service';
import { environment } from 'src/environments/environment';
import { Language } from 'src/app/models/Language';
import { LanguageService } from 'src/app/services/language.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ApplicationService } from 'src/app/services/application.service';
import { Application } from 'src/app/models/Application';
import { UserService } from 'src/app/services/user.service';
import { FileUploader } from 'ng2-file-upload';
import { NotifierService } from 'angular-notifier';
import { FavouriteInternshipService } from 'src/app/services/favourite-internship.service';
import { FavouriteInternship } from 'src/app/models/FavouriteInternship';
import { data } from 'jquery';
import { BackgroundField } from 'src/app/models/BackgroundField';
import { MailService } from 'src/app/services/mail.service';
import { ExproMail } from 'src/app/models/ExproMail';
import { User } from 'src/app/models/User';
import { StudentsService } from 'src/app/services/students.service';
import { Student } from 'src/app/models/Student';

declare var $: any;

@Component({
  selector: 'app-expro-internship-detail',
  templateUrl: './expro-internship-detail.component.html',
  styleUrls: ['./expro-internship-detail.component.scss']
})
export class ExproInternshipDetailComponent implements OnInit {

  @ViewChild('applyModal')
  applyModal: TemplateRef<any>;

  uploader: FileUploader = new FileUploader({
    url: `${environment.apiUrl}/upload`,
    itemAlias: 'doc'
  })

  imageSource = environment.imageSource
  uploadImageSource = environment.uploadImageSource
  internship: Internship = new Internship();
  countries: Country[] = [];
  opTakers: OPTaker[] = [];
  languages: Language[] = [];
  backgroundFields: BackgroundField[] = [];
  apiUrl = environment.apiUrl;
  modalRef: BsModalRef;
  canApply: boolean = false;

  application = new Application();
  studentApplications: Application[] = [];
  remainingApplications: number = 0;
  hasItInFavourite: boolean = false;
  userData: any = {};
  isLoggedIn: boolean = false;
  favouriteInternships: FavouriteInternship[] = [];
  user: User = new User();
  student: Student = new Student();

  constructor(private countryService: CountryService,
              private internshipService: InternshipService,
              private opTakerService: OpTakerService,
              private activatedRoute: ActivatedRoute,
              private languageService: LanguageService,
              private router: Router,
              private spinner: Ng4LoadingSpinnerService,
              private modalService: BsModalService,
              private applicationService: ApplicationService,
              private loadingSpinner: Ng4LoadingSpinnerService,
              private auth: UserService,
              private notifier: NotifierService, 
              private favouriteInternshipService: FavouriteInternshipService, 
              private mailService: MailService,
              private userService: UserService, 
              private studentService: StudentsService) { }

  ngOnInit(): void {
    this.spinner.show();

    this.userData = this.auth.getLoggedInUserData();
    console.log(this.userData);

    if (this.userData) {
      this.applicationService.getApplicationsByStudent(this.auth.getLoggedInUserData().id).subscribe(data => {
        this.studentApplications = data;
        this.remainingApplications = 3 - this.studentApplications.filter(sapp => !sapp.status || (sapp.status && (sapp.status != 1))).length;
      })
    
      this.auth.getUserByID(this.userData.id).subscribe(data => {
        this.user = data;
      })

      this.studentService.getStudentByUserID(this.userData.id).subscribe(s => {
        this.student = s; 
        this.canApply = !(!s.ecAddress || !s.ecEmail || !s.ecName || !s.ecPhone || !s.ecRelation || !s.ecSurname 
                        || !s.phoneNumber || !s.infoAboutExpro || !s.university || !s.linkedIn || !s.biography || !s.bioPath || !s.proofPath || !s.imagePath
                        || !s.user.firstName || !s.user.lastName);
      })
    }

    

    this.uploader.onAfterAddingFile = (file) => {
      this.spinner.show();
      file.withCredentials = false; 
      this.uploader.uploadAll();
    }

    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      this.spinner.hide();
      response = JSON.parse(response);
      if (response.status == 0) {
        this.application.motivationalLetter = response.filename;
        this.notifier.notify('success', 'Motivational letter uploaded!');
        // this.addEditDownload();
      }
    }

    this.countryService.getCountries().subscribe(data => {
      this.countries = data;
    })

    this.opTakerService.getOPTakers().subscribe(data => {
      this.opTakers = data;
    })

    this.languageService.getLanguages().subscribe(data => {
      this.languages = data;
      console.log(this.languages)
    })

    this.activatedRoute.params.subscribe(data => {
      if (data['id']) {
        this.internshipService.getInternshipByID(data['id']).subscribe(data => {
          this.internship = data;
          if (this.userData) {
            this.favouriteInternshipService.getFavouriteInternshipsForUser(this.userData.id).subscribe(data => {
              for (let i = 0; i < data.length; i++) {
                if (data[i].internshipID == this.internship.id) {
                  
                  this.hasItInFavourite = true;
                }
              }
              this.favouriteInternships = data;
            })
          }

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

          this.spinner.hide();
        })
      }
    })
  }

  showApplyModal(){
    this.modalRef = this.modalService.show(this.applyModal);
    $('.modal-dialog').css({width: '50%'})
  }

  mapIdToLanguages(languages){
    return this.languages.filter(obj => languages.includes(obj.id.toString()))
            .map(obj => obj.name);
  }

  mapIdToBackgroundFields(bgFields){
    return this.backgroundFields.filter(obj => bgFields.includes(obj.id.toString()))
            .map(obj => obj.name);
  }

  apply(){

    if (this.remainingApplications == 0) {
      this.notifier.notify('danger', `You cannot apply! You have ${this.remainingApplications} applications left`);
      return;
    }

    if (!this.application.motivationalLetter) {
      this.notifier.notify('error', 'Please attach motivational letter!');
    }

    let applicationCheckArray = this.studentApplications.filter(app => app.internshipID == this.internship.id); 
    let confirmText = "Are you sure?";
    if (applicationCheckArray.length > 0) {
      confirmText = "You already have an application for this internship. If you proceed, you will erase the previous one. Are you sure?"
    }

    if (confirm(confirmText)){
      this.spinner.show();
      this.application.internshipID = this.internship.id;
      this.application.userID = this.auth.getLoggedInUserData().id;
      this.application.step = 1;

      if (applicationCheckArray.length > 0) {
        this.applicationService.deleteApplication(applicationCheckArray[0].id).subscribe(deleteData => { });
      }
      
      this.applicationService.insertApplication(this.application).subscribe(data => {
        if (data.status == 0) {
          if (applicationCheckArray.length == 0)
            this.remainingApplications = this.remainingApplications - 1;
          this.notifier.notify('success', `Application successful! You have ${this.remainingApplications} applications left`);

          let applicationMail = new ExproMail();
          applicationMail.toEmail = 'interns@iaasworld.org';
          //applicationMail.toEmail = 'milena.plamenac@firenet.me';
          applicationMail.studentName = this.user.firstName + ' ' + this.user.lastName;
          applicationMail.internshipName = this.internship.name;
          this.mailService.sendApplicationMail(applicationMail).subscribe(mailData => { });

          this.auth.checkIfRDExists(this.internship.country.regionID).subscribe(data => {
            
            if (data.status == 0) {
              let applicationMail = new ExproMail();
              applicationMail.toEmail = data.data.email;
              applicationMail.studentName = this.user.firstName + ' ' + this.user.lastName;
              applicationMail.internshipName = this.internship.name;
              this.mailService.sendApplicationMail(applicationMail).subscribe(mailData => { });
            }
          })

          this.auth.checkIfRDExists(this.user.country.regionID).subscribe(data => {
            
            if (data.status == 0) {
              let applicationMail = new ExproMail();
              applicationMail.toEmail = data.data.email;
              applicationMail.studentName = this.user.firstName + ' ' + this.user.lastName;
              applicationMail.internshipName = this.internship.name;
              this.mailService.sendApplicationMail(applicationMail).subscribe(mailData => { });
            }
          })

          this.auth.checkIfExCoExists(this.internship.countryID).subscribe(data => {
            
            if (data.status == 0) {
              let applicationMail = new ExproMail();
              applicationMail.toEmail = data.data.email;
              applicationMail.studentName = this.user.firstName + ' ' + this.user.lastName;
              applicationMail.internshipName = this.internship.name;
              this.mailService.sendApplicationMail(applicationMail).subscribe(mailData => { });
            }
          })

          this.auth.checkIfExCoExists(this.user.countryID).subscribe(data => {
            
            if (data.status == 0) {
              let applicationMail = new ExproMail();
              applicationMail.toEmail = data.data.email;
              applicationMail.studentName = this.user.firstName + ' ' + this.user.lastName;
              applicationMail.internshipName = this.internship.name;
              this.mailService.sendApplicationMail(applicationMail).subscribe(mailData => { });
            }
          })

          this.auth.checkIfNDExists(this.internship.countryID).subscribe(data => {
            
            if (data.status == 0) {
              let applicationMail = new ExproMail();
              applicationMail.toEmail = data.data.email;
              applicationMail.studentName = this.user.firstName + ' ' + this.user.lastName;
              applicationMail.internshipName = this.internship.name;
              this.mailService.sendApplicationMail(applicationMail).subscribe(mailData => { });
            }
          })

          this.auth.checkIfNDExists(this.user.countryID).subscribe(data => {
            
            if (data.status == 0) {
              let applicationMail = new ExproMail();
              applicationMail.toEmail = data.data.email;
              applicationMail.studentName = this.user.firstName + ' ' + this.user.lastName;
              applicationMail.internshipName = this.internship.name;
              this.mailService.sendApplicationMail(applicationMail).subscribe(mailData => { });
            }
          })

          this.modalRef.hide();
        }
        else {
          this.notifier.notify('error', 'Please check your application once again');
        }

        this.spinner.hide();
      })
    }
  }

  saveInternshipToFavourites(){
    this.spinner.show();

    let favouriteInternship = new FavouriteInternship();
    favouriteInternship.internshipID = this.internship.id;
    favouriteInternship.userID = this.userData.id;

    this.favouriteInternshipService.insertFavouriteInternship(favouriteInternship).subscribe(data => {
      if (data.status == 0) {
        this.notifier.notify('success', 'Inserted into favourites!');
        this.spinner.hide();
        this.favouriteInternshipService.getFavouriteInternshipsForUser(this.userData.id).subscribe(data => {
          this.favouriteInternships = data;
        })
        this.hasItInFavourite = true;
      }
      else {
        this.notifier.notify('error', 'Error while adding internship into favourites!');
        this.spinner.hide();
      }
    })
  }

  removeInternshipFromFavourites(){
    this.spinner.show(); 

    let id = this.favouriteInternships.filter(fi => fi.internshipID == this.internship.id)[0].id;
    this.favouriteInternshipService.deleteFavouriteInternship(id).subscribe(data => {
      if (data.status == 0) {
        this.notifier.notify('success', 'Deleted from favourites');
        this.spinner.hide();
        this.hasItInFavourite = false;
      }
      else {
        this.notifier.notify('error', 'Error while removing internship from favourites!');
        this.spinner.hide();
      }
    })
  }

}
