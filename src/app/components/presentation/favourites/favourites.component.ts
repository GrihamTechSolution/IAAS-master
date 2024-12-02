import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { forkJoin } from 'rxjs';
import { FavouriteAbroad } from 'src/app/models/FavouriteAbroad';
import { FavouriteBlog } from 'src/app/models/FavouriteBlog';
import { FavouriteInternship } from 'src/app/models/FavouriteInternship';
import { FavouriteAbroadService } from 'src/app/services/favourite-abroad.service';
import { FavouriteBlogService } from 'src/app/services/favourite-blog.service';
import { FavouriteInternshipService } from 'src/app/services/favourite-internship.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

  apiUrl = environment.apiUrl;
  favouriteAbroads: FavouriteAbroad[] = [];
  favouriteInternships: FavouriteInternship[] = [];
  favouriteBlogs: FavouriteBlog[] = [];
  uploadImageSource = environment.uploadImageSource
  constructor(private router: Router, 
              private favouriteAbroadService: FavouriteAbroadService,
              private favouriteInternshipService: FavouriteInternshipService, 
              private favouriteBlogService: FavouriteBlogService,
              private spinner: Ng4LoadingSpinnerService,
              private auth: UserService, 
              private notifier: NotifierService) { }

  ngOnInit(): void {
    this.spinner.show(); 

    let userData = this.auth.getLoggedInUserData();
    if(!userData){
      this.router.navigateByUrl('');
    }

    let favouriteAbroadObs = this.favouriteAbroadService.getFavouriteAbroadForUser(userData.id);
    let favouriteBlogObs = this.favouriteBlogService.getFavouriteBlogForUser(userData.id);
    let favouriteInternshipObs = this.favouriteInternshipService.getFavouriteInternshipsForUser(userData.id);

    forkJoin([favouriteAbroadObs, favouriteBlogObs, favouriteInternshipObs]).subscribe(data => {
      this.favouriteAbroads = data[0];
      this.favouriteBlogs = data[1];
      this.favouriteInternships = data[2];
      this.spinner.hide();
    })
  }

  removeAbroadFromFavourites(id){
    if (confirm("Are you sure?")){
      this.spinner.show(); 
      this.favouriteAbroadService.deleteFavouriteAbroad(id).subscribe(data => {
        if (data.status == 0){
          this.notifier.notify('success', "Favourite removed!");
          this.ngOnInit();
        }
      })
    }
  }

  removeInternshipFromFavourites(id){
    if (confirm("Are you sure?")){
      this.spinner.show(); 
      this.favouriteInternshipService.deleteFavouriteInternship(id).subscribe(data => {
        if (data.status == 0){
          this.notifier.notify('success', "Favourite removed!");
          this.ngOnInit();
        }
      })
    }
  }

  removeBlogFromFavourites(id){
    if (confirm("Are you sure?")){
      this.spinner.show(); 
      this.favouriteBlogService.deleteFavouriteBlog(id).subscribe(data => {
        if (data.status == 0){
          if (data.status == 0){
            this.notifier.notify('success', "Favourite removed!");
            this.ngOnInit();
          }
        }
      })
    }
  }

}
