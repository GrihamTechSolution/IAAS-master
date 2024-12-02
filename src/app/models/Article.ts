import { fromEventPattern } from 'rxjs';
import { ArticleCategory } from './ArticleCategory';
import { Comment } from './Comment';
import { User } from './User';

export class Article {
    id: number;
    articleCategoryID: number;
    article_category: ArticleCategory;
    userID: number;
    status: number;
    title: string;
    imagePath: string;
    image: any;
    content: string = ''; // Initial value, if not editor shows undefined when started new article
    updated: Date;
    created: Date;

    comments: Comment[] = [];
    user: User = new User();
}