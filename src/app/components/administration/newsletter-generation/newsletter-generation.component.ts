import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Article } from 'src/app/models/Article';
import { ArticleCategoryService } from 'src/app/services/article-category.service';
import { environment } from 'src/environments/environment';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-newsletter-generation',
  templateUrl: './newsletter-generation.component.html',
  styleUrls: ['./newsletter-generation.component.scss']
})
export class NewsletterGenerationComponent implements OnInit {

  constructor(private articleCategoryService: ArticleCategoryService, private modalService: BsModalService,
    private loadingSpinner: Ng4LoadingSpinnerService, private notifier: NotifierService,) { }

  dateOfStart: Date;
  dateOfEnd: Date;
  imageSource = environment.imageSource
  
  uploadImageSource = environment.uploadImageSource
  articles: Article[] = [];
  article: Article;
  articlesInNewsletter = [];

  @ViewChild('articleModal')
  articleModal: TemplateRef<any>;
  modalRef: BsModalRef;

  apiUrl = environment.apiUrl;

  selectedArticles: Article[] = [];
  currentDate: Date = new Date();

  @ViewChild('previewNewsletterElem')
  previewNewsletterElem: ElementRef;

  @ViewChild('previewNewsletterTable')
  previewNewsletterTable: ElementRef;

  ngOnInit(): void {
  }

  fetchArticles() {

    this.loadingSpinner.show();

    if (this.dateOfStart == null || this.dateOfEnd == null) {
      this.notifier.notify("error", "Please, fill in date of start and date of end!");
      this.loadingSpinner.hide();
      return;
    }

    this.articleCategoryService.getArticleByTimerange(this.dateOfStart, this.dateOfEnd).subscribe(
      data => {
        this.articles = data;
        this.loadingSpinner.hide();
        // this.articles.forEach(elem => {
        //   this.convertImagetoBase64('https://i.picsum.photos/id/0/5616/3744.jpg?hmac=3GAAioiQziMGEtLbfrdbcoenXoWAW-zlyEAMkfEdBzQ', (b64Img) => {
        //     elem.image = b64Img;
        //   });
        // });
      },
      error => { console.log(error); this.loadingSpinner.hide(); }

    )
  }

  convertImagetoBase64(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  showDetails(item) {
    this.article = item;
    this.modalRef = this.modalService.show(this.articleModal);
  }

  contains(id) {
    return this.articlesInNewsletter.indexOf(id) > -1;
  }

  addRemoveArticleId(id) {
    if (this.articlesInNewsletter.indexOf(id) > -1)
      this.articlesInNewsletter.splice(this.articlesInNewsletter.indexOf(id), 1);
    else
      this.articlesInNewsletter.push(id);

    // console.log(this.articlesInNewsletter);
  }

  // previewNewsletter() {
  //   if (this.articles && this.articles.length > 0)
  //   {
  //     this.selectedArticles = this.articles.filter(item => this.articlesInNewsletter.indexOf(item.id) > -1);
  //   }
  // }

  generateNewsletter() {
    if (!this.articlesInNewsletter || this.articlesInNewsletter.length == 0)
      this.notifier.notify('error', 'Please, select articles!');
    else
      window.open('/newslettergeneration/preview/' + this.articlesInNewsletter.join('_'), '_blank');
  }

}
