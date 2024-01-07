import { Component, OnInit } from '@angular/core';
import { MailService } from 'src/app/services/mail.service';
import { NotifierService } from 'angular-notifier';
import { ExproMail } from 'src/app/models/ExproMail';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-expro-backpacking',
  templateUrl: './expro-backpacking.component.html',
  styleUrls: ['./expro-backpacking.component.scss']
})
export class ExproBackpackingComponent implements OnInit {

  exproMail: ExproMail = new ExproMail();

  constructor(private mailService: MailService,
              private notifier: NotifierService,
              private spinner: Ng4LoadingSpinnerService) { }

  imageSource = environment.imageSource

  ngOnInit() {

  }

  sendExproMail() {
   this.spinner.show();
   if (!this.exproMail.name || !this.exproMail.email) {
     this.notifier.notify('error', 'Please insert all data!');
     this.spinner.hide();
     return;
   }
   
   this.exproMail.toEmail = 'vpexchange@iaasworld.org';
   // this.exproMail.toEmail = 'milena.plamenac@firenet.me';
   this.mailService.sendExproMail(this.exproMail).subscribe(data => {
     if (data.status == 0) {
      this.notifier.notify('success', 'Mail has been sent!');
      this.spinner.hide();
     }
     else {
      this.notifier.notify('error', 'Error while sending mail! Please try later!');
      this.spinner.hide();
     }
   })

  this.exproMail.toEmail = 'expro@iaasworld.org';
  //this.exproMail.toEmail = 'milena.plamenac@firenet.me';
  this.mailService.sendExproMail(this.exproMail).subscribe(data => { });
  }

}
