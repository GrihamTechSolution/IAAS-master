import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditpartnerComponent } from './addeditpartner.component';

describe('AddeditpartnerComponent', () => {
  let component: AddeditpartnerComponent;
  let fixture: ComponentFixture<AddeditpartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeditpartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeditpartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
