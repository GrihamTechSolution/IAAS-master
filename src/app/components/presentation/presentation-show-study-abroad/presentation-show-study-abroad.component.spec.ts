import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationShowStudyAbroadComponent } from './presentation-show-study-abroad.component';

describe('PresentationShowStudyAbroadComponent', () => {
  let component: PresentationShowStudyAbroadComponent;
  let fixture: ComponentFixture<PresentationShowStudyAbroadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentationShowStudyAbroadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentationShowStudyAbroadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
