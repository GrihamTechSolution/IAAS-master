import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExproMainComponent } from './expro-main.component';

describe('ExproMainComponent', () => {
  let component: ExproMainComponent;
  let fixture: ComponentFixture<ExproMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExproMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExproMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
