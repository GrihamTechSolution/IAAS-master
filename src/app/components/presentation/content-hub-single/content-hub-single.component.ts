import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Article } from 'src/app/models/Article';
import { ArticleCategoryService } from 'src/app/services/article-category.service';
import { environment } from 'src/environments/environment';
import { Comment } from 'src/app/models/Comment';
import { NotifierService } from 'angular-notifier';
import { UserService } from 'src/app/services/user.service';
import { cpuUsage } from 'process';
import { FavouriteBlogService } from 'src/app/services/favourite-blog.service';
import { FavouriteBlog } from 'src/app/models/FavouriteBlog';

@Component({
  selector: 'app-content-hub-single',
  templateUrl: './content-hub-single.component.html',
  styleUrls: ['./content-hub-single.component.scss'],
})
export class ContentHubSingleComponent implements OnInit {
  article: Article = new Article();
  apiUrl = environment.apiUrl;
  comment: Comment = new Comment();
  currentUserID;
  currentUserTypeID;
  recentPost: Article[] = [];
  hasItInFavourite: boolean = false;
  favouriteBlogs: FavouriteBlog[] = [];
  imageSource = environment.imageSource;
  uploadImageSource = environment.uploadImageSource;
  domainUrl = environment.domainUrl;

  constructor(
    private router: Router,
    private articleCategoryService: ArticleCategoryService,
    private loadingSpinner: Ng4LoadingSpinnerService,
    private activatedRoute: ActivatedRoute,
    private notifier: NotifierService,
    private auth: UserService,
    private favouriteBlogService: FavouriteBlogService
  ) {}

  ngOnInit(): void {
    this.loadingSpinner.show();

    let userData = this.auth.getLoggedInUserData();
    if (userData) {
      this.currentUserTypeID = userData.userTypeID;
      this.currentUserID = userData.id;
    }

    this.activatedRoute.params.subscribe(data => {
      if (data['id']) {
        this.articleCategoryService
          .getArticleByID(data['id'])
          .subscribe(art => {
            art.content = art.content.replace(
              /https:\/\/iaas-world-space-prd\.ams3\.digitaloceanspaces\.com\/uploads\//g,
              'https://iaas.blr1.digitaloceanspaces.com/uploads/'
            );
            this.article = art;

            this.articleCategoryService.getArticles().subscribe(
              articles => {
                this.recentPost = [];
                articles = articles
                  .filter(item => item.status == 1 && item.id != data['id'])
                  .sort((a1, a2) => a2.id - a1.id);
                /// Please, be elegant!
                if (articles[0]) this.recentPost.push(articles[0]);
                if (articles[1]) this.recentPost.push(articles[1]);
                if (articles[2]) this.recentPost.push(articles[2]);
              },
              error => console.log(error)
            );

            if (this.currentUserID) {
              this.favouriteBlogService
                .getFavouriteBlogForUser(this.currentUserID)
                .subscribe(favs => {
                  this.favouriteBlogs = favs;
                  let result = this.favouriteBlogs.filter(
                    e => e.articleID == this.article.id
                  );
                  if (result.length > 0) {
                    this.hasItInFavourite = true;
                  }
                });
            }

            this.loadingSpinner.hide();
          });
      } else {
        this.loadingSpinner.hide();
        this.router.navigateByUrl('/contentHub');
      }
    });
  }

  addComment() {
    if (!this.comment.content) {
      this.notifier.notify('error', 'Please insert comment !');
      return;
    }

    let userData = this.auth.getLoggedInUserData();
    if (!userData) {
      this.router.navigateByUrl('/contentHub');
    }

    this.comment.articleID = this.article.id;
    this.comment.userID = userData.id;

    this.loadingSpinner.show();

    this.articleCategoryService.insertComment(this.comment).subscribe(data => {
      if (data.status == 0) {
        this.notifier.notify('success', 'Comment added!');
        this.comment = new Comment();
        this.loadingSpinner.hide();
        this.ngOnInit();
      } else {
        this.notifier.notify('error', 'Error while adding comment!');
        this.loadingSpinner.hide();
      }
    });
  }

  deleteComment(id) {
    if (confirm('Are you sure you want to delete the comment?')) {
      this.loadingSpinner.show();
      this.articleCategoryService.deleteComment(id).subscribe(data => {
        if (data.status == 0) {
          this.notifier.notify('success', 'Comment deleted!');
          this.loadingSpinner.hide();
          this.ngOnInit();
        } else {
          this.notifier.notify('error', 'Error while deleting comment!');
          this.loadingSpinner.hide();
        }
      });
    }
  }

  saveToFavourites() {
    this.loadingSpinner.show();
    let favouriteBlog = new FavouriteBlog();
    favouriteBlog.articleID = this.article.id;
    favouriteBlog.userID = this.currentUserID;

    this.favouriteBlogService
      .insertFavouriteBlog(favouriteBlog)
      .subscribe(data => {
        if (data.status == 0) {
          this.notifier.notify('success', 'Added to Favourites!');
          this.favouriteBlogService
            .getFavouriteBlogForUser(this.currentUserID)
            .subscribe(favs => {
              this.favouriteBlogs = favs;
              this.loadingSpinner.hide();
              this.hasItInFavourite = true;
            });
        } else {
          this.notifier.notify(
            'error',
            'Error while adding article to Favourites'
          );
          this.loadingSpinner.hide();
        }
      });
  }

  removeFromFavourites() {
    this.loadingSpinner.show();
    let id = this.favouriteBlogs.filter(e => e.articleID == this.article.id)[0]
      .id;
    this.favouriteBlogService.deleteFavouriteBlog(id).subscribe(data => {
      if (data.status == 0) {
        this.notifier.notify('success', 'Removed from Favourites!');
        this.hasItInFavourite = false;
        this.loadingSpinner.hide();
      } else {
        this.notifier.notify('error', 'Error while adding to Favourites');
        this.loadingSpinner.hide();
      }
    });
  }
}
