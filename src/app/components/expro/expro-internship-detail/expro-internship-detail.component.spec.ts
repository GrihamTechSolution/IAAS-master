import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExproInternshipDetailComponent } from './expro-internship-detail.component';

describe('ExproInternshipDetailComponent', () => {
  let component: ExproInternshipDetailComponent;
  let fixture: ComponentFixture<ExproInternshipDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExproInternshipDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExproInternshipDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
