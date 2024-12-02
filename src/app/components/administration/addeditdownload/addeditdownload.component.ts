import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { Download } from 'src/app/models/Download';
import { DownloadService } from 'src/app/services/download.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-addeditdownload',
  templateUrl: './addeditdownload.component.html',
  styleUrls: ['./addeditdownload.component.css']
})
export class AddeditdownloadComponent implements OnInit {

  uploader: FileUploader = new FileUploader({
    url: `${environment.apiUrl}/upload`,
    itemAlias: 'doc'
  })

  previewImgUploader: FileUploader = new FileUploader({
    url: `${environment.apiUrl}/upload`,
    itemAlias: 'doc'
  })

  download: Download = new Download();
  edit: boolean = false;
  fileAdded: boolean = false;
  apiStaticUrl = `${environment.apiUrl}`;
  uploadImageSource = environment.uploadImageSource

  constructor(private downloadService: DownloadService,
              private activatedRoute: ActivatedRoute,
              private loadingSpinner: Ng4LoadingSpinnerService,
              private notifier: NotifierService,
              private router: Router) { }

  ngOnInit() {
    this.loadingSpinner.show();

    this.activatedRoute.params.subscribe(params => {
      if (params['id']){
        this.edit = true;
        this.downloadService.getDownloadByID(params['id']).subscribe(data => {
          this.download = data;
          this.loadingSpinner.hide();
        })
      }
    })

    this.uploader.onAfterAddingFile = (file) => {
      //debugger;
      file.withCredentials = false; 
      this.fileAdded = true;
      this.loadingSpinner.show()
      this.uploader.uploadAll();
    }

    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      response = JSON.parse(response);
      if (response.status == 0) {
        this.download.downloadPath = response.filename;
        this.loadingSpinner.hide()
        this.notifier.notify('success', 'Download file uploaded!');
        //this.addEditDownload();
      }
    }

    this.previewImgUploader.onAfterAddingFile = (file) => {
      //debugger;
      file.withCredentials = false; 
      // this.fileAdded = true;
      this.loadingSpinner.show();
      this.previewImgUploader.uploadAll();
    }

    this.previewImgUploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      response = JSON.parse(response);
      if (response.status == 0) {
        this.download.imagePath = response.filename;
        this.notifier.notify('success', 'Preview image uploaded!');
        this.loadingSpinner.hide();
        // this.addEditDownload();
      }
    }

    this.loadingSpinner.hide();
  }

  addEditDownload(){
    this.loadingSpinner.show();

    if (this.edit){
      this.downloadService.updateDownload(this.download).subscribe(data => {
        this.loadingSpinner.hide();
        if (data.status == 0){
          this.notifier.notify('info', 'Download item updated!');
          this.router.navigateByUrl('/administration/downloads');
        }
        else {
          this.notifier.notify('error', 'Error while updating download item!');
        }
      })
    }
    else {
      this.downloadService.insertDownload(this.download).subscribe(data => {
        this.loadingSpinner.hide();
        if (data.status == 0){
          this.notifier.notify('info', 'Download item inserted!');
          this.router.navigateByUrl('/administration/downloads');
        }
        else {
          this.notifier.notify('error', 'Error while inserting download item!');
        }
      })
    }

  }

  validateInput(){
    if (!this.download.title || !this.download.description) {
      this.notifier.notify('error', 'Please insert all download item data!');
      return;
    }

    if (!this.edit && !this.fileAdded){
      this.notifier.notify('error', 'Please attach file!');
      return ;
    }

    this.addEditDownload();
  }

}
