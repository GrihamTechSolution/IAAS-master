import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-exprogramdetails',
  templateUrl: './exprogramdetails.component.html',
  styleUrls: ['./exprogramdetails.component.css']
})
export class ExprogramdetailsComponent implements OnInit {
  imageSource = environment.imageSource

  exprogram = {
    id: 1, country: 'Montenegro', numberOfApplicants: 1, 
    name: 'Exciting internship',
    duration: 'Three months',
    food: true, lodge: true, hours: 2, weeklyHours: 8, city: 'Podgorica',
    numberOfScholarships: 5, 
    description: 'This is description', 
    where: 'Plantaze Podgorica',
    status: 'In progress'
  }

  constructor() { }

  ngOnInit() {
  }

}
