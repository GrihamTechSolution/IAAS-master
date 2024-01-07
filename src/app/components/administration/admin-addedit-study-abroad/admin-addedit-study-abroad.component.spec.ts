import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddeditStudyAbroadComponent } from './admin-addedit-study-abroad.component';

describe('AdminAddeditStudyAbroadComponent', () => {
  let component: AdminAddeditStudyAbroadComponent;
  let fixture: ComponentFixture<AdminAddeditStudyAbroadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddeditStudyAbroadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddeditStudyAbroadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
