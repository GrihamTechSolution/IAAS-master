import { Partner } from './Partner';

import { StudyAbroadImage } from './StudyAbroadImage';

export class StudyAbroadProgram {
    id: number; 
    partnerID: number; 
    title: string; 
    description: string; 
    videoLink: string; 
    applyLink: string; 
    siteLink: string; 
    // This was needed because of ck editor
    about: string = null; 
    location: string;
    updated: Date; 
    created: Date;

    partner: Partner;
    images: StudyAbroadImage[];
}