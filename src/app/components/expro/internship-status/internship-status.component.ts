import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ApplicationService } from 'src/app/services/application.service';
import { Application } from 'src/app/models/Application';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ActivatedRoute } from '@angular/router';
import { ApplicationStep } from 'src/app/models/ApplicationStep';
import { NotifierService } from 'angular-notifier';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import {
  ADMIN_EXCO,
  ADMIN_OP_TAKERS,
  ADMIN_STUDENT,
} from 'src/app/constants/adminUserTypes';
import { TestimonialService } from 'src/app/services/testimonials.service';

// const steps = [
//   {

//   }
// ]

@Component({
  selector: 'app-internship-status',
  templateUrl: './internship-status.component.html',
  styleUrls: ['./internship-status.component.scss'],
})
export class InternshipStatusComponent implements OnInit {
  userData: any;
  application: Application = new Application();
  secondStep: ApplicationStep = new ApplicationStep();
  thirdStep: ApplicationStep = new ApplicationStep();
  fourthStep: ApplicationStep = new ApplicationStep();
  currentStep: ApplicationStep = new ApplicationStep();
  fifthStep: ApplicationStep = new ApplicationStep();
  seventhStep: ApplicationStep = new ApplicationStep();
  sixthStep: ApplicationStep = new ApplicationStep();
  eightStep: ApplicationStep = new ApplicationStep();
  ninthStep: ApplicationStep = new ApplicationStep();
  tenthStep: ApplicationStep = new ApplicationStep();
  apiUrl = environment.apiUrl;
  uploadImageSource = environment.uploadImageSource;
  isAdminLink: boolean = false;
  excoUserIds = ADMIN_EXCO;
  studentUserIds = ADMIN_STUDENT;
  opTakerUserIds = ADMIN_OP_TAKERS;
  // steps = steps

  invoiceUploader: FileUploader = new FileUploader({
    url: `${environment.apiUrl}/upload`,
    itemAlias: 'doc',
  });

  contractUploader: FileUploader = new FileUploader({
    url: `${environment.apiUrl}/upload`,
    itemAlias: 'doc',
  });

  constructor(
    private userService: UserService,
    private applicationService: ApplicationService,
    private testimonialService: TestimonialService,
    private loadingSpinner: Ng4LoadingSpinnerService,
    private activatedRoute: ActivatedRoute,
    private notifier: NotifierService
  ) {}

  ngOnInit(): void {
    this.loadingSpinner.show();

    // debugger;
    if (window.location.href.indexOf('administration') != -1) {
      this.isAdminLink = true;
    }

    this.invoiceUploader.onAfterAddingFile = file => {
      this.loadingSpinner.show();
      file.withCredentials = false;
      //this.fileAdded = true;
      this.invoiceUploader.uploadAll();
    };

    this.invoiceUploader.onCompleteItem = (
      item: any,
      response: any,
      status: any,
      headers: any
    ) => {
      response = JSON.parse(response);
      if (response.status == 0) {
        // debugger;
        this.currentStep.firstFilePath = response.filename;
        this.notifier.notify('success', 'Invoice file uploaded!');
        // this.addEditDownload();
      }
      this.loadingSpinner.hide();
    };

    this.contractUploader.onAfterAddingFile = file => {
      this.loadingSpinner.show();
      file.withCredentials = false;
      //this.fileAdded = true;
      this.contractUploader.uploadAll();
    };

    this.contractUploader.onCompleteItem = (
      item: any,
      response: any,
      status: any,
      headers: any
    ) => {
      response = JSON.parse(response);
      if (response.status == 0) {
        // debugger;
        this.currentStep.secondFilePath = response.filename;

        // if (this.application.step == 7) {
        //   this.seventhStep.secondFilePath = response.filename;
        //   let applicationStep = new ApplicationStep();
        //   applicationStep.applicationID = this.application.id;
        //   applicationStep.secondFilePath = response.filename;
        //   this.applicationService.createStep(applicationStep).subscribe(data => {});
        // }

        this.notifier.notify('success', 'Contract file uploaded!');
        // this.addEditDownload();
      }
      this.loadingSpinner.hide();
    };

    this.userData = this.userService.getLoggedInUserData();

    this.userService.getUserData(this.userData.id).subscribe(data => {
      this.userData.countryID = data.countryID;
    });

    console.log(this.userData);
    this.activatedRoutes();
  }

  activatedRoutes() {
    this.activatedRoute.params.subscribe(data => {
      if (data['id']) {
        this.applicationService
          .getApplicationByID(data['id'])
          .subscribe(app => {
            this.application = app;
            console.log(this.application);
            this.secondStep =
              this.application.steps.length >= 1
                ? this.application.steps[0]
                : undefined;
            this.thirdStep =
              this.application.steps.length >= 2
                ? this.application.steps[1]
                : undefined;
            this.fourthStep =
              this.application.steps.length >= 3
                ? this.application.steps[2]
                : undefined;
            this.fifthStep =
              this.application.steps.length >= 4
                ? this.application.steps[3]
                : undefined;
            this.sixthStep =
              this.application.steps.length >= 5
                ? this.application.steps[4]
                : undefined;
            this.seventhStep =
              this.application.steps.length >= 6
                ? this.application.steps[5]
                : undefined;
            this.eightStep =
              this.application.steps.length >= 7
                ? this.application.steps[6]
                : undefined;
            this.ninthStep =
              this.application.steps.length >= 8
                ? this.application.steps[7]
                : undefined;
            this.tenthStep =
              this.application.steps.length >= 9
                ? this.application.steps[8]
                : undefined;
            console.log(this.tenthStep);
            this.loadingSpinner.hide();
          });
      }
    });
  }

