import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExprogramsComponent } from './exprograms.component';

describe('ExprogramsComponent', () => {
  let component: ExprogramsComponent;
  let fixture: ComponentFixture<ExprogramsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExprogramsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExprogramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
