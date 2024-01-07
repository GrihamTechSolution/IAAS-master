import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshipStatusComponent } from './internship-status.component';

describe('InternshipStatusComponent', () => {
  let component: InternshipStatusComponent;
  let fixture: ComponentFixture<InternshipStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternshipStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternshipStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
