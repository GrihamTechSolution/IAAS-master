import { Component, OnInit } from '@angular/core';
import { StudyAbroadService } from 'src/app/services/study-abroad.service';
import { StudyAbroadProgram } from 'src/app/models/StudyAbroadProgram';
import { Partner } from 'src/app/models/Partner';
import { PartnerService } from 'src/app/services/partner.service';
import { environment } from 'src/environments/environment';
declare var $ :any;

@Component({
  selector: 'app-presentation-study-abroad',
  templateUrl: './presentation-study-abroad.component.html',
  styleUrls: ['./presentation-study-abroad.component.scss']
})
export class PresentationStudyAbroadComponent implements OnInit {

  programs: StudyAbroadProgram[] = [];
  studyAbroadPartners: Partner[] = [];
  apiUrl = environment.apiUrl;
  imageSource = environment.imageSource
  uploadImageSource = environment.uploadImageSource

  constructor(private studyAbroadService: StudyAbroadService, private partnerService: PartnerService) { }

  ngOnInit(): void {
    this.studyAbroadService.getStudyAbroadPrograms().subscribe(data => {
      this.programs = data;
    })

    this.partnerService.getPartners().subscribe(
      data => this.studyAbroadPartners = data.filter(p => p.studyAbroad == 1)
    );

    $('.carousel-showmanymoveone .item').each(function(){
      var itemToClone = $(this);
  
      for (var i=1;i<6;i++) {
        itemToClone = itemToClone.next();
  
        // wrap around if at end of item collection
        if (!itemToClone.length) {
          itemToClone = $(this).siblings(':first');
        }
  
        // grab item, clone, add marker class, add to collection
        itemToClone.children(':first-child').clone()
          .addClass("cloneditem-"+(i))
          .appendTo($(this));
      }
    });

    $('.carousel').carousel({
      interval: 2000
    })
  }

}
