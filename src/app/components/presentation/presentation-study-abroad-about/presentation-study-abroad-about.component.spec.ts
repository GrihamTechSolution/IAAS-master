import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationStudyAbroadAboutComponent } from './presentation-study-abroad-about.component';

describe('PresentationStudyAbroadAboutComponent', () => {
  let component: PresentationStudyAbroadAboutComponent;
  let fixture: ComponentFixture<PresentationStudyAbroadAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentationStudyAbroadAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentationStudyAbroadAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
