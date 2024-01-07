import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { forkJoin } from 'rxjs';
import { Voting } from 'src/app/models/Voting';
import { RegionService } from 'src/app/services/region.service';
import { UserService } from 'src/app/services/user.service';
import { VotingService } from 'src/app/services/voting.service';

@Component({
  selector: 'app-votings',
  templateUrl: './votings.component.html',
  styleUrls: ['./votings.component.scss']
})
export class VotingsComponent implements OnInit {

  votings: Voting[] = [];
  fullVotings: Voting[];
  regions = [];
  searchName: string = null;
  searchRegionID: number;
  userData: any;

  constructor(private votingService: VotingService,
    private regionService: RegionService,
    private loadingSpinner: Ng4LoadingSpinnerService,
    private notifierService: NotifierService,
    private auth: UserService,
    private router: Router) { }

  ngOnInit() {
    this.loadingSpinner.show();

    let user = this.auth.getLoggedInUserData();

    if (!user) {
      this.router.navigateByUrl('/');
      this.loadingSpinner.hide();
    }

    let userObs = this.auth.getUserData(user.id);
    let regionObs = this.regionService.getRegions();
    let votingObs = this.votingService.getVotings();

    forkJoin([userObs, regionObs, votingObs]).subscribe(data => {
      this.userData = data[0];
      // TODO: This we will see

      this.votings = data[2];
      this.fullVotings = data[2];
      this.regions = data[1];
      this.loadingSpinner.hide();
    })
  }

  deleteVoting(id: number) {
    if (confirm("Are you sure?")) {
      this.loadingSpinner.show();

      this.votingService.deleteVoting(id).subscribe(data => {
        if (data.status == 0) {
          this.notifierService.notify("success", "Voting deleted!");
        }
        else {
          this.notifierService.notify("error", "Error while deleting voting!");
        }
        this.loadingSpinner.hide();
        this.ngOnInit();
      })
    }
  }

  // TODO: Should this be included
  searchVotings() {
    this.votings = this.fullVotings;

    if (this.searchName) {
      this.votings = this.votings.filter(e => {
        return e.name.toLowerCase().indexOf(this.searchName.toLowerCase()) != -1;
      })
    }

    if (this.searchRegionID) {
      this.votings = this.votings.filter(e => {
        return e.regionID == this.searchRegionID;
      })
    }
  }

  resetFilters() {
    this.searchRegionID = null;
    this.searchName = null;
    this.votings = this.fullVotings;
  }
}
