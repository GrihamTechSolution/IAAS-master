import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExproHomeComponent } from './expro-home.component';

describe('ExproHomeComponent', () => {
  let component: ExproHomeComponent;
  let fixture: ComponentFixture<ExproHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExproHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExproHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
