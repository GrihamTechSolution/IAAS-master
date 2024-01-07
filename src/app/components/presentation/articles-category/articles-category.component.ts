import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Article } from 'src/app/models/Article';
import { ArticleCategory } from 'src/app/models/ArticleCategory';
import { PageArticleCategory } from 'src/app/models/Page';
import { ArticleCategoryService } from 'src/app/services/article-category.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-articles-category',
  templateUrl: './articles-category.component.html',
  styleUrls: ['./articles-category.component.scss']
})
export class ArticlesCategoryComponent implements OnInit {

  articles: Article[] = [];
  apiUrl = environment.apiUrl;
  categoryID: number = 0;
  category: ArticleCategory = new ArticleCategory();
categories: ArticleCategory[] = [];
  showCategories: boolean = true;

  uploadImageSource = environment.uploadImageSource

  constructor(private articlesService: ArticleCategoryService, 
              private router: Router, 
              private loadingSpinner: Ng4LoadingSpinnerService, 
              private activatedRoute: ActivatedRoute,
              private articleCategoryService: ArticleCategoryService) { }

  ngOnInit(): void {
    this.loadingSpinner.show();

    this.articleCategoryService.getArticleCategories().subscribe(
      data => {
        this.articleCategoryService.getArticleCategoriesByPage('content_hub').subscribe(page => {
          this.filterCategories(data, page.pageArticleCategories);
        });
      },
      error => console.log(error)
    );

    this.activatedRoute.params.subscribe(data => {
      if (data['id']) {
        this.categoryID = +data['id'];

        if(this.categoryID == environment.alumniCategoryID)
          this.showCategories = false;

        this.articlesService.getArticles().subscribe(data => {
          this.articles = data.sort((a1, a2) => a2.id - a1.id).filter(item => item.status == 1);
          if (this.categoryID != 0) {
            // Filter for status added
            this.articles = data.filter(a => a.articleCategoryID == this.categoryID && a.status == 1);

            this.articlesService.getArticleCategoryByID(this.categoryID).subscribe(cat => {
              this.category = cat;
            })
          }
          
          this.loadingSpinner.hide();
        })


      }
      else {
        this.router.navigateByUrl('/contentHub');
      }
    })
  }

  showCategory(id) {
    this.router.navigateByUrl(`/contentHub/category/${id}`);
  }

  filterCategories(categories: ArticleCategory[], pageCategories: PageArticleCategory[]) {
    let pageCategoryIDs: number[] = [];
    pageCategoryIDs = pageCategories.map(item => item.articleCategoryID);
    categories.forEach(category => {
      if (pageCategoryIDs.indexOf(category.id) > -1)
        this.categories.push(category);
    })
  }


}
