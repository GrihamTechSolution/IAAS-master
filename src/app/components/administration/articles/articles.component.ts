import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/Article';
import { ArticleCategoryService } from 'src/app/services/article-category.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles: Article[] = [];

  constructor(private notifier: NotifierService,
              private articleService: ArticleCategoryService) { }

  ngOnInit() {
    this.articleService.getArticles().subscribe(data => {
      this.articles = data;
    })
  }

  deleteArticle(id:number) {
    if (confirm("Are you sure?")) {
      this.articleService.deleteArticle(id).subscribe(data => {
        if (data.status == 0) {
          this.notifier.notify('info', 'Article deleted!');
          this.ngOnInit();
        }
        else {
          this.notifier.notify('error', 'Error while deleting article!');
        }
      })
    }
  }

}
