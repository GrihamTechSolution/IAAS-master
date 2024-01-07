import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExproFaqComponent } from './expro-faq.component';

describe('ExproFaqComponent', () => {
  let component: ExproFaqComponent;
  let fixture: ComponentFixture<ExproFaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExproFaqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExproFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
