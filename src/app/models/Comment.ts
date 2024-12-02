import { User } from './User';

export class Comment {
    id: number; 
    userID: number; 
    articleID: number; 
    content: string; 
    updated: Date;
    created: Date;

    user: User = new User();
}