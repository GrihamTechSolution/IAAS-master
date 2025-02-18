import { User } from "./User";

export class Events {
    id: number;
    dateLocation: string;
    userID: number;
    status: number;
    title: string;
    imagePath: string;
    image: any;
    content: string = ''; // Initial value, if not editor shows undefined when started new article
    updated: Date;
    created: Date;
    type: string;
    user: User = new User();
}