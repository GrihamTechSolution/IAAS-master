import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExproInternshipsComponent } from './expro-internships.component';

describe('ExproInternshipsComponent', () => {
  let component: ExproInternshipsComponent;
  let fixture: ComponentFixture<ExproInternshipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExproInternshipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExproInternshipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
