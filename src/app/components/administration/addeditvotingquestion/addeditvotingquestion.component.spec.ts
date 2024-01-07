import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditvotingquestionComponent } from './addeditvotingquestion.component';

describe('AddeditvotingquestionComponent', () => {
  let component: AddeditvotingquestionComponent;
  let fixture: ComponentFixture<AddeditvotingquestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeditvotingquestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeditvotingquestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
