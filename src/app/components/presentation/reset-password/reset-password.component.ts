import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ResetPasswordRequest } from 'src/app/models/ResetPasswordRequest';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  user: User = new User();
  resetPass: ResetPasswordRequest = new ResetPasswordRequest();
  userEmail: string; 
  imageSource = environment.imageSource

  constructor(private userService: UserService, 
              private notifier: NotifierService, 
              private loadingSpinner: Ng4LoadingSpinnerService, 
              private activatedRoute: ActivatedRoute, 
              private router: Router) { }

  ngOnInit(): void {
    this.loadingSpinner.show(); 

    this.activatedRoute.params.subscribe(data => {
      if (data['guid']) {
        this.userService.getResetLinkByGuid(data['guid']).subscribe(resetPassData => {
          this.resetPass = resetPassData;
          this.loadingSpinner.hide();
        })
      }
      else {
        this.loadingSpinner.hide();
        this.router.navigateByUrl('/');
      }
    })
  }

  serveResetLink(){
    if (this.userEmail != this.resetPass.email) {
      this.notifier.notify('error', 'Emails do not match!');
      return;
    }

    if (this.resetPass.newPassword != this.resetPass.newPasswordConfirm) {
      this.notifier.notify('error', 'Passwords do not match!');
      return;
    }

    this.loadingSpinner.show();
    this.resetPass.isServed = 1;
    this.userService.serveResetLink(this.resetPass).subscribe(data => {
      if (data.status == 0){
        this.notifier.notify('success', 'Password reset complete!');
        setTimeout(() => {
          this.loadingSpinner.hide(); 
          this.router.navigateByUrl('/login');
        }, 500)
      }
      else {
        this.notifier.notify('error', 'Error while reseting password!');
        setTimeout(() => {
          this.loadingSpinner.hide(); 
          this.router.navigateByUrl('/login');
        }, 500)
      }
    })
  }

}
