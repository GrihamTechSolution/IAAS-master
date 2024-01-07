import { Region } from './Region';
import { CountryStatus } from './CountryStatus';
import { CountryCategory } from './CountryCategory';

export class Country {
    id: number; 
    name: string;
    regionID: number;
    statusID: number;
    categoryID: number;
    code: string;
    isActive: number;
    exchangeCoordinator: string;
    iaasEmail: string;
    photo: string;
    look: string;
    weather: string;
    placesToVisit: string;
    publicTransport: string;
    nationalDirector: string; 
    exproEmail: string;
    languages: string;
    currency: string;
    visaInfo: string;
    localCommittees: string;
    localActivities: string;
    internshipRequest: string;
    peopleCountry: string;
    updated: Date;
    created: Date;


    region: Region;
    country_status: CountryStatus = new CountryStatus();
    country_category: CountryCategory = new CountryCategory();
}