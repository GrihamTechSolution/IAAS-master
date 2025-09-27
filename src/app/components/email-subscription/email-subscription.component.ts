import { Component, OnInit } from '@angular/core';
import { EmailSubscriptionService } from 'src/app/services/email-subscription.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-email-subscription',
  templateUrl: './email-subscription.component.html',
  styleUrls: ['./email-subscription.component.scss']
})
export class EmailSubscriptionComponent implements OnInit {

  email: string = '';
  isSubscribing: boolean = false;

  constructor(
    private emailSubscriptionService: EmailSubscriptionService,
    private spinner: Ng4LoadingSpinnerService,
    private notifier: NotifierService
  ) { }

  ngOnInit(): void {
  }

  subscribeToNewsletter(): void {
    if (!this.email || !this.isValidEmail(this.email)) {
      this.notifier.notify('error', 'Please enter a valid email address');
      return;
    }

    this.isSubscribing = true;
    this.spinner.show();

    this.emailSubscriptionService.subscribeEmail(this.email).subscribe(
      (response) => {
        if (response.status === 0) {
          this.notifier.notify('success', response.message || 'Successfully subscribed to newsletter!');
          this.email = ''; // Clear the email field
        } else {
          this.notifier.notify('error', response.error || 'Failed to subscribe to newsletter');
        }
        this.isSubscribing = false;
        this.spinner.hide();
      },
      (error) => {
        console.error('Error subscribing to newsletter:', error);
        this.notifier.notify('error', 'An error occurred while subscribing');
        this.isSubscribing = false;
        this.spinner.hide();
      }
    );
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
