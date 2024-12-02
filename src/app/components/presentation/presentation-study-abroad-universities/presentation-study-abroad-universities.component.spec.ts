import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationStudyAbroadUniversitiesComponent } from './presentation-study-abroad-universities.component';

describe('PresentationStudyAbroadUniversitiesComponent', () => {
  let component: PresentationStudyAbroadUniversitiesComponent;
  let fixture: ComponentFixture<PresentationStudyAbroadUniversitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentationStudyAbroadUniversitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentationStudyAbroadUniversitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
