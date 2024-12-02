import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationBecomePartnerComponent } from './presentation-become-partner.component';

describe('PresentationBecomePartnerComponent', () => {
  let component: PresentationBecomePartnerComponent;
  let fixture: ComponentFixture<PresentationBecomePartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentationBecomePartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentationBecomePartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
