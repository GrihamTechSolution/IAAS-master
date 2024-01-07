import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationStudyAbroadStudentsComponent } from './presentation-study-abroad-students.component';

describe('PresentationStudyAbroadStudentsComponent', () => {
  let component: PresentationStudyAbroadStudentsComponent;
  let fixture: ComponentFixture<PresentationStudyAbroadStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentationStudyAbroadStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentationStudyAbroadStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
