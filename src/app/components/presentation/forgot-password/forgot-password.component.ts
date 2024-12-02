import { Component, OnInit } from '@angular/core';
import { MailService } from 'src/app/services/mail.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { NotifierService } from 'angular-notifier';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  user: User = new User();
  email: string;
  alerts: any[] = [];

  imageSource = environment.imageSource

  constructor(private mailService: MailService, 
              private loadingSpinner: Ng4LoadingSpinnerService, 
              private userService: UserService, 
              private notifier: NotifierService) { }

  ngOnInit(): void {
  }

  getResetLink(){
    // this.loadingSpinner.show()
    let resetPass: any = {}; 
    // resetPass.isServed = 0; 
    resetPass.email = this.email;
    this.userService.getResetLink(resetPass).subscribe(data => {
      // if (data.status == 0) {
      //   this.notifier.notify('success', 'Check your email for reset link!');
      // }
      // else {
      //   this.notifier.notify('error', 'Error while getting reset link!');
      // }
      // this.loadingSpinner.hide()
    })
    this.notifier.notify('success', 'Check your email for reset link!');

  }

}
