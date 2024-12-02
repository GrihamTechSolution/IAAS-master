import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { NotifierService } from 'angular-notifier';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();

  constructor(private router: Router, 
              private userService: UserService,
              private notifier: NotifierService) { }

  ngOnInit() {

  }

  imageSource = environment.imageSource

  login(){
    this.userService.login(this.user).subscribe(data => {
      if (data.status == 0) {
        this.notifier.notify('info', 'Successfully logged in!');
        let userData: any = {};
        userData.id = data.id;
        userData.userTypeID = data.userTypeID;
        userData.email = data.email;

        localStorage.setItem('iaas-user', JSON.stringify(userData));
        
        this.router.navigateByUrl('/');
      }
      else {
        this.notifier.notify('error', 'Your credentials are not OK, or you are not approved!');
      }
    })
  }

}
