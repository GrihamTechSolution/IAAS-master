import { Component, OnInit } from '@angular/core';
import { FAQCategory } from 'src/app/models/FAQCategory';
import { FaqCategoryService } from 'src/app/services/faq-category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-add-edit-faq-category',
  templateUrl: './add-edit-faq-category.component.html',
  styleUrls: ['./add-edit-faq-category.component.scss']
})
export class AddEditFaqCategoryComponent implements OnInit {

  faqCategory: FAQCategory = new FAQCategory();
  edit: boolean = false;

  constructor(private faqCategoryService: FaqCategoryService,
              private activatedRoute: ActivatedRoute, 
              private loadingSpinner: Ng4LoadingSpinnerService,
              private notifier: NotifierService, 
              private router: Router) { }

  ngOnInit(): void {
    this.loadingSpinner.show();

    this.activatedRoute.params.subscribe(params => {
      if (params['id']){
        this.edit = true;
        this.faqCategoryService.getFAQCategoryByID(params['id']).subscribe(data => {
          this.faqCategory = data;
          this.loadingSpinner.hide();
        })
      }
      else {
        this.loadingSpinner.hide();
      }
    })

  }

  addEditFAQCategory(){
    this.loadingSpinner.show();

    if (this.edit) {
      this.faqCategoryService.updateFAQCategory(this.faqCategory).subscribe(data => {
        this.loadingSpinner.hide();
        if (data.status == 0) {
          this.notifier.notify("info", "FAQ Category updated!");
          this.router.navigateByUrl('/administration/faqcategories');
        }
        else {
          this.notifier.notify("error", "Error while updating FAQ Category");
        }
      })
    }
    else {
      this.faqCategoryService.insertFAQCategory(this.faqCategory).subscribe(data => {
        this.loadingSpinner.hide();
        if (data.status == 0) {
          this.notifier.notify("info", "FAQ Category inserted!");
          this.router.navigateByUrl('/administration/faqcategories');
        }
        else {
          this.notifier.notify("error", "Error while inserting FAQ Category");
        }
      })
    }
  }

  validateInput(){
    if (!this.faqCategory.title || 
        !this.faqCategory.description || 
        !this.faqCategory.iconClass) {
      this.notifier.notify("error", "Please insert all category data!");
      return;
    }
    
    this.addEditFAQCategory();
  }

}
