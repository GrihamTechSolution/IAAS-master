import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Article } from 'src/app/models/Article';
import { ArticleCategoryService } from 'src/app/services/article-category.service';

@Component({
  selector: 'app-my-blog',
  templateUrl: './my-blog.component.html',
  styleUrls: ['./my-blog.component.scss']
})
export class MyBlogComponent implements OnInit {

  articles: Article[] = [];

  constructor(private notifier: NotifierService,
    private articleService: ArticleCategoryService,
    private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('iaas-user'))
      this.articleService.getArticleByUserID(JSON.parse(localStorage.getItem('iaas-user')).id).subscribe(data => {
        this.articles = data;
      })
    else
      this.router.navigateByUrl('/');
  }

  deleteArticle(id: number) {
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
