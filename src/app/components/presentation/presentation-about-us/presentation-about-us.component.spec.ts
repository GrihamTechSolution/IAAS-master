import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationAboutUsComponent } from './presentation-about-us.component';

describe('PresentationAboutUsComponent', () => {
  let component: PresentationAboutUsComponent;
  let fixture: ComponentFixture<PresentationAboutUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentationAboutUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentationAboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
