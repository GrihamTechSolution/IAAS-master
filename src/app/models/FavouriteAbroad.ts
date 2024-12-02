import { StudyAbroadProgram } from './StudyAbroadProgram';

export class FavouriteAbroad {
    id: number; 
    userID: number; 
    studyAbroadID: number; 
    updated: Date; 
    created: Date;

    study_abroad_program: StudyAbroadProgram;
}