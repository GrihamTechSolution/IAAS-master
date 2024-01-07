import { Component, OnInit } from '@angular/core';
import { FAQ } from 'src/app/models/FAQ';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';
import { FaqService } from 'src/app/services/faq.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent implements OnInit {

  faqs: FAQ[] = [];

  constructor(private loadingSpinner: Ng4LoadingSpinnerService,
              private router: Router,
              private faqService: FaqService,
              private notifierService: NotifierService) { }

  ngOnInit(): void {
    this.loadingSpinner.show();

    this.faqService.getFaqs().subscribe(data => {
      this.faqs = data;
      this.loadingSpinner.hide();
    })
  }

  deleteFAQ(id: number){
    if (confirm("Are you sure?")) {
      this.loadingSpinner.show();

      this.faqService.deleteFAQ(id).subscribe(data => {
        if (data.status == 0) {
          this.notifierService.notify("success", "FAQ deleted!");
        }
        else {
          this.notifierService.notify("error", "Error while deleting FAQ!");
        }
        this.loadingSpinner.hide();
        this.ngOnInit();
      })
    }
  }

}
