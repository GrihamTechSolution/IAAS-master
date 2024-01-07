import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExproContactComponent } from './expro-contact.component';

describe('ExproContactComponent', () => {
  let component: ExproContactComponent;
  let fixture: ComponentFixture<ExproContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExproContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExproContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
