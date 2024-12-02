import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditexprogramsComponent } from './addeditexprograms.component';

describe('AddeditexprogramsComponent', () => {
  let component: AddeditexprogramsComponent;
  let fixture: ComponentFixture<AddeditexprogramsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeditexprogramsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeditexprogramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
