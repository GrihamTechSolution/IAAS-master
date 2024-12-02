import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exprograms',
  templateUrl: './exprograms.component.html',
  styleUrls: ['./exprograms.component.css']
})
export class ExprogramsComponent implements OnInit {

  exprograms = [
    {
      id: 1, country: 'Montenegro', numberOfApplicants: 1, 
      name: 'Exciting internship',
      duration: 'Three months',
      food: true, lodge: true, hours: 2, weeklyHours: 8, city: 'Podgorica',
      numberOfScholarships: 5, 
      description: 'This is description', 
      where: 'Plantaze Podgorica',
      status: 'In progress'
    },
    {
      id: 1, country: 'Montenegro', numberOfApplicants: 1, 
      name: 'Second internship',
      food: true, lodge: false, hours: 4, weeklyHours: 16,
      duration: 'Three weeks',
      numberOfScholarships: 5, city: 'Podgorica',
      where: 'Biotechnical faculty Podgorica',
      description: 'This is description', 
      status: 'In progress'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
