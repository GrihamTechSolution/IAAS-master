import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ArticleCategory } from '../models/ArticleCategory';
import { OperationResponse } from '../models/OperationResponse';
import { Article } from '../models/Article';
import { Page } from '../models/Page';

@Injectable({
  providedIn: 'root'
})
export class ArticleCategoryService {

  apiUrl = environment.apiUrl + '/articleCategory';
  articleApiUrl = environment.apiUrl + '/article';
  commentApiUrl = environment.apiUrl + '/comment';

  constructor(private http: HttpClient) { }

  public getArticleCategories() {
    return this.http.get<ArticleCategory[]>(this.apiUrl);
  }

  public getArticleCategoryByID(id: number) {
    return this.http.get<ArticleCategory>(`${this.apiUrl}/${id}`);
  }

  public getArticleCategoriesByPage(pageName: string) {
    return this.http.get<Page>(`${environment.apiUrl}/page/${pageName}/articleCategory`);
  }

  public insertArticleCategory(articleCategory) {
    return this.http.post<OperationResponse>(this.apiUrl, articleCategory);
  }

  public updateArticleCategory(articleCategory) {
    return this.http.put<OperationResponse>(this.apiUrl, articleCategory);
  }

  public deleteArticleCategory(id: number) {
    return this.http.delete<OperationResponse>(`${this.apiUrl}/${id}`);
  }

  public getArticles() {
    return this.http.get<Article[]>(this.articleApiUrl);
  }

  public getArticleByID(id: number) {
    return this.http.get<Article>(`${this.articleApiUrl}/${id}`);
  }

  public getArticleByUserID(userID: number) {
    return this.http.get<Article[]>(`${this.articleApiUrl}/getByUser/${userID}`);
  }

  public insertArticle(article) {
    return this.http.post<OperationResponse>(this.articleApiUrl, article);
  }

  public updateArticle(article) {
    return this.http.put<OperationResponse>(this.articleApiUrl, article);
  }

  public deleteArticle(id: number) {
    return this.http.delete<OperationResponse>(`${this.articleApiUrl}/${id}`);
  }

  public insertComment(comment) {
    return this.http.post<OperationResponse>(this.commentApiUrl, comment);
  }

  public deleteComment(id: number) {
    return this.http.delete<OperationResponse>(`${this.commentApiUrl}/${id}`);
  }

  public getArticlesForContentHub(){
    return this.http.get<Article[]>(`${this.articleApiUrl}/contentHub/getAll`);
  }

  public getArticleByTimerange(from: Date, to: Date) {
    return this.http.post<Article[]>(`${this.articleApiUrl}/getByTimerange`, { from, to });
  }

}
