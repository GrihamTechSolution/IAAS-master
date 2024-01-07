import { OPTakerContact } from './OPTakerContact';
import { Country } from './Country';
import { User } from './User';

export class OPTaker {
    id: number;
    userID: number;
    name: string;
    logo: string;
    opTakerType: string;
    website: string;
    region: string;
    town: string;
    aboutUs: string;
    fbLink: string;
    lkLink: string;
    twLink: string;
    igLink: string;
    updated: Date;
    created: Date;
    
    contacts: OPTakerContact[] = [];
    country: Country = new Country();
    user: User = new User();
}