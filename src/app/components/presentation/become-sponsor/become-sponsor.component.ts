import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Sponsor } from 'src/app/models/Sponsor';
import { SponsorService } from 'src/app/services/sponsor.service';

@Component({
  selector: 'app-become-sponsor',
  templateUrl: './become-sponsor.component.html',
  styleUrls: ['./become-sponsor.component.scss']
})
export class BecomeSponsorComponent implements OnInit {

  sponsors: Sponsor[] = [];
  apiUrl = environment.apiUrl;

  imageSource = environment.imageSource
  uploadImageSource = environment.uploadImageSource

  constructor(private sponsorService: SponsorService, 
              private loadingSpinner: Ng4LoadingSpinnerService) { }

  ngOnInit(): void {
    this.loadingSpinner.show(); 
    this.sponsorService.getSponsors().subscribe(data => {
      this.sponsors = data; 
      this.loadingSpinner.hide(); 
    })
  }

}
