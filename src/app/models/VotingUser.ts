import { User } from "./User";
import { Voting } from "./Voting";

export class VotingUser{
    id: number;
    votingID: number;
    userID: number;
    updated: Date;
    created: Date;

    voting: Voting;
    user: User;
}