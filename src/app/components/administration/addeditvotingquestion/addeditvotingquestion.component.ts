import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Voting } from 'src/app/models/Voting';
import { VotingQuestion } from 'src/app/models/VotingQuestion';
import { VotingQuestionOption } from 'src/app/models/VotingQuestionOption';
import { UserService } from 'src/app/services/user.service';
import { VotingQuestionOptionService } from 'src/app/services/voting-question-option-service';
import { VotingQuestionService } from 'src/app/services/voting-question.service';
import { VotingService } from 'src/app/services/voting.service';

@Component({
  selector: 'app-addeditvotingquestion',
  templateUrl: './addeditvotingquestion.component.html',
  styleUrls: ['./addeditvotingquestion.component.scss']
})
export class AddEditVotingQuestionComponent implements OnInit {

  userData: any;
  edit: boolean = false;

  votingId: number;
  voting: Voting = new Voting();

  votingQuestion: VotingQuestion = new VotingQuestion();
  votingQuestionOptions: VotingQuestionOption[] = [];

  votingQuestionTypes: any[] = [{ 'id': 1, 'name': 'One choice' }, { 'id': 2, 'name': 'Multiple choice' }, { 'id': 3, 'name': 'Short answer' }];

  newOption: string = null;
  currentOption: VotingQuestionOption = new VotingQuestionOption();

  // @ViewChild('editQuestionOptionModal')
  // editQuestionOptionModal: TemplateRef<any>;
  // modalRef: BsModalRef;

  @ViewChild('editQuestionOptionModal') public editQuestionOptionModal: ModalDirective;

  constructor(
    private votingService: VotingService,
    private votingQuestionService: VotingQuestionService,
    private votingQuestionOptionService: VotingQuestionOptionService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private loadingSpinner: Ng4LoadingSpinnerService,
    private notifier: NotifierService,
    private auth: UserService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    let user = this.auth.getLoggedInUserData();

    if (!user) {
      this.router.navigateByUrl('/');
    }

    this.auth.getUserData(user.id).subscribe(data => {
      this.userData = data;
    })

    this.activatedRoute.params.subscribe(params => {
      if (params['votingId']) {
        this.votingId = params['votingId'];
        this.votingService.getVotingByID(this.votingId).subscribe(data => {
          this.voting = data;
        })
      }

      if (params['id']) {
        this.edit = true;
        this.votingQuestionService.getVotingQuestionByID(params['votingId'], params['id']).subscribe(data => {
          this.votingQuestion = data;
          this.loadingSpinner.hide();
        });
      }
      else {
        this.loadingSpinner.hide();
      }
    })
  }

  validateInput() {
    if (!this.votingQuestion.votingQuestionTypeID ||
      !this.votingQuestion.question) {
      this.notifier.notify("error", "Please insert all necessary voting question data!");
      return;
    }

    this.addEditVotingQuestion();
  }

  addEditVotingQuestion() {
    this.loadingSpinner.show();

    if (this.edit) {
      this.votingQuestionService.updateVotingQuestion(this.votingId, this.votingQuestion).subscribe(data => {
        this.loadingSpinner.hide();
        if (data.status == 0) {
          this.notifier.notify("success", "Voting question updated!");
          // TODO: Make this also dynamic
          if (this.votingQuestion.votingQuestionTypeID == 3)
            this.router.navigateByUrl('/administration/addeditvoting/' + this.votingId);
        }
        else {
          this.notifier.notify("error", "Error while updating voting");
        }
      })
    }
    else {
      this.votingQuestionService.insertVotingQuestion(this.votingId, this.votingQuestion).subscribe(data => {
        this.loadingSpinner.hide();
        if (data.status == 0) {
          this.notifier.notify("success", "Voting question inserted!");
          this.votingQuestion = data.data;
          // TODO: Make this also dynamic
          if (this.votingQuestion.votingQuestionTypeID == 3)
            this.router.navigateByUrl('/administration/addeditvoting/' + this.votingId);
          else
            this.router.navigateByUrl('/administration/addeditvoting/' + this.votingId + '/addeditvotingquestion/' + data.data.id);

        }
        else {
          this.notifier.notify("error", "Error while inserting voting question!");
        }
      })
    }
  }

  // deleteVotingQuestion(votingQuestion: VotingQuestion) {
  //   let deleteVotingQuestionOptions: Observable<any>[] = [];
  //   for (let i = 0; i < votingQuestion.votingQuestionOptions.length; i++) {

  //   }
  // }

  addVotingQuestionOption() {
    this.votingQuestionOptionService.insertVotingQuestionOption(this.votingQuestion.id, { votingQuestionID: this.votingQuestion.id, votingQuestionOption: this.newOption }).subscribe(
      data => {
        this.notifier.notify("success", "Successfuly inserted option: " + this.newOption);

        // TODO: Push can be better idea
        this.votingQuestionOptionService.getVotingQuestionOptions(this.votingQuestion.id).subscribe(data => {
          this.votingQuestion.votingQuestionOptions = data;
        });

        this.newOption = null;
      },
      error => {
        this.notifier.notify("error", "Error while inserting option: " + this.newOption);
      }
    );
  }

  editVotingQuestionOptionOpenModal(item) {
    this.currentOption = item;
  }

  editVotingQuestionOption() {
    this.votingQuestionOptionService.updateVotingQuestionOption(this.votingQuestion.id, this.currentOption).subscribe(
      data => {
        this.votingQuestionService.getVotingQuestionByID(this.voting.id, this.votingQuestion.id).subscribe(data => {
          this.votingQuestion = data;
          this.notifier.notify("success", "Successfully updated question option.");
          this.currentOption = new VotingQuestionOption();
        });
      }
    )
  }

  deleteVotingQuestionOption(item: VotingQuestionOption) {
    if (confirm("Are you sure?")) {
      this.votingQuestionOptionService.deleteVotingQuestionOption(item.votingQuestionID, item.id).subscribe(
        data => {
          this.votingQuestionService.getVotingQuestionByID(this.voting.id, item.votingQuestionID).subscribe(
            votingQuestion => { 
              this.votingQuestion = votingQuestion;
            }
          )
        }
      )
    }
  }
}
