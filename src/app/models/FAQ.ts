import { FAQCategory } from './FAQCategory';

export class FAQ {
    id: number;
    faqCategoryID: number;
    faqTitle: string;
    faqContent: string;
    updated: Date;
    created: Date;
    faq_category: FAQCategory;
}