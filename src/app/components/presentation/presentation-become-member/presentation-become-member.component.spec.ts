import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationBecomeMemberComponent } from './presentation-become-member.component';

describe('PresentationBecomeMemberComponent', () => {
  let component: PresentationBecomeMemberComponent;
  let fixture: ComponentFixture<PresentationBecomeMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentationBecomeMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentationBecomeMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
