import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExproCountriesComponent } from './expro-countries.component';

describe('ExproCountriesComponent', () => {
  let component: ExproCountriesComponent;
  let fixture: ComponentFixture<ExproCountriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExproCountriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExproCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
