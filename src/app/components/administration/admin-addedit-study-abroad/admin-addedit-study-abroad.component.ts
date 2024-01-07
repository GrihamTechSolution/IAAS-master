import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { StudyAbroadService } from 'src/app/services/study-abroad.service';
import { NotifierService } from 'angular-notifier';
import { ActivatedRoute, Router } from '@angular/router';
import { StudyAbroadProgram } from 'src/app/models/StudyAbroadProgram';
import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { StudyAbroadImage } from 'src/app/models/StudyAbroadImage';
import { PartnerService } from 'src/app/services/partner.service';
import { Partner } from 'src/app/models/Partner';
//import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as ClassicEditor from 'src/ckeditor/ckeditor';

@Component({
  selector: 'app-admin-addedit-study-abroad',
  templateUrl: './admin-addedit-study-abroad.component.html',
  styleUrls: ['./admin-addedit-study-abroad.component.scss']
})
export class AdminAddeditStudyAbroadComponent implements OnInit {

  program: StudyAbroadProgram = new StudyAbroadProgram();
  edit: boolean = false;
  partners: Partner[] = [];
  apiUrl = environment.apiUrl;
  uploadImageSource = environment.uploadImageSource

  public Editor = ClassicEditor;

  // Change: Custom ckeditor needs custom configuration
  ckconfig: any = {
    alignment: {
      options: ['left', 'right', 'center']
    },
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'alignment:left', 'alignment:center', 'alignment:right', '|',
        'imageUpload',
        'insertTable',
        'mediaEmbed',
        'blockQuote',
        'undo',
        'redo',
      ]
    },
    image: {
      toolbar: [
        'imageTextAlternative'
      ]
    },
    mediaEmbed: {
      previewsInData: true
    },
    // This is how we can define simple uploader, no need to define custom uploader like you did in Article Management
    simpleUpload: {
      // The URL that the images are uploaded to.
      uploadUrl: `${environment.apiUrl}/upload`,

      // Enable the XMLHttpRequest.withCredentials property.
      withCredentials: false,

    },
  };

  uploader: FileUploader = new FileUploader({
    url: `${environment.apiUrl}/upload`,
    itemAlias: 'doc'
  })

  constructor(private loadinSpinner: Ng4LoadingSpinnerService,
    private studyAbroadService: StudyAbroadService,
    private notifier: NotifierService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private partnerService: PartnerService) { }

  ngOnInit(): void {
    this.loadinSpinner.show();

    this.uploader.onAfterAddingFile = (file) => {
      this.loadinSpinner.show();
      file.withCredentials = false;
      // this.fileAdded = true;
      this.uploader.uploadAll();

    }

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.loadinSpinner.hide();
      //this.loadinSpinner.show();
      response = JSON.parse(response);
      if (response.status == 0) {
        let img: StudyAbroadImage = new StudyAbroadImage();
        img.studyAbroadProgramID = this.program.id;
        img.path = response.filename;

        this.studyAbroadService.addImageForStudyAbroad(img).subscribe(imgData => {
          if (imgData.status == 0) {
            //this.loadinSpinner.show();
            this.notifier.notify('success', 'Image added');

            // this.loadinSpinner.hide();
            setTimeout(() => {
              this.router.navigate(["/administration/addeditstudyabroad", this.program.id]);
              //location.reload();
            }, 500)
            // this.ngOnInit();
          }
        })
      }
    }

    this.partnerService.getPartners().subscribe(data => {
      this.partners = data.filter(e => e.studyAbroad == 1);
    })

    this.activatedRoute.params.subscribe(data => {
      if (data['id']) {
        this.edit = true;
        this.studyAbroadService.getStudyAbroadProgramByID(data['id']).subscribe(program => {
          this.program = program;
          this.loadinSpinner.hide();
        })
      }
      else {
        this.loadinSpinner.hide();
      }
    })
  }

  insertOrEditStudyAbroadProgram() {
    console.log(this.program);
    if (!this.program.title ||
      !this.program.description ||
      !this.program.siteLink ||
      !this.program.about ||
      !this.program.location) {
      this.notifier.notify('error', 'Please insert all parameters!');
      return;
    }

    if (confirm("Are you sure?")) {
      this.loadinSpinner.show();
      if (this.edit) {
        this.studyAbroadService.updateStudyAbroadProgram(this.program).subscribe(data => {
          if (data.status == 0) {
            this.notifier.notify('success', 'Program updated!');
            // this.loadinSpinner.show();
            this.loadinSpinner.hide();
            setTimeout(() => {
              location.reload();
            }, 400);
          }
          else {
            this.notifier.notify('error', 'Error while updating program!');
            this.loadinSpinner.hide();
          }
        })
      }
      else {
        this.studyAbroadService.insertStudyAbroadProgram(this.program).subscribe(data => {
          if (data.status == 0) {
            this.notifier.notify('success', 'Program inserted!');
            this.loadinSpinner.hide();
            this.program.id = data.data.id;
            //alert(this.program.id);
          }
          else {
            this.notifier.notify('error', 'Error while inserting program!');
            this.loadinSpinner.hide();
          }
        })
      }
    }
  }

  insertImage() {

  }

  deleteImage(id) {
    if (confirm('Are you sure?')) {
      this.loadinSpinner.show();
      this.studyAbroadService.deleteImageForStudyAbroadProgram(id).subscribe(data => {
        if (data.status == 0) {
          this.loadinSpinner.show();
          this.notifier.notify('success', 'Image deleted');
          setTimeout(() => {
            location.reload();
          }, 400);
        }
        else {
          this.notifier.notify('error', 'Error while deleting image!');
        }
        this.loadinSpinner.hide();
      })
    }
  }

}
