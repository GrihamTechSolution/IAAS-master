import { Article } from './Article';

export class ArticleCategory {
    id: number;
    name: string;
    description: string;
    articles: Article[];
    updated: Date;
    created: Date;
}