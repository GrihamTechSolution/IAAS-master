import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Article } from 'src/app/models/Article';
import { ArticleCategory } from 'src/app/models/ArticleCategory';
import { ArticleCategoryService } from 'src/app/services/article-category.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-alumni',
  templateUrl: './alumni.component.html',
  styleUrls: ['./alumni.component.scss']
})
export class AlumniComponent implements OnInit {

  apiUrl = environment.apiUrl;
  articles: Article[] = [];
  category: ArticleCategory;
  alumniCategoryID = environment.alumniCategoryID;
  imageSource = environment.imageSource
  uploadImageSource = environment.uploadImageSource

  constructor(private articleCategoryService: ArticleCategoryService,
    private loadingSpinner: Ng4LoadingSpinnerService,) { }

  ngOnInit(): void {

    this.articleCategoryService.getArticles().subscribe(data => {

      data = data.filter(a => a.articleCategoryID == this.alumniCategoryID && a.status == 1);

      data = data.sort((a1, a2) => a2.id - a1.id).filter(item => item.status == 1);

      if (data[0]) this.articles.push(data[0]);
      if (data[1]) this.articles.push(data[1]);
      if (data[2]) this.articles.push(data[2]);
      if (data[3]) this.articles.push(data[3]);

      this.articleCategoryService.getArticleCategoryByID(this.alumniCategoryID).subscribe(cat => {
        this.category = cat;
      })

      this.loadingSpinner.hide();
    })
  }

}
