import { Component, OnInit } from '@angular/core';
//import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as ClassicEditor from 'src/ckeditor/ckeditor';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { NotifierService } from 'angular-notifier';
import { ActivatedRoute, Router } from '@angular/router';
import { env } from 'process';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Events } from 'src/app/models/Events';
import { EventsService } from 'src/app/services/events-service';

@Component({
  selector: 'app-add-edit-events',
  templateUrl: './add-edit-events.component.html',
  styleUrls: ['./add-edit-events.component.css']
})
export class AddEditEventsComponent implements OnInit {

  uploader: FileUploader = new FileUploader({
    url: `${environment.apiUrl}/upload`,
    itemAlias: 'doc'
  })
  uploadImageSource = environment.uploadImageSource
  // ckconfig: any = {
  //   // include any other configuration you want

  // };

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
    }
    ,
    image: {
      toolbar: [
        'imageTextAlternative'
      ]
    },
    mediaEmbed: {
      previewsInData: true
    }
  };

  public Editor = ClassicEditor;
  fileAdded: boolean = false;
  events: Events = new Events();
  edit: boolean = false;
  apiUrl = environment.apiUrl;
  eventId = ""

  constructor(private notifier: NotifierService,
    private eventService: EventsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinner: Ng4LoadingSpinnerService) { }

  ngOnInit() {

    this.ckconfig.extraPlugins = [MyCustomUploadAdapterPlugin];



    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      this.fileAdded = true;
      // Show spinner when cover image upload starts
      this.spinner.show();
      this.uploader.uploadAll();
    }

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      // Hide spinner when cover image upload finish
      this.spinner.hide();
      response = JSON.parse(response);
      if (response.status == 0) {
        console.log(response.filename);
        this.notifier.notify('success', 'Image uploaded!');
        this.events.imagePath = response.filename;
        //this.addEditArticle();
      }
      else {
        this.notifier.notify('error', 'Error while uploading image!');
      }
    }

    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.edit = true;
        this.eventId = params['id']
        this.eventService.getEventsById(params['id']).subscribe(data => {
          this.events = data.data;
        })
      }
    })
  }

  addEditArticle() {
    if (this.edit) {
      this.eventService.updateEvent(this.eventId, this.events).subscribe(data => {
        if (data.success) {
          this.notifier.notify("info", data.message);
          this.router.navigateByUrl('/administration/events');
        }
        else {
          this.notifier.notify("error", data.message);
        }
      })
    }
    else {
      if (localStorage.getItem('iaas-user'))
        this.events.userID = JSON.parse(localStorage.getItem('iaas-user')).id;
      this.eventService.insertEvents(this.events).subscribe(data => {

        if (data.success) {
          this.notifier.notify("info", data.message);
          this.router.navigateByUrl('/administration/events');
        }
        else {
          this.notifier.notify("error", data.message);
        }
      })
    }
  }

  cancel(){
    this.router.navigateByUrl('/administration/events')
  }

  validateInput() {
    if (!this.events.title ||
      !this.events.content || 
      !this.events.status) {
      this.notifier.notify("error", "Please insert all article data!");
      return;
    }

    this.addEditArticle();
  }
}

function MyCustomUploadAdapterPlugin(editor) {
  // alert();
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    // Configure the URL to the upload script in your back-end here!
    return new MyUploadAdapter(loader);
  };
}

class MyUploadAdapter {

  loader;
  xhr;
  apiUrl = environment.apiUrl;

  constructor(loader) {
    // The file loader instance to use during the upload. It sounds scary but do not
    // worry — the loader will be passed into the adapter later on in this guide.
    this.loader = loader;
  }

  _initRequest() {
    const xhr = this.xhr = new XMLHttpRequest();

    // Note that your request may look different. It is up to you and your editor
    // integration to choose the right communication channel. This example uses
    // a POST request with JSON as a data structure but your configuration
    // could be different.
    xhr.open('POST', `${this.apiUrl}/upload`, true);
    xhr.responseType = 'json';
  }

  _initListeners(resolve, reject, file) {
    const xhr = this.xhr;
    const loader = this.loader;
    const genericErrorText = `Couldn't upload file: ${file.name}.`;

    xhr.addEventListener('error', () => reject(genericErrorText));
    xhr.addEventListener('abort', () => reject());
    xhr.addEventListener('load', () => {
      const response = xhr.response;

      // This example assumes the XHR server's "response" object will come with
      // an "error" which has its own "message" that can be passed to reject()
      // in the upload promise.
      //
      // Your integration may handle upload errors in a different way so make sure
      // it is done properly. The reject() function must be called when the upload fails.
      if (!response || response.error) {
        return reject(response && response.error ? response.error.message : genericErrorText);
      }

      // If the upload is successful, resolve the upload promise with an object containing
      // at least the "default" URL, pointing to the image on the server.
      // This URL will be used to display the image in the content. Learn more in the
      // UploadAdapter#upload documentation.
      resolve({
        default: response.url
      });
    });

    // Upload progress when it is supported. The file loader has the #uploadTotal and #uploaded
    // properties which are used e.g. to display the upload progress bar in the editor
    // user interface.
    if (xhr.upload) {
      xhr.upload.addEventListener('progress', evt => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }

  _sendRequest(file) {
    // Prepare the form data.
    const data = new FormData();

    data.append('doc', file);

    // Important note: This is the right place to implement security mechanisms
    // like authentication and CSRF protection. For instance, you can use
    // XMLHttpRequest.setRequestHeader() to set the request headers containing
    // the CSRF token generated earlier by your application.

    // Send the request.
    this.xhr.send(data);
  }

  upload() {
    return this.loader.file
      .then(file => new Promise((resolve, reject) => {
        this._initRequest();
        this._initListeners(resolve, reject, file);
        this._sendRequest(file);
      }));
  }

  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }
}
