import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  user: any = {};
  userData: any;
  isUserLoggedIn: boolean = false;
  imageSource = environment.imageSource

  constructor(private auth: UserService, 
              private router: Router) { }

  ngOnInit(): void {
    this.isUserLoggedIn = this.auth.isLoggedIn();
    this.user = JSON.parse(localStorage.getItem('iaas-user'));
  }

  logout(){
    window.localStorage.removeItem('iaas-user');
    this.router.navigateByUrl('/');
    this.isUserLoggedIn = false;
    // window.location.reload();
  }

}
