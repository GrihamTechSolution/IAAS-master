import { Component, OnInit } from '@angular/core';
import { Partner } from 'src/app/models/Partner';
import { Sponsor } from 'src/app/models/Sponsor';
import { PartnerService } from 'src/app/services/partner.service';
import { SponsorService } from 'src/app/services/sponsor.service';
import { environment } from 'src/environments/environment';
import { Observable, forkJoin } from 'rxjs';
import { ArticleCategoryService } from 'src/app/services/article-category.service';
import { Article } from 'src/app/models/Article';

declare var $ : any;

@Component({
  selector: 'app-presentation-home',
  templateUrl: './presentation-home.component.html',
  styleUrls: ['./presentation-home.component.scss']
})
export class PresentationHomeComponent implements OnInit {

  partners: Partner[] = [];
  sponsors: Sponsor[] = [];
  sliderPartners: Partner[] = [];
  sliderSponsors: Sponsor[] = [];
  articles: Article[] = [];


  homeContent: any = [
    {
      image: "iaasglobal.png",
      content: "We create projects to contribute in global goals",
      link: "/contentHub",
      title: "IAAS for Global Goals"
    },
    {
      image: "iaas-expro-home.png",
      content: "We provide Exchange Program and Internships in agricultural related companies and organizations",
      link: "/expro/home",
      title: "IAAS Exchange Program"

    },
    {
      image: "iaas-info-3.png",
      content: "We provide Study Abroad Program opportunity  space in life science universities",
      link: "/studyAbroad",
      title: "Study Abroad Program"
    },
  ]

  apiUrl = environment.apiUrl;
  imageSource = environment.imageSource
  uploadImageSource = environment.uploadImageSource
 
  constructor(private partnerService: PartnerService, 
              private sponsorService: SponsorService,
              private articleCategoryService: ArticleCategoryService) { }

  ngOnInit(): void {

    let partnersObs =  this.partnerService.getPartners();
    let sponsorsObs =  this.sponsorService.getSponsors();

    this.articleCategoryService.getArticles().subscribe(
      data => {
        data = data.filter(item => item.status == 1).sort((a1, a2) => a2.id - a1.id);
        /// Please, be elegant!
        if (data[0]) this.articles.push(data[0]);
        if (data[1]) this.articles.push(data[1]);
        if (data[2]) this.articles.push(data[2]);
        if (data[3]) this.articles.push(data[3]);
      },
      error => console.log(error)
    )

    forkJoin([partnersObs, sponsorsObs]).subscribe(data => {
      this.sliderPartners = data[0].filter(p => p.isShown == 1);
      this.sliderSponsors = data[1].filter(s => s.isShown == 1); 

      setTimeout(function(){
        // $('.carousel-showmanymoveone .item').each(function(){
        //   var itemToClone = $(this);
      
        //   for (var i=1;i<6;i++) {
        //     itemToClone = itemToClone.next();
      
        //     // wrap around if at end of item collection
        //     if (!itemToClone.length) {
        //       itemToClone = $(this).siblings(':first');
        //     }
      
        //     // grab item, clone, add marker class, add to collection
        //     // console.log("THIS");
        //     // itemToClone.children(':first-child').clone()
        //     //   .addClass("cloneditem-"+(i))
        //     //   .appendTo($(this));
        //   }
        // });
    
        $('.carousel').carousel({
          interval: 1500
        })
      }, 100)
    })

    };

  prepareCarousel(){
    
  }    

}
