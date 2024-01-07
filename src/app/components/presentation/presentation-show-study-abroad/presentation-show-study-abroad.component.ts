import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { StudyAbroadProgram } from 'src/app/models/StudyAbroadProgram';
import { StudyAbroadService } from 'src/app/services/study-abroad.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { FavouriteAbroadService } from 'src/app/services/favourite-abroad.service';
import { FavouriteAbroad } from 'src/app/models/FavouriteAbroad';
import { UserService } from 'src/app/services/user.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-presentation-show-study-abroad',
  templateUrl: './presentation-show-study-abroad.component.html',
  styleUrls: ['./presentation-show-study-abroad.component.scss']
})
export class PresentationShowStudyAbroadComponent implements OnInit {

  current: number = 0;
  program: StudyAbroadProgram = new StudyAbroadProgram();
  apiUrl = environment.apiUrl;
  hasItInFavourite: boolean = false;
  favouriteAbroads: FavouriteAbroad[] = [];
  studyAbroadID:any;
  uploadImageSource = environment.uploadImageSource

  constructor(private router: Router, 
              private spinner: Ng4LoadingSpinnerService, 
              private studyAbroadService: StudyAbroadService, 
              private activatedRoute: ActivatedRoute, 
              private favouriteAbroadService: FavouriteAbroadService, 
              private auth: UserService, 
              private notifier: NotifierService) { }

  ngOnInit(): void {

    this.spinner.show();

    let userData = this.auth.getLoggedInUserData();

    

    this.activatedRoute.params.subscribe(data => {
      if (data['id']){
        this.studyAbroadID = data['id'];
        this.studyAbroadService.getStudyAbroadProgramByID(data['id']).subscribe(p => {
          this.program = p;
          this.spinner.hide();

          this.favouriteAbroadService.getFavouriteAbroadForUser(userData.id).subscribe(favData => {
            this.favouriteAbroads = favData;
            let helper = this.favouriteAbroads.filter(f => f.studyAbroadID == data['id']);
            if (helper.length > 0) {
              this.hasItInFavourite = true;
            }
          })
        })
      }
      else {
        this.spinner.hide();
        this.router.navigateByUrl('/studyAbroadList');
      }
    })
  }

  saveToFavourites(){
    let fav = new FavouriteAbroad();
    let userData = this.auth.getLoggedInUserData(); 
    fav.studyAbroadID = this.studyAbroadID;
    fav.userID = userData.id; 

    this.favouriteAbroadService.insertFavouriteAbroad(fav).subscribe(data => {
      if (data.status == 0){
        this.notifier.notify('success', 'Inserted into favourites');
        this.hasItInFavourite = true;
      }
    })
  }

  removeFromFavourites(){
    if (confirm("Are you sure?")){
      let fav = this.favouriteAbroads.filter(f => f.studyAbroadID == this.studyAbroadID)[0];
      console.log(fav);
      this.favouriteAbroadService.deleteFavouriteAbroad(fav.id).subscribe(data => {
        if (data.status == 0){
          this.notifier.notify('success', 'Removed from favourites');
          this.hasItInFavourite = false;
        }
      })
    }
    
  }

  increaseCurrent(){
    this.current = this.current + 1;
  }

  decreaseCurrent(){
    this.current = this.current - 1;
  }

}
