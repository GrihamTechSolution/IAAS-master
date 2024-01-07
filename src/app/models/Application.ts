import { NumberValueAccessor } from '@angular/forms';
import { User } from './User';
import { Internship } from './Internship';
import { ApplicationStep } from './ApplicationStep';

export class Application {
    id: number;
    userID: number;
    internshipID: number;
    step: number;
    motivationalLetter: string;
    updated: Date;
    created: Date;
    steps: ApplicationStep[] = [];
    status: number;
    from: string; 
    to: string;

    user: User = new User();
    internship: Internship = new Internship();
}