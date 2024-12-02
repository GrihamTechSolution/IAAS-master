export class Page{
    id: number;
    name: string;
    description: string;
    updated: Date;
    created: Date;

    pageArticleCategories: PageArticleCategory[] = [];
}

export class PageArticleCategory{
    id: number;
    pageID: number;
    articleCategoryID: number;
    updated: Date;
    created: Date;
}