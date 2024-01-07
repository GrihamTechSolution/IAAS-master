import { Country } from './Country';
import { InternshipImage } from './InternshipImage';
import { OPTaker } from './OPTaker';

export class Internship {
    id: number;
    countryID: number;
    opTakerID: number;
    name: string;
    description: string;

    food: number;
    mealsPerDay: number;
    accomodation: number;
    gender: number;
    workingHours: number;
    workingHoursPerWeek: number;
    spotAvailability: string;
    studentsNumber: number;
    duration: number;
    backgroundFields: string;
    languages: string;
    salary: number;
    salaryInfo: number;
    minLength: number;
    maxLength: number;
    contract: number;
    littleExperience: number;
    drivingLicence: number;
    drivingTractor: number;
    fit: number;
    other: string;
    socialAspects: string;
    updated: Date;
    created: Date;
    typeID: number;
    firstImagePath: string;
    isFeatured: number;
    isShown: number = 1;
    backgrounds: string;

    backgroundFieldsArr: any[] = [];
    languagesArr: any[] = [];
    images: InternshipImage[] = [];

    country: Country;
    op_taker: OPTaker;
}