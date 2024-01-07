import { Component, OnInit } from '@angular/core';
import { Download } from 'src/app/models/Download';
import { DownloadService } from 'src/app/services/download.service';
import { environment } from 'src/environments/environment';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-presentations-downloads',
  templateUrl: './presentations-downloads.component.html',
  styleUrls: ['./presentations-downloads.component.scss']
})
export class PresentationsDownloadsComponent implements OnInit {

  apiUrl = environment.apiUrl;
  downloads: Download[] = [];
  brandResourceDownloads: Download[] = [];
  bookletDownloads: Download[] = [];
  publicationDownloads: Download[] = [];
  otherDownloads: Download[] = [];
  exproDownloads: Download[] = [];
  isIaasUser: boolean = false;
  uploadImageSource = environment.uploadImageSource

  constructor(private downloadService: DownloadService, 
              private loadingSpinner: Ng4LoadingSpinnerService, 
              private auth: UserService) { }

  ngOnInit(): void {
    this.loadingSpinner.show();

    let user = this.auth.getLoggedInUserData();
    if (user && (user.userTypeID == 4 || user.userTypeID == 5 || user.userTypeID == 6 || user.userTypeID == 3)) {
      this.isIaasUser = true;
    }

    this.downloadService.getDownloads().subscribe(data => {
      this.downloads = data;
      this.brandResourceDownloads = this.downloads.filter(d => d.categoryID == 1);
      this.bookletDownloads = this.downloads.filter(d => d.categoryID == 2);
      this.publicationDownloads = this.downloads.filter(d => d.categoryID == 3);
      this.otherDownloads = this.downloads.filter(d => d.categoryID == 4);
      this.exproDownloads = this.downloads.filter(d => d.categoryID == 5);
      this.loadingSpinner.hide();
    })
  }

}
