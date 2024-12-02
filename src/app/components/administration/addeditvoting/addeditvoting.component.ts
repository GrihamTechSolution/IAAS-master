import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import * as moment from 'dayjs';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { forkJoin } from 'rxjs';
import { ExproMail } from 'src/app/models/ExproMail';
import { Region } from 'src/app/models/Region';
import { User } from 'src/app/models/User';
import { Voting, VotingType } from 'src/app/models/Voting';
import { VotingQuestion } from 'src/app/models/VotingQuestion';
import { CountryService } from 'src/app/services/country.service';
import { MailService } from 'src/app/services/mail.service';
import { RegionService } from 'src/app/services/region.service';
import { UserService } from 'src/app/services/user.service';
import { VotingQuestionOptionService } from 'src/app/services/voting-question-option-service';
import { VotingQuestionService } from 'src/app/services/voting-question.service';
import { VotingService } from 'src/app/services/voting.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-addeditvoting',
  templateUrl: './addeditvoting.component.html',
  styleUrls: ['./addeditvoting.component.scss']
})
export class AddEditVotingComponent implements OnInit {

  voting: Voting = new Voting();
  regions: Region[] = [];
  votingTypes: VotingType[] = [];
  votingQuestions: VotingQuestion[] = [];
  edit: boolean = false;
  userData: any;
  filteredUsers: User[] = [];

  apiUrl = `${environment.apiUrl}`;

  currentQuestion: VotingQuestion = new VotingQuestion();

  private deleteVotingQuestionOptionsObs: any[] = [];

  constructor(private regionService: RegionService,
    private votingService: VotingService,
    private mailService: MailService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private loadingSpinner: Ng4LoadingSpinnerService,
    private notifier: NotifierService,
    private auth: UserService,
    private countryService: CountryService,
    private votingQuestionService: VotingQuestionService,
    private votingQuestionOptionService: VotingQuestionOptionService) { }

