import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { forkJoin, Observable } from 'rxjs';
import { Voting } from 'src/app/models/Voting';
import { VotingAnswer } from 'src/app/models/VotingAnswer';
import { UserService } from 'src/app/services/user.service';
import { VotingAnswerService } from 'src/app/services/voting-answer.service';
import { VotingUserService } from 'src/app/services/voting-user.service';
import { VotingService } from 'src/app/services/voting.service';

@Component({
  selector: 'app-do-voting',
  templateUrl: './do-voting.component.html',
  styleUrls: ['./do-voting.component.scss']
})
export class DoVotingComponent implements OnInit {

  userData: any;
  voting: Voting = new Voting;
  //votingQuestions: VotingQuestion[] = [];
  votingAnswers: VotingAnswer[] = [];
  canVote: boolean = true;
  errorMessage: string;
  votingCompleted: boolean = false;
  successMessage: string;

  constructor(private votingService: VotingService,
    //private votingQuestionService: VotingQuestionService,
    //private votingQuestionOptionService: VotingQuestionOptionService,
    private activatedRoute: ActivatedRoute,
    //private router: Router,
    private loadingSpinner: Ng4LoadingSpinnerService,
    //private notifier: NotifierService, 
    private auth: UserService,
    private votingUserService: VotingUserService,
    private votingAnswerService: VotingAnswerService) { }

  private submitVotingObs: any[] = [];

  ngOnInit(): void {
    let user = this.auth.getLoggedInUserData();

    // TODO: If date is not ok, maybe status


    // TODO: Uncomment
    if (!user) {
      this.canVote = false;
      this.errorMessage = "Please log in and then visit vote url!"
    }

    if (user != null)
      this.auth.getUserData(user.id).subscribe(data => {
        this.userData = data;



        // TODO: Uncomment
        if (this.userData.userTypeID != '5') {
          this.canVote = false;
          this.errorMessage = "Just National Directors can participate in votings!";
        }

        this.activatedRoute.params.subscribe(params => {
          if (params['id']) {
            this.votingService.getVotingByID(params['id']).subscribe(data => {
              this.voting = data;

              // TODO: If user already voted

              if (this.voting && this.voting.id && this.userData && this.userData.id)
                this.votingUserService.getVotingUser(this.voting.id, this.userData.id).subscribe(data => {
                  if (data) {
                    this.canVote = false;
                    this.errorMessage = "You already voted!";
                  }
                  
                });


              // TODO: Date of voting
              let currentDate = new Date(Date.now());
              console.log(currentDate);
              console.log(new Date(this.voting.dateOfStart));
              console.log(new Date(this.voting.dateOfEnd));
              if (currentDate > new Date(this.voting.dateOfEnd)) {
                this.canVote = false;
                this.errorMessage = "Voting is expired!";
              }
              if (currentDate < new Date(this.voting.dateOfStart)) {
                this.canVote = false;
                this.errorMessage = "Voting will start on " + moment(this.voting.dateOfStart).format('MM/DD/YYYY') + "!" ;
              }

              // TODO: Uncomment
              if (this.voting.regionID != null && this.userData.regionID != this.voting.regionID) {
                this.canVote = false;
                this.errorMessage = "Just National Directors from region " + this.voting.region?.name + " can participate in votings!";
              }

              this.voting.votingQuestions.forEach(question => {
                if (question.votingQuestionTypeID == 2)
                  question.votingQuestionAnswers = new Array(question.votingQuestionOptions.length);
                if (question.votingQuestionAnswers)
                  for (let i = 0; i < question.votingQuestionAnswers.length; i++)
                    question.votingQuestionAnswers[i] = false;
              })
              this.loadingSpinner.hide();
            })
          }
          else {
            this.loadingSpinner.hide();
          }
        })
      })
  }

  submitVoting() {
    this.submitVotingObs = [];

    this.votingUserService.insertVotingUser(this.voting.id, this.userData.id).subscribe(data => {

    });

    this.voting.votingQuestions.forEach(question => {
      if (question.votingQuestionTypeID == 1) {
        if (question.votingQuestionAnswerID) {
          let votingAnswer: VotingAnswer = new VotingAnswer();
          votingAnswer.votingQuestionID = question.id;
          votingAnswer.votingQuestionOptionID = question.votingQuestionAnswerID;
          this.submitVotingObs.push(this.votingAnswerService.insertVotingAnswer(question.id, votingAnswer));
          // .subscribe(
          //   data => { console.log(data) },
          //   error => { console.log(error) });
        }
      }
      else if (question.votingQuestionTypeID == 2) {
        question.votingQuestionAnswers.forEach((answer, index) => {
          if (answer) {
            let votingAnswer: VotingAnswer = new VotingAnswer();;
            votingAnswer.votingQuestionID = question.id;
            votingAnswer.votingQuestionOptionID = question.votingQuestionOptions[index].id;
            this.submitVotingObs.push(this.votingAnswerService.insertVotingAnswer(question.id, votingAnswer));
            // .subscribe(
            //   data => { console.log(data) },
            //   error => { console.log(error) });
          }
        })
      }
      else if (question.votingQuestionTypeID == 3) {
        let votingAnswer: VotingAnswer = new VotingAnswer();;
        votingAnswer.votingQuestionID = question.id;
        votingAnswer.answer = question.votingQuestionAnswer;
        this.submitVotingObs.push(this.votingAnswerService.insertVotingAnswer(question.id, votingAnswer));
        // .subscribe(
        //   data => { console.log(data) },
        //   error => { console.log(error) });
      }
    });

    // TODO: Add some event logs, otherwise forkJoin has no sense
    forkJoin(this.submitVotingObs).subscribe(
      data => { console.log(data); this.votingCompleted = true; this.successMessage = "Thank you for voting!" },
      error => { console.log(error) }
    )
  }
}
