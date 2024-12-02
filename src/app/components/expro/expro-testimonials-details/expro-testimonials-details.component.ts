import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
// import { TestimonyService } from '../services/testimony.service'; // make sure the import path is correct
import { TestimonialService } from 'src/app/services/testimonials.service';

@Component({
  selector: 'app-expro-testimonials-details',
  templateUrl: './expro-testimonials-details.component.html',
  styleUrls: ['./expro-testimonials-details.component.scss'],
})
export class ExproTestimonialsDetalisComponent implements OnInit {
  testimonyId: string;
  testimony: any; // assuming the testimony data structure here, you can replace 'any' with the correct type
  isLoading: boolean = true;

  uploadImageSource = environment.uploadImageSource;

  constructor(
    private route: ActivatedRoute,
    private testimonyService: TestimonialService
  ) {}

  ngOnInit(): void {
    this.testimonyId = this.route.snapshot.paramMap.get('id');
    this.fetchTestimony();
  }

  fetchTestimony() {
    this.isLoading = true;
    this.testimonyService
      .getTestimonialById(parseInt(this.testimonyId))
      .subscribe(
        data => {
          this.testimony = data.data;
          console.log(data);
          this.isLoading = false;
        },
        error => {
          console.log(error);
          this.isLoading = false;
        }
      );
  }
}