  ngOnInit() {

    let user = this.auth.getLoggedInUserData();

    if (!user) {
      this.router.navigateByUrl('/');
    }

    this.auth.getUserData(user.id).subscribe(data => {
      this.userData = data;
    })

    this.regionService.getRegions().subscribe(data => {
      this.regions = data;
    });

    this.votingService.getVotingTypes().subscribe(data => {
      this.votingTypes = data;
    })

    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.edit = true;
        this.votingService.getVotingByID(params['id']).subscribe(data => {
          this.voting = data;
          this.loadingSpinner.hide();
        });
      }
      else {
        this.loadingSpinner.hide();
      }
    })
  }

  addEditVoting() {
    this.loadingSpinner.show();

    this.voting.dateOfStart = moment(this.voting.dateOfStart).toDate();
    this.voting.dateOfEnd = moment(this.voting.dateOfEnd).toDate();

    if (this.edit) {
      this.votingService.updateVoting(this.voting).subscribe(data => {
        this.loadingSpinner.hide();
        if (data.status == 0) {
          this.notifier.notify("success", "Voting updated!");
          //this.router.navigateByUrl('/administration/votings');
        }
        else {
          this.notifier.notify("error", "Error while updating voting");
        }
      })
    }
    else {
      this.votingService.insertVoting(this.voting).subscribe(data => {
        this.loadingSpinner.hide();
        if (data.status == 0) {
          this.voting.id = data.data.id;
          this.notifier.notify("success", "Voting inserted!");
          // TODO: Because of back button
          this.router.navigateByUrl('/administration/addeditvoting/' + this.voting.id);
        }
        else {
          this.notifier.notify("error", "Error while inserting voting!");
        }
      })
    }
  }

  validateInput() {
    if (!this.voting.name ||
      !this.voting.dateOfStart ||
      !this.voting.dateOfEnd ||
      !this.voting.votingTypeID ||
      (
        this.voting.votingTypeID == 2 && !this.voting.regionID
      )) {
      this.notifier.notify("error", "Please insert all necessary voting data!");
      return;
    }

    if (this.voting.dateOfEnd < this.voting.dateOfStart) {
      this.notifier.notify("error", "Date of end must be greater than date of start!");
      return;
    }

    this.addEditVoting();
  }

  deleteQuestion(item) {

    if (confirm("Are you sure?")) {

      this.currentQuestion = item;

      if (this.currentQuestion.votingQuestionOptions && this.currentQuestion.votingQuestionOptions.length > 0) {
        this.deleteVotingQuestionOptionsObs = [];
        this.currentQuestion.votingQuestionOptions.forEach(votingQuestionOption => {
          this.deleteVotingQuestionOptionsObs.push(this.votingQuestionOptionService.deleteVotingQuestionOption(this.currentQuestion.id, votingQuestionOption.id));
        });

        forkJoin(this.deleteVotingQuestionOptionsObs).subscribe(
          data => {
            this.votingQuestionService.deleteVotingQuestion(this.voting.id, this.currentQuestion.id).subscribe(
              data => {
                this.voting.votingQuestions.splice(this.voting.votingQuestions.indexOf(this.currentQuestion), 1);
                this.notifier.notify("success", "Question successfully deleted.");
              }
            )
          },
          error => { console.log(error) }
        )

      }
      else {
        this.votingQuestionService.deleteVotingQuestion(this.voting.id, this.currentQuestion.id).subscribe(
          data => {
            this.voting.votingQuestions.splice(this.voting.votingQuestions.indexOf(this.currentQuestion), 1);
            this.notifier.notify("success", "Question successfully deleted.");
          }
        )
      }
    }
  }

  confirmVoting() {
    this.voting.isActive = true;

    this.votingService.updateVoting(this.voting).subscribe(
      data => {
        this.notifier.notify("success", "Voting successfuly activated!");

        this.auth.getUsersByType(5).subscribe(users => {
          console.log(users);
          this.filteredUsers = users;

          if (this.voting.regionID != null) {
            this.countryService.getCountryByRegion(this.voting.regionID).subscribe(data => {
              let countries = data.map(item => item.id);
              console.log(countries);
              this.filteredUsers = users.filter(user => countries.indexOf(user.countryID) > -1)
              console.log(this.filteredUsers);
            })
          }

          this.filteredUsers.forEach(user => {
            if (user.email)
              this.sendVotingNotification(user.email);
          });
        })
        //this.sendVotingNotification("aleksandar.plamenac@firenet.me");
        this.sendVotingNotification("milena.plamenac@firenet.me");
      },
      error => { this.notifier.notify("error", "Error in voting confirmation!"); }
    )
  }

  // TODO: Solve this better way
  sendVotingNotification(toEmail) {
    let mail = new ExproMail();

    mail.toEmail = toEmail,
      mail.subject = "New voting notification",
      // mail.message = `
      //   <p>Dear Sir, </p>
      //   <p>Please, be informed that new voting is set up.</p>
      //   <p>We would appreciate if you could fill up the following form:   <a href='${environment.domainUrl}/doVoting/${this.voting.id}'>
      //   ${environment.domainUrl}/doVoting/${this.voting.id}
      //     </a>
      //     </p>
      //     <p>Thanks! IAAS team</p>`;

      //     mail.message = `<h1 style="color:#70ad47">Voting notification</h1>
      //                     <p>
      //                     Dear Members of Europe,
      //                     <br/>
      //                     Thank you for participating in the European Directors Meeting. <br/>
      //                     Now it's time to elect the new regional Board of Europe. <br/>
      // ​
      //                     We want to apologize for the technical difficulties. <br/>
      // ​
      //                     Here you can find the link to vote : 
      //                     <a href='${environment.domainUrl}/doVoting/${this.voting.id}' target="__blank">LINK</a>​
      //                     <br/>
      //                     If you face any difficulties or have any questions please get in contact with us at controlboard@iaasworld.org (or aleksandar.plamenac@firenet.me for technical difficulties).
      //                     <br/> <br/>
      //                     Best regards
      //                     <br/>
      //                     IAAS Control Board 2020/21
      //                     <br/>
      //                     Amal Ibijbijen
      //                     <br/>
      //                     Jonathan Rixhon
      //                     <br/>
      //                     Aya Mounir
      //                     <br/>
      //                     controlboard@iaasworld.org, 
      //                     </p>`;

      mail.message = `<h1 style="color:#70ad47">Voting notification</h1>
                    <p>
                    Dear Members,
                    <br/>
                    <p>Please, be informed that new voting is set up.</p>
                    <p>${this.voting.description}</p>
                    Here you can find the link to vote : 
                    <a href='${environment.domainUrl}/doVoting/${this.voting.id}' target="__blank">LINK</a>​
                    <br/>
                    Feel free to vote from ${moment(this.voting.dateOfStart).format('MM/DD/YYYY HH:mm')} to ${moment(this.voting.dateOfEnd).format('MM/DD/YYYY HH:mm')}. 
                    <br/>
                    If you face any difficulties or have any questions please get in contact with us at controlboard@iaasworld.org (or aleksandar.plamenac@firenet.me for technical difficulties).
                    <br/> <br/>
                    Best regards
                    <br/>
                    IAAS Control Board 2020/21
                    <br/>
                    Amal Ibijbijen
                    <br/>
                    Jonathan Rixhon
                    <br/>
                    Aya Mounir
                    <br/>
                    controlboard@iaasworld.org, 
                    </p>`;

    this.mailService.sendVotingNotificationMail(mail).subscribe(data => { }, error => { });
  }

}
