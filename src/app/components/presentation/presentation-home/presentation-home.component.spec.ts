import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationHomeComponent } from './presentation-home.component';

describe('PresentationHomeComponent', () => {
  let component: PresentationHomeComponent;
  let fixture: ComponentFixture<PresentationHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentationHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentationHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
