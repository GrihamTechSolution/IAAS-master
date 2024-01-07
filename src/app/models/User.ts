import { OPTaker } from './OPTaker';
import { Country } from './Country';
import { UserType } from './UserType';
import { Region } from './Region';
import { Application } from './Application';

export class User {
    id: number;
    email: string;
    password: string;
    hashedPassword: string;
    userTypeID: number;
    countryID: number;
    firstName: string;
    lastName: string;
    confirmPassword: string;
    isActive: number;
    newPassword: string;
    regionID: number;
    changedPass: number;
    originalCountryCode: string;
    countryName: string;

    // opTaker: OPTaker = new OPTaker();
    country: Country = new Country();
    user_type: UserType = new UserType();
    region: Region = new Region();
    applications: Application[] = [];
}