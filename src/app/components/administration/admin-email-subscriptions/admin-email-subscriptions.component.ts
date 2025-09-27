import { Component, OnInit } from '@angular/core';
import { EmailSubscriptionService } from 'src/app/services/email-subscription.service';
import { EmailSubscription } from 'src/app/models/EmailSubscription';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NotifierService } from 'angular-notifier';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-email-subscriptions',
  templateUrl: './admin-email-subscriptions.component.html',
  styleUrls: ['./admin-email-subscriptions.component.scss']
})
export class AdminEmailSubscriptionsComponent implements OnInit {

  emailSubscriptions: EmailSubscription[] = [];
  filteredEmailSubscriptions: EmailSubscription[] = [];
  userData: any;

  // search params
  searchEmail: string = '';

  constructor(private emailSubscriptionService: EmailSubscriptionService,
              private spinner: Ng4LoadingSpinnerService,
              private notifier: NotifierService,
              private auth: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.spinner.show();
    
    let user = this.auth.getLoggedInUserData();
    if (!user) {
      this.router.navigateByUrl('/');
      return;
    }

    // Check if user has admin privileges (userTypeID 4 is admin)
    if (user.userTypeID !== 4) {
      this.router.navigateByUrl('/');
      return;
    }

    this.userData = user;
    this.loadEmailSubscriptions();
  }

  loadEmailSubscriptions(): void {
    this.emailSubscriptionService.getEmailSubscriptions().subscribe(
      (response) => {
        console.log(response);
        if (response.status === 0) {
          this.emailSubscriptions = response.data || [];
          this.filteredEmailSubscriptions = response.data || [];
        } else {
          this.notifier.notify('error', response.error || 'Failed to load email subscriptions');
        }
        this.spinner.hide();
      },
      (error) => {
        console.error('Error loading email subscriptions:', error);
        this.notifier.notify('error', 'Failed to load email subscriptions');
        this.spinner.hide();
      }
    );
  }

  filterEmailSubscriptions(): void {
    if (!this.searchEmail.trim()) {
      this.filteredEmailSubscriptions = this.emailSubscriptions;
    } else {
      this.filteredEmailSubscriptions = this.emailSubscriptions.filter(
        subscription => 
          subscription.email.toLowerCase().includes(this.searchEmail.toLowerCase())
      );
    }
  }

  deleteEmailSubscription(id: number): void {
    if (confirm('Are you sure you want to delete this email subscription?')) {
      this.spinner.show();
      this.emailSubscriptionService.deleteEmailSubscription(id).subscribe(
        (response) => {
          if (response.status === 0) {
              this.notifier.notify('success', response.message || 'Email subscription deleted successfully');
            this.loadEmailSubscriptions();
            } else {
              this.notifier.notify('error', response.error || 'Failed to delete email subscription');
              this.spinner.hide();
            }
        },
        (error) => {
          console.error('Error deleting email subscription:', error);
          this.notifier.notify('error', 'An error occurred while deleting the subscription');
          this.spinner.hide();
        }
      );
    }
  }

  toggleSubscriptionStatus(subscription: EmailSubscription): void {
    const newStatus = subscription.isActive === true ? false : true;
    const updatedSubscription = { ...subscription, isActive: newStatus };
    
    this.spinner.show();
    this.emailSubscriptionService.updateEmailSubscription(updatedSubscription).subscribe(
      (response) => {
        console.log(response);
        if (response.status === 0) {
          this.notifier.notify('success', response.message || 'Subscription status updated successfully');
          this.loadEmailSubscriptions();
        } else {
          this.notifier.notify('error', response.error || 'Failed to update subscription status');
          this.spinner.hide();
        }
      },
      (error) => {
        console.error('Error updating subscription status:', error);
        this.notifier.notify('error', 'An error occurred while updating the subscription');
        this.spinner.hide();
      }
    );
  }

  exportToCSV(): void {
    const csvContent = this.generateCSV();
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `email-subscriptions-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  private generateCSV(): string {
    const headers = ['ID', 'Email', 'Subscribed At', 'Status'];
    const rows = this.filteredEmailSubscriptions.map(subscription => [
      subscription.id,
      subscription.email,
      new Date(subscription.subscribedAt).toLocaleDateString(),
      subscription.isActive === true ? 'Active' : 'Inactive'
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  }

  trackBySubscriptionId(index: number, subscription: EmailSubscription): number {
    return subscription.id;
  }
}
