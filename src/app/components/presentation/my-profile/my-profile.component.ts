import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { OpTakerService } from 'src/app/services/op-taker.service';
import { NotifierService } from 'angular-notifier';
import { environment } from 'src/environments/environment';
import { FileUploader } from 'ng2-file-upload';
import { OPTaker } from 'src/app/models/OPTaker';
import { OPTakerContact } from 'src/app/models/OPTakerContact';
import { CountryService } from 'src/app/services/country.service';
import { Country } from 'src/app/models/Country';
import { Student } from 'src/app/models/Student';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { StudentsService } from 'src/app/services/students.service';
import { Application } from 'src/app/models/Application';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  
  imageSource = environment.imageSource
  uploadImageSource = environment.uploadImageSource
  opTakerTypes = ['NGO', 'Farm', 'University', 'Other'];
  user: User = new User();
  opTaker: OPTaker = new OPTaker();
  contacts: OPTakerContact[] = [];
  edit: boolean = false;
  apiUrl: string = environment.apiUrl;
  fileAdded: boolean = false;
  countries: Country[] = [];
  userData: any;
  student: Student = new Student();
  confirmDelete: boolean = false;

  uploader: FileUploader = new FileUploader({
    url: `${environment.apiUrl}/upload`,
    itemAlias: 'doc'
  })

  studentImgUploader: FileUploader = new FileUploader({
    url: `${environment.apiUrl}/upload`,
    itemAlias: 'doc'
  })

  studentBioUploader: FileUploader = new FileUploader({
    url: `${environment.apiUrl}/upload`,
    itemAlias: 'doc'
  })

  studentProofUploader: FileUploader = new FileUploader({
    url: `${environment.apiUrl}/upload`,
    itemAlias: 'doc'
  })

  studentApplications: Application[] = [];

  constructor(private spinner: Ng4LoadingSpinnerService,
              private userService: UserService, 
              private opTakerService: OpTakerService,
              private notifier: NotifierService,
              private countryService: CountryService,
              private router: Router,
              private studentService: StudentsService,
              private applicationService: ApplicationService) { }

  ngOnInit(): void {

    if(!this.userService.isLoggedIn()){
      this.router.navigateByUrl('/login');
    }
    
    this.spinner.show();


    if (window.location.href.indexOf('myInternships') != -1) {
      setTimeout(() => {
        document.getElementById('accountInfoLi').classList.remove('active');
        document.getElementById('internshipInfoLi').classList.add('active');
        document.getElementById('account').classList.remove('active');
        document.getElementById('internships').classList.add('active');
      }, 50);
    }

    this.userData = this.userService.getLoggedInUserData();

    this.countryService.getCountries().subscribe(data => {
      this.countries = data;
    })

    this.studentImgUploader.onAfterAddingFile = (file) => {
      file.withCredentials = false; 
      this.fileAdded = true;
      this.spinner.show();
      this.studentImgUploader.uploadAll();
    }

    this.studentImgUploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      response = JSON.parse(response);
      if (response.status == 0) {
        this.student.imagePath = response.filename;
        this.updateStudent();
      }
    }

    this.studentBioUploader.onAfterAddingFile = (file) => {
      file.withCredentials = false; 
      this.fileAdded = true;
      this.spinner.show();
      this.studentBioUploader.uploadAll();
    }

    this.studentBioUploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      response = JSON.parse(response);
      if (response.status == 0) {
        this.student.bioPath = response.filename;
        this.updateStudent();
      }
      else {
        this.notifier.notify('error', 'Error while uploading file!');
      }
    }

    this.studentProofUploader.onAfterAddingFile = (file) => {
      file.withCredentials = false; 
      this.fileAdded = true;
      this.spinner.show();
      this.studentProofUploader.uploadAll();
    }

    this.studentProofUploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      response = JSON.parse(response);
      if (response.status == 0) {
        this.student.proofPath = response.filename;
        this.updateStudent();
      }
      else {
        this.notifier.notify('error', 'Error while uploading file!');
      }
    }

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false; 
      this.fileAdded = true;
      this.spinner.show();
      this.uploader.uploadAll();
    }

    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      response = JSON.parse(response);
      if (response.status == 0) {
        this.opTaker.logo = response.filename;
        this.saveOPTakerData();
      }
    }

    switch(this.userData.userTypeID) {
      case 1: 
      this.studentService.getStudentByUserID(this.userData.id).subscribe(data => {
        if (data) {
          this.student = data;
          this.user = this.student.user;
  
          this.applicationService.getApplicationsByStudent(this.userData.id).subscribe(data => {
            this.studentApplications = data;
          })
        }
        
        this.spinner.hide();
      })
      break;
      case 2: 
      this.opTakerService.getOPTakerByUserID(this.userData.id).subscribe(data => {
        this.opTaker = data;
        this.user = this.opTaker.user;
        this.contacts = this.opTaker.contacts;
        this.contacts.forEach(c => {
          c.status = 2;
        })
        this.spinner.hide();
      })
      break; 
      default: 
        this.userService.getUserData(this.userData.id).subscribe(user => {
          this.user = user;
          this.spinner.hide();
        })
      break;
    }
  }

  updateUser(){
    if (this.user.newPassword != this.user.confirmPassword) {
      this.notifier.notify('error', 'Passwords do not match!');
      return;
    }

    this.userService.updateUser(this.user).subscribe(data => {
      if (data.status == 0) {
        this.notifier.notify('info', 'User info updated!');
      }
      else {
        this.notifier.notify('error', 'Error while updating user info!');
      }
    })
  }

  saveOPTakerData(){
    this.spinner.show();
    this.opTakerService.updateOPTaker(this.opTaker).subscribe(data => {
      if (data.status == 0) {
        this.notifier.notify('info', 'OPTaker data updated!');
        this.spinner.hide();
      }
      else {
        this.notifier.notify('error', 'Error while updating OPTaker data!');
        this.spinner.hide();
      }
    })
    
  }

  initSaveOPTaker(){
    this.saveOPTakerData();
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
    this.opTakerService.saveContacts(this.contacts).subscribe(data => {
      if (data.status == 0) {
        this.notifier.notify('info', 'Contacts updated!');
      }
    })
  }

  saveStudent(){
    this.updateStudent();
  }

  updateStudent(){
    this.spinner.show();
    this.studentService.updateStudent(this.student).subscribe(data => {
      this.notifier.notify('success', 'Data updated!');
      this.spinner.hide();
    })
  }

  deleteUser(){
    if (confirm("Are you sure?")) {
      this.spinner.show();
      this.userService.deleteUser(this.user.id).subscribe(data => {
        if (data.status == 0) {
          this.notifier.notify('success', 'User account deleted!');
          window.localStorage.removeItem('iaas-user');
          this.spinner.hide();
          window.location.href = '/';
        }
        else {
          this.notifier.notify('error', 'Error while deleting the user!');
          this.spinner.hide();
        }
      })
    }
  }

}
