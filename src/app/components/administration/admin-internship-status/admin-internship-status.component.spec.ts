import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInternshipStatusComponent } from './admin-internship-status.component';

describe('AdminInternshipStatusComponent', () => {
  let component: AdminInternshipStatusComponent;
  let fixture: ComponentFixture<AdminInternshipStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminInternshipStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInternshipStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
