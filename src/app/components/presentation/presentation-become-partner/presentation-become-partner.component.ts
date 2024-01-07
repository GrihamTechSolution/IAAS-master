import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Partner } from 'src/app/models/Partner';
import { PartnerService } from 'src/app/services/partner.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-presentation-become-partner',
  templateUrl: './presentation-become-partner.component.html',
  styleUrls: ['./presentation-become-partner.component.scss']
})
export class PresentationBecomePartnerComponent implements OnInit {

  partners: Partner[] = [];
  apiUrl = environment.apiUrl;
  imageSource = environment.imageSource
  uploadImageSource = environment.uploadImageSource

  constructor(private partnersService: PartnerService, 
              private loadingSpinner: Ng4LoadingSpinnerService) { }

  ngOnInit(): void {
    this.loadingSpinner.show();
    this.partnersService.getPartners().subscribe(data => {
      this.partners = data;
      this.loadingSpinner.hide();
    })
  }

}
