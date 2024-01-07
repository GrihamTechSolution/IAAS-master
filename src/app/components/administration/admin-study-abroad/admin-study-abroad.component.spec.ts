import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudyAbroadComponent } from './admin-study-abroad.component';

describe('AdminStudyAbroadComponent', () => {
  let component: AdminStudyAbroadComponent;
  let fixture: ComponentFixture<AdminStudyAbroadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStudyAbroadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStudyAbroadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
