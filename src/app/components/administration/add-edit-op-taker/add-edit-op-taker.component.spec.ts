import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditOpTakerComponent } from './add-edit-op-taker.component';

describe('AddEditOpTakerComponent', () => {
  let component: AddEditOpTakerComponent;
  let fixture: ComponentFixture<AddEditOpTakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditOpTakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditOpTakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
