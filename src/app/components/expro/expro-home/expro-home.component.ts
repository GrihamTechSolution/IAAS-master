import { Component, HostListener, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgImageSliderComponent } from 'ng-image-slider';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Internship } from 'src/app/models/Internship';
import { InternshipService } from 'src/app/services/internship.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

declare var $ : any;

@Component({
  selector: 'app-expro-home',
  templateUrl: './expro-home.component.html',
  styleUrls: ['./expro-home.component.scss']
})
export class ExproHomeComponent implements OnInit, AfterViewInit {

  imageSource = environment.imageSource
  // @ViewChild('nav') slider: NgImageSliderComponent;
//   imageObject: Array<object> = [{
//     image: './../../../../assets/img/featured_ops1.png',
//     thumbImage: './../../../../assets/img/featured_ops1.png',
//     alt: 'alt of image',
//     title: 'SUPERIOR',
// }, {
//     image: './../../../../assets/img/expro-brochure.png',
//     thumbImage: './../../../../assets/img/expro-brochure.png',
//     title: 'Image title', //Optional: You can use this key if want to show image with title
//     alt: 'Image alt' //Optional: You can use this key if want to show image with alt
// }
// ];
  @ViewChild('nav') slider: NgImageSliderComponent;
  imageObject: Array<object> = [];

  userData: any;
  internships: Internship[] = [];

  apiUrl = environment.apiUrl;
  uploadImageSource = environment.uploadImageSource

  constructor(private internshipService: InternshipService, 
              private loadingSpinner: Ng4LoadingSpinnerService, 
              private auth: UserService, 
              private router: Router) { }

  ngAfterViewInit(): void {
    // let carouselInner = $('.carousel-inner').height();
    // console.log(carouselInner);
    // $('.carousel-inner .item img').css("top", carouselInner/2 + "px");
    // $('.carousel-inner .item img').css("translateY", "-100px");
  }

  ngOnInit() {
    this.loadingSpinner.show(); 

    this.userData = this.auth.getLoggedInUserData(); 

    this.internshipService.getInternships().subscribe(data => {
      this.internships = data.filter(internship => internship.isFeatured && internship.images.length > 0);

      let helperImgObject = [];
      for(let i = 0; i < this.internships.length; i++) {
        let currentInternship = this.internships[i];
        helperImgObject.push({
          image: `${this.apiUrl}/${currentInternship.images[0].imagePath}`,
          thumbImage: `${this.uploadImageSource}/${currentInternship.images[0].imagePath}`, 
          title: currentInternship.name, 
          alt: 'IMAGE ALT', 
          id: currentInternship.id
        });
      }

      this.imageObject = helperImgObject;

      this.loadingSpinner.hide();
    })

    // let carouselInner = $('.carousel-inner').height();
    // console.log(carouselInner);
    // $('.carousel-inner .item img').css("top", carouselInner/2 + "px");
    // $('.carousel-inner .item img').css("translateY", "-100px");

    // this.slider.imageSize = { width: '300px', height: '300px'};
  }

  checkImage(){
    let index = this.slider.visiableImageIndex - 1;
    let img: any = this.imageObject[index];
    this.router.navigateByUrl(`/internshipDetails/${img.id}`);
  }

  @HostListener('window:resize', ['$event'])
     onResize(event) {
    //   //console.log(event.target.innerHeight);
    //   let carouselInner = $('.carousel-inner').height();
    //   console.log(carouselInner);

    //   $('.carousel-inner .item img').css("top", carouselInner/2 + "px");
    //   $('.carousel-inner .item img').css("translateY", "-100px");
     }

}
