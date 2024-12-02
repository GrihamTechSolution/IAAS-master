import { Component, OnInit } from '@angular/core';
import { FAQCategory } from 'src/app/models/FAQCategory';
import { FaqCategoryService } from 'src/app/services/faq-category.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-faq-categories',
  templateUrl: './faq-categories.component.html',
  styleUrls: ['./faq-categories.component.scss']
})
export class FaqCategoriesComponent implements OnInit {

  faqCategories: FAQCategory[] = [];

  constructor(private faqCategoryService: FaqCategoryService,
              private loadingSpinner: Ng4LoadingSpinnerService,
              private notifier: NotifierService) { }

  ngOnInit(): void {
    this.loadingSpinner.show();

    this.faqCategoryService.getFAQCategories().subscribe(data => {
      this.faqCategories = data;
      this.loadingSpinner.hide();
    })
  }

  deleteFAQCategory(id:number){
    if (confirm("Are you sure?")){
      this.loadingSpinner.show();

      this.faqCategoryService.deleteFAQCategory(id).subscribe(data => {
        if (data.status == 0){
          this.notifier.notify("info", "FAQ Category succesfully deleted!");
          this.ngOnInit();
        }
        else {
          this.notifier.notify("error", "Error while deleting FAQ Category!");
        }
        this.loadingSpinner.hide();
      })
    }
  }

}
