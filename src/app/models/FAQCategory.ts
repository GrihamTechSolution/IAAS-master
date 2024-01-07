import { FAQ } from './FAQ';

export class FAQCategory {
    id: number;
    title: string;
    description: string; 
    iconClass: string;
    updated: Date;
    created: Date;
    faqs: FAQ[];
}