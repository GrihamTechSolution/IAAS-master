import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.css']
})
export class ApplicantsComponent implements OnInit {

  applicants = [
    { internshipName: 'Exciting internship', 
      city: 'Podgorica', 
      country: 'Crna Gora', 
      applicantName: 'Aleksandar', 
      applicantSurname: 'Plamenac', 
      applicantCountry: 'Montenegro',
      status: 'IN PROGRESS'},
      { internshipName: 'Second internship', 
      city: 'Podgorica', 
      country: 'Crna Gora', 
      applicantName: 'Aleksandar', 
      applicantSurname: 'Plamenac', 
      applicantCountry: 'Montenegro',
      status: 'IN PROGRESS'},
      { internshipName: 'Exciting internship', 
      city: 'Podgorica', 
      country: 'Crna Gora', 
      applicantName: 'Milovan', 
      applicantSurname: 'Markovic', 
      applicantCountry: 'England',
      status: 'IN PROGRESS'},
      { internshipName: 'Second internship', 
      city: 'Podgorica', 
      country: 'Crna Gora', 
      applicantName: 'Milovan', 
      applicantSurname: 'Markovic', 
      applicantCountry: 'England',
      status: 'IN PROGRESS'}
  ]

  constructor() { }

  ngOnInit() {
  }

}
