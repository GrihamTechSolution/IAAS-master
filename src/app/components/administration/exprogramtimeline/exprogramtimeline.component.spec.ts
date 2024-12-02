import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExprogramtimelineComponent } from './exprogramtimeline.component';

describe('ExprogramtimelineComponent', () => {
  let component: ExprogramtimelineComponent;
  let fixture: ComponentFixture<ExprogramtimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExprogramtimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExprogramtimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
