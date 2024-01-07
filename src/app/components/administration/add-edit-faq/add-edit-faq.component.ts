import { Component, OnInit } from '@angular/core';
import { FAQ } from 'src/app/models/FAQ';
import { Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NotifierService } from 'angular-notifier';
import { FaqService } from 'src/app/services/faq.service';
//import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as ClassicEditor from 'src/ckeditor/ckeditor';
import { environment } from 'src/environments/environment';
import { FAQCategory } from 'src/app/models/FAQCategory';
import { FaqCategoryService } from 'src/app/services/faq-category.service';

@Component({
  selector: 'app-add-edit-faq',
  templateUrl: './add-edit-faq.component.html',
  styleUrls: ['./add-edit-faq.component.scss']
})
export class AddEditFaqComponent implements OnInit {

  faq: FAQ = new FAQ();
  faqCategories: FAQCategory[] = [];
  edit: boolean = false;
  public Editor = ClassicEditor;

  // Change: Custom ckeditor needs custom configuration
  ckconfig: any = {
    alignment: {
      options: ['left', 'right', 'center']
    },
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'alignment:left', 'alignment:center', 'alignment:right', '|',
        'imageUpload',
        'insertTable',
        'mediaEmbed',
        'blockQuote',
        'undo',
        'redo',
      ]
    },
    image: {
      toolbar: [
        'imageTextAlternative'
      ]
    },
    mediaEmbed: {
      previewsInData: true
    },
    // This is how we can define simple uploader, no need to define custom uploader like you did in Article Management
    simpleUpload: {
      // The URL that the images are uploaded to.
      uploadUrl: `${environment.apiUrl}/upload`,

      // Enable the XMLHttpRequest.withCredentials property.
      withCredentials: false,

    },
  };

  constructor(private router: Router,
    private loadingSpinner: Ng4LoadingSpinnerService,
    private notifier: NotifierService,
    private faqService: FaqService,
    private activatedRoute: ActivatedRoute,
    private faqCategoryService: FaqCategoryService) { }

  ngOnInit(): void {

    this.loadingSpinner.show();

    this.faqCategoryService.getFAQCategories().subscribe(data => {
      this.faqCategories = data;
      this.activatedRoute.params.subscribe(params => {
        if (params['id']) {
          this.edit = true;
          this.faqService.getFAQByID(params['id']).subscribe(data => {
            this.faq = data;
            this.loadingSpinner.hide();
          })
        }
        else {
          this.faq.faqContent = " ";
          this.loadingSpinner.hide();
        }
      })
    })
  }

  validateInput() {

    if (!this.faq.faqContent || !this.faq.faqTitle || !this.faq.faqCategoryID) {
      this.notifier.notify("error", "Please insert all FAQ data!");
      return;
    }

    this.addEditFAQ();
  }

  addEditFAQ() {
    this.loadingSpinner.show();

    if (this.edit) {
      this.faqService.updateFAQ(this.faq).subscribe(data => {
        this.loadingSpinner.hide();
        if (data.status == 0) {
          this.notifier.notify("success", "FAQ updated!");
          this.router.navigateByUrl('/administration/faqs');
        }
        else {
          this.notifier.notify("error", "Error while updating faq");
        }
      })
    }
    else {
      this.faqService.insertFAQ(this.faq).subscribe(data => {
        this.loadingSpinner.hide();
        if (data.status == 0) {
          this.notifier.notify("success", "FAQ inserted!");
          this.router.navigateByUrl('/administration/faqs');
        }
        else {
          this.notifier.notify("success", "Error while inserting faq!");
        }
      })
    }
  }

}
