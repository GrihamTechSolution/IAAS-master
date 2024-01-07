import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Article } from 'src/app/models/Article';
import { ArticleCategoryService } from 'src/app/services/article-category.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-newsletter-generation-article-details',
  templateUrl: './newsletter-generation-article-details.component.html',
  styleUrls: ['./newsletter-generation-article-details.component.scss']
})
export class NewsletterGenerationArticleDetailsComponent implements OnInit {

  constructor(private articleCategoryService: ArticleCategoryService,
    // private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinner: Ng4LoadingSpinnerService) { }


  article: Article = new Article();

  apiUrl = environment.apiUrl;

  imageSource = environment.imageSource
  uploadImageSource = environment.uploadImageSource

  ids: string;
  ids_array: string[];

  articles: Article[] = [];
  selectedArticles: Article[] = [];

  currentDate: Date = new Date();

  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  ngOnInit(): void {
    // this.spinner.show();
    // this.activatedRoute.params.subscribe(params => {
    //   if (params['ids']) {
    //     this.ids = params['ids'];
    //     this.ids_array = this.ids.split('_');
    //     this.articleCategoryService.getArticles().subscribe(
    //       data => {
    //         this.articles = data;
    //         this.selectedArticles = this.articles.filter(item => this.ids.indexOf(item.id.toString()) > -1);

    //         for (let i = 0; i < this.selectedArticles.length; i++) {
    //           this.selectedArticles[i].content = this.removeIframes(this.selectedArticles[i].content);
    //         }

    //         $('#printButton').css('visibility', 'hidden');

    //         setTimeout(() => {
    //           $('img').css('display', 'block !important');
    //           $('img').css('max-height', '600px');
    //           $('img').css('width', 'auto');
    //           $('img').css('margin-left', '50%');
    //           $('img').css('margin-bottom', '20px');
    //           $('img').css('transform', 'translateX(-50%)');
    //           this.spinner.hide();
    //           window.print();
    //           $('#printButton').css('visibility', 'visible');
    //         }, 3000);
    //       }
    //     )
    //   }
    // })

    this.print();
  }

  removeIframes(content: string){
    while (content.indexOf('<figure class="media">') > -1) {

      let firstPart = content.substring(0, content.indexOf('<figure class="media">'));
      let secondPart = content.substring(content.indexOf('<figure class="media">') + 22);
      let middlePart = '<figure class="media">' + secondPart.substring(0, secondPart.indexOf('</figure>') + 9);
      
      let templink = middlePart.substring(middlePart.indexOf('data-oembed-url="') + 17);
      let link = templink.substring(0, templink.indexOf('"'));

      content = firstPart + '<p style="margin-bottom: 20px">' + link + '</p>' +  secondPart.substring(secondPart.indexOf('</figure>') + 9);
    }
    return content;
  }

  openPdf(){
    window.print();
  }

  print(){
    this.spinner.show();
    this.activatedRoute.params.subscribe(params => {
      if (params['ids']) {
        this.ids = params['ids'];
        this.ids_array = this.ids.split('_');
        // TODO: Maybe we can avoid goint to db every time
        this.articleCategoryService.getArticles().subscribe(
          data => {
            this.articles = data;
            this.selectedArticles = this.articles.filter(item => this.ids.indexOf(item.id.toString()) > -1);

            for (let i = 0; i < this.selectedArticles.length; i++) {
              this.selectedArticles[i].content = this.removeIframes(this.selectedArticles[i].content);
            }

            $('#printButton').css('visibility', 'hidden');

            setTimeout(() => {
              $('img').css('display', 'block !important');
              $('img').css('max-height', '600px');
              $('img').css('width', 'auto');
              $('img').css('margin-left', '50%');
              $('img').css('margin-bottom', '20px');
              $('img').css('transform', 'translateX(-50%)');
              this.spinner.hide();
              window.print();
              $('#printButton').css('visibility', 'visible');
            }, 3000);
          }
        )
      }
    })
  }

}



