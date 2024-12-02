import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  userTypeID: number; 

  constructor(private auth: UserService, 
              private router: Router) { }

  ngOnInit() {
    let user = this.auth.getLoggedInUserData(); 

    if (!user){
      this.router.navigateByUrl('/');
    }

    if (!(user.userTypeID == 4 || 
          user.userTypeID == 7 || 
          user.userTypeID == 3 || 
          user.userTypeID == 6 || 
          user.userTypeID == 5)) {
      this.router.navigateByUrl('/');
    }

    this.userTypeID = user.userTypeID;
  }

  logout(){
    window.localStorage.removeItem('iaas-user');
    this.router.navigateByUrl('/');
    window.location.reload();
  }
}
