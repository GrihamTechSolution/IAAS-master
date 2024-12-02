import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { TestimonialService } from 'src/app/services/testimonials.service';

@Component({
  selector: 'app-expro-testimonials',
  templateUrl: './expro-testimonials.component.html',
  styleUrls: ['./expro-testimonials.component.scss'],
})
export class ExproTestimonialsComponent implements OnInit {
  featuredTestimony = {
    description: 'This is the featured testimony description.',
  };

  testimonies: any[] = [];
  isLoading = false;
  currentPage = 1;
  totalPages = 0;
  uploadImageSource = environment.uploadImageSource;
  limit = 9;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private testimonialsService: TestimonialService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const page = params.page || 1;
      this.limit = params.limit || 9;
      this.currentPage = +page;
      this.getTestimonies(page, this.limit);
    });
  }

  getTestimonies(page: number, limit: number): void {
    this.isLoading = true;
    this.testimonialsService.getAllTestimonials(page, limit).subscribe(
      response => {
        this.testimonies = response.data.rows;
        this.totalPages = response.meta.totalPages;
        this.isLoading = false;
      },
      error => {
        console.error(error);
        this.isLoading = false;
      }
    );
  }

  goToPage(page: number): void {
    this.router.navigate([], {
      queryParams: { page: page, limit: this.limit },
      queryParamsHandling: 'merge',
    });
  }

  get pages() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  getFullName(user: { firstName: string; lastName: string }): string {
    return `${user.firstName} ${user.lastName}`;
  }
}
// constructor() {}

// ngOnInit() {}
