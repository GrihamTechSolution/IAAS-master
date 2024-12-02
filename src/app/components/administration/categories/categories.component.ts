import { Component, OnInit } from '@angular/core';
import { ArticleCategory } from 'src/app/models/ArticleCategory';
import { ArticleCategoryService } from 'src/app/services/article-category.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories : ArticleCategory[] = [];

  constructor(private articleCategoryService: ArticleCategoryService, 
              private notifier: NotifierService) { }

  ngOnInit() {
    this.articleCategoryService.getArticleCategories().subscribe(data => {
      this.categories = data;
    })
  }

  deleteArticleCategory(id:number) {
    if (confirm("Are you sure?")) {
      this.articleCategoryService.deleteArticleCategory(id).subscribe(data => {
        if (data.status == 0) {
          this.notifier.notify('info', 'Article Category deleted!');
          this.ngOnInit();
        }
        else {
          this.notifier.notify('error', 'Error while updating article category!');
        }
      })
    }
  }

}
