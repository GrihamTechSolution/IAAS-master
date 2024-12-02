import { Region } from './Region';
import { VotingQuestion } from './VotingQuestion';

export class VotingType {
    id: number;
    name: string;
    description: string;
    updated: Date;
    created: Date;
}

export class Voting {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
    dateOfStart: Date;
    dateOfEnd: Date;
    votingTypeID: number;
    regionID: number;

    // createdBy: number;
    created: Date;
    // updatedBy: number;
    updated: Date;

    region: Region;
    votingQuestions: VotingQuestion[];
    votingType: VotingType;
}
