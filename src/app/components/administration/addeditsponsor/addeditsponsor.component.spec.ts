import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditsponsorComponent } from './addeditsponsor.component';

describe('AddeditsponsorComponent', () => {
  let component: AddeditsponsorComponent;
  let fixture: ComponentFixture<AddeditsponsorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeditsponsorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeditsponsorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
