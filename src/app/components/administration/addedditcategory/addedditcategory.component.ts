import { Component, OnInit } from '@angular/core';
import { ArticleCategory } from 'src/app/models/ArticleCategory';
import { NotifierService } from 'angular-notifier';
import { ArticleCategoryService } from 'src/app/services/article-category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addedditcategory',
  templateUrl: './addedditcategory.component.html',
  styleUrls: ['./addedditcategory.component.css']
})
export class AddedditcategoryComponent implements OnInit {

  category: ArticleCategory = new ArticleCategory();
  edit: boolean = false;

  constructor(private notifier: NotifierService, 
              private articleCategoryService: ArticleCategoryService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      if (data["id"]) {
        this.edit = true;
        this.articleCategoryService.getArticleCategoryByID(+data["id"]).subscribe(categoryData => {
          this.category = categoryData;
        })
      }
    })
  }

  addEditCategory(){
    if (this.edit) {
      this.articleCategoryService.updateArticleCategory(this.category).subscribe(data => {
        if (data.status == 0) {
          this.notifier.notify('info', 'Category updated!');
          this.router.navigateByUrl('/administration/articlecategories');
        }
        else {
          this.notifier.notify('error', 'Error while updating category!');
        }
      })
    }
    else {
      this.articleCategoryService.insertArticleCategory(this.category).subscribe(data => {
        if (data.status == 0) {
          this.notifier.notify('info', 'Category inserted!');
          this.router.navigateByUrl('/administration/articlecategories');
        }
        else {
          this.notifier.notify('error', 'Error while inserting category!');
        }
      })
    }
  }

  validateInput(){
    if (!this.category.name || !this.category.description) {
      this.notifier.notify('error', 'Please insert necessary category data!');
      return;
    }

    this.addEditCategory();
  }

}
