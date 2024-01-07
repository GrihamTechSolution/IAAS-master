import { VotingQuestion } from "./VotingQuestion";
import { VotingQuestionOption } from "./VotingQuestionOption";

export class VotingAnswer{
    id: number;
    votingQuestionID: number;
    votingQuestionOptionID: number;
    answer: string;

    updated: Date;
    created: Date;

    votingQuestion: VotingQuestion;
    votingQuestionOption: VotingQuestionOption;
}