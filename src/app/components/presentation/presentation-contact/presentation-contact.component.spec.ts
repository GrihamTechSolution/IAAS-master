import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationContactComponent } from './presentation-contact.component';

describe('PresentationContactComponent', () => {
  let component: PresentationContactComponent;
  let fixture: ComponentFixture<PresentationContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentationContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentationContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
