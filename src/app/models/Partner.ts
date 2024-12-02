import { Country } from './Country';

export class Partner {
    id: number;
    name: string;
    description: string;
    website: string;
    countryID: number;
    country: Country;
    imagePath: string;
    isShown: number;
    studyAbroad: number;
    updated: Date;
    created: Date;
}