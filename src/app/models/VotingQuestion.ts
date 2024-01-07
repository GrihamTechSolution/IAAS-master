import { Voting } from "./Voting";
import { VotingQuestionOption } from "./VotingQuestionOption";

export class VotingQuestionType {
    id: number;
    name: string;
    description: string;
    updated: Date;
    created: Date;
}

export class VotingQuestion {
    id: number;
    votingID: number;
    votingQuestionTypeID: number;
    question: string;

    voting: Voting;

    updated: Date;
    created: Date;

    votingQuestionOptions: VotingQuestionOption[] = [];

    // TODO: Does this make sense
    votingQuestionAnswerID: number;
    votingQuestionAnswers: boolean[] = [];
    votingQuestionAnswer: string;

}