import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExprogramdetailsComponent } from './exprogramdetails.component';

describe('ExprogramdetailsComponent', () => {
  let component: ExprogramdetailsComponent;
  let fixture: ComponentFixture<ExprogramdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExprogramdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExprogramdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
