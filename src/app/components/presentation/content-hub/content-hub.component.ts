import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { forkJoin } from 'rxjs';
import { Article } from 'src/app/models/Article';
import { ArticleCategory } from 'src/app/models/ArticleCategory';
import { Page, PageArticleCategory } from 'src/app/models/Page';
import { ArticleCategoryService } from 'src/app/services/article-category.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-content-hub',
  templateUrl: './content-hub.component.html',
  styleUrls: ['./content-hub.component.scss']
})
export class ContentHubComponent implements OnInit {

  categories: ArticleCategory[] = [];
  articles: Article[] = [];
  contentHubArticles: Article[] = [];
  apiUrl = environment.apiUrl;
  categoryCounter: number = 0;
  page: Page;

  imageSource = environment.imageSource
  uploadImageSource = environment.uploadImageSource

  constructor(private articleCategoryService: ArticleCategoryService,
    private router: Router,
    private spinner: Ng4LoadingSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();

    let categoriesObs = this.articleCategoryService.getArticleCategories();
    let articlesObs = this.articleCategoryService.getArticles();
    let contentHubArticlesObs = this.articleCategoryService.getArticlesForContentHub();
    // TODO: Maybe this could be solved by minimizing db calls
    let pageArticleCategoriesObs = this.articleCategoryService.getArticleCategoriesByPage('content_hub');

    forkJoin([categoriesObs, articlesObs, contentHubArticlesObs, pageArticleCategoriesObs]).subscribe(data => {
      // this.categories = data[0];
      // Make the latest first
      this.categories.forEach(category => category.articles.reverse());
      // Status filters added
      // Sort changed, latest should be first
      this.articles = data[1].filter(item => item && item.status == 1).sort((a1, a2) => a2.id - a1.id);
      this.contentHubArticles = data[2].filter(item => item && item.status == 1);
      this.page = data[3];
      this.filterCategories(data[0], this.page.pageArticleCategories);
      this.spinner.hide();
    })
  }

  showArticle(id) {
    this.router.navigateByUrl(`/contentHub/${id}`);
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
