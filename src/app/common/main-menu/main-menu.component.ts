import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { VisitorCounterService } from 'src/app/services/visitor-counter.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  user: any = {};
  userData: any;
  isUserLoggedIn: boolean = false;
  imageSource = environment.imageSource;
  visitorCount: number = 0;

  constructor(private auth: UserService, 
              private router: Router,
              private visitorCounterService: VisitorCounterService) { }

  ngOnInit(): void {
    this.isUserLoggedIn = this.auth.isLoggedIn();
    this.user = JSON.parse(localStorage.getItem('iaas-user'));
    this.loadVisitorCount();
    this.incrementVisitorCount();
  }

  loadVisitorCount(): void {
    this.visitorCounterService.getVisitorCount().subscribe(
      (response) => {
        if (response.success) {
          this.visitorCount = response.data;
        }
      },
      (error) => {
        console.error('Error loading visitor count:', error);
      }
    );
  }

  incrementVisitorCount(): void {
    this.visitorCounterService.incrementVisitorCount().subscribe(
      (response) => {
        if (response.success) {
          this.visitorCount = response.data;
        }
      },
      (error) => {
        console.error('Error incrementing visitor count:', error);
      }
    );
  }

  logout(){
    window.localStorage.removeItem('iaas-user');
    this.router.navigateByUrl('/');
    this.isUserLoggedIn = false;
    // window.location.reload();
  }
}
