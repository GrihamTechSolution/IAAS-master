import { Application } from './Application';
import { User } from './User';

export class Student {
    id: number;
    userID: number;
    imagePath: string;
    bioPath: string;
    proofPath: string;
    phoneNumber: string;
    university: string;
    ecName: string;
    ecSurname: string;
    ecAddress: string;
    ecEmail: string;
    ecRelation: string;
    ecPhone: string;
    healthIssues: string;
    iaasMember: number;
    infoAboutExpro: number;
    emails:number;
    biography: string;
    linkedIn: string;
    updated: Date;
    created: Date;

    user: User = new User();

}