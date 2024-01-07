import { Country } from './Country';

export class Sponsor {
    id: number;
    name: string;
    description: string;
    countryID: number;
    isShown: number;
    website:string;
    updated: Date;
    created: Date;
    imagePath: string;

    country: Country = new Country();
}