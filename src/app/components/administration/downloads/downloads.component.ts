import { Component, OnInit } from '@angular/core';
import { Download } from 'src/app/models/Download';
import { DownloadService } from 'src/app/services/download.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NotifierService } from 'angular-notifier';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.css']
})
export class DownloadsComponent implements OnInit {

  downloads: Download[] = [];
  apiStaticUrl = `${environment.apiUrl}/`;
  uploadImageSource = environment.uploadImageSource

  constructor(private downloadService: DownloadService,
              private loadingSpinner: Ng4LoadingSpinnerService,
              private notifier: NotifierService) { }

  ngOnInit() {
    this.loadingSpinner.show();

    this.downloadService.getDownloads().subscribe(data => {
      this.downloads = data;
      this.loadingSpinner.hide();
    })
  }

  deleteDownload(id: number){
    if (confirm("Are you sure?")){
      this.loadingSpinner.show();
      this.downloadService.deleteDownload(id).subscribe(data => {
        if (data.status == 0){
          this.notifier.notify('info', 'Download successfully deleted');
          this.ngOnInit();
        }
        else {
          this.notifier.notify('error', 'Error while deleting download!');
        }
      })
    }
  }

}
