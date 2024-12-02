import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditvotingComponent } from './addeditvoting.component';

describe('AddeditvotingComponent', () => {
  let component: AddeditvotingComponent;
  let fixture: ComponentFixture<AddeditvotingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeditvotingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeditvotingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