  // this is created because legacy code needs to
  // update the 3rd step & 4th step in order to upload the image
  updateStepFilePath(step) {
    this.applicationService.updateStep(step).subscribe(data => {
      if (data.status !== 0) {
        this.notifier.notify('error', 'Error while inserting step!');
      } else {
        this.notifier.notify('success', 'Step confirmed!');
      }
    });
  }

  successfulStep(stepNumber: number) {
    console.log('TESte');
    if (confirm('Are you sure? ')) {
      const newStep = new ApplicationStep();
      newStep.stepNumber = stepNumber;
      newStep.applicationID = this.application.id;
      newStep.message = '';
      newStep.created = new Date();

      const updateStep = new ApplicationStep();
      updateStep.applicationID = this.application.id;
      updateStep.firstFilePath = this.currentStep.firstFilePath;
      updateStep.secondFilePath = this.currentStep.secondFilePath;

      if (stepNumber == 10) {
        console.log(this.currentStep.message);
        if (!this.currentStep.message) {
          this.notifier.notify('error', 'Testimony cannot be empty');
          return;
        }

        if (!this.currentStep.firstFilePath) {
          this.notifier.notify('error', 'testimonial image cannot be empty');
          return;
        }
      }
      // add files to step field
      switch (stepNumber) {
        case 4:
          updateStep.stepNumber = 2;
          this.updateStepFilePath(updateStep);
          this.thirdStep.firstFilePath = this.currentStep.firstFilePath;
          this.thirdStep.secondFilePath = this.currentStep.secondFilePath;
          break;
        case 6:
          updateStep.stepNumber = 3;
          this.updateStepFilePath(updateStep);
          this.fourthStep.firstFilePath = this.currentStep.firstFilePath;
          this.fourthStep.secondFilePath = this.currentStep.secondFilePath;
          break;
        case 10:
          updateStep.stepNumber = 9;
          updateStep.message = this.currentStep.message;
          updateStep.secondFilePath = this.currentStep.firstFilePath;
          console.log(this.currentStep);
          this.updateStepFilePath(updateStep);
          console.log(this.tenthStep);
          this.tenthStep.secondFilePath = this.currentStep.firstFilePath;
          this.tenthStep.message = this.currentStep.message;
        default:
          break;
      }

      this.applicationService.createStep(newStep).subscribe(data => {
        if (data.status !== 0) {
          this.notifier.notify('danger', 'Error while inserting step!');
        }
        this.application.step += 1;
        switch (stepNumber) {
          case 1:
            this.secondStep = newStep;
          case 2:
            this.thirdStep = newStep;
          case 3:
            this.fourthStep = newStep;
          case 4:
            this.fifthStep = newStep;
          case 5:
            this.sixthStep = newStep;
          case 6:
            this.seventhStep = newStep;
          case 7:
            this.eightStep = newStep;

          case 8:
            this.ninthStep = newStep;
          case 9:
            this.tenthStep = newStep;
        }

        if (stepNumber == 10) {
          this.testimonialService
            .insertTestimonial({
              applicationID: this.application.id,
              testimony: this.currentStep.message,
              imageUrl: this.currentStep.firstFilePath,
            })
            .subscribe(
              response => {
                console.log(response);
                this.notifier.notify('success', 'Add Testimony success');
              },
              error => {
                console.error('An error occurred:', error);
                this.notifier.notify('error', error?.error.message);
              }
            );
        }

        this.applicationService
          .updateApplication(this.application)
          .subscribe(updated => console.log(updated));
        this.notifier.notify('success', 'Step confirmed!');

        console.log('STEP NUMBER');
        console.log(stepNumber);
      });
    }
  }

  unsuccessfulStep(stepNumber: number) {
    this.application;
  }

  denyApplication() {
    this.application.step = -1;
    this.applicationService.updateApplication(this.application);
  }

  unsuccessfulPaymentAndContract() {
    if (confirm('Are you sure?')) {
      this.loadingSpinner.show();
      this.application.step = 7;
      this.applicationService
        .updateApplication(this.application)
        .subscribe(updated => {
          if (updated.status == 0) {
            this.notifier.notify('error', 'Payment and contract cancelled');
            // this.fourthStep = this.currentStep;
          } else {
            this.notifier.notify('error', 'Error while creating steps');
          }
          this.loadingSpinner.hide();
        });
    }
  }

  cancelApplication() {
    if (
      confirm(
        'Are you sure you want to cancel this application? This cannot be undone.'
      )
    ) {
      this.loadingSpinner.show();
      this.application.status = 1;
      this.applicationService
        .updateApplication(this.application)
        .subscribe(data => {
          if (data.status == 0) {
            this.notifier.notify('success', 'Application cancelled!');
          } else {
            this.notifier.notify('error', 'Error while cancelling application');
          }
          this.loadingSpinner.hide();
        });
    }
  }

  archiveApplication() {
    if (
      confirm(
        'Are you sure you want to archive this application? This cannot be undone.'
      )
    ) {
      this.loadingSpinner.show();
      this.application.status = 2;
      this.applicationService
        .updateApplication(this.application)
        .subscribe(data => {
          if (data.status == 0) {
            this.notifier.notify('success', 'Application archived!');
          } else {
            this.notifier.notify('error', 'Error while archiving application');
          }
          this.loadingSpinner.hide();
        });
    }
  }
}
