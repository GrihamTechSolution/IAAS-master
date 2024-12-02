import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationStudyAbroadComponent } from './presentation-study-abroad.component';

describe('PresentationStudyAbroadComponent', () => {
  let component: PresentationStudyAbroadComponent;
  let fixture: ComponentFixture<PresentationStudyAbroadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentationStudyAbroadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentationStudyAbroadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
