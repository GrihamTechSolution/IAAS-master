import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedditcategoryComponent } from './addedditcategory.component';

describe('AddedditcategoryComponent', () => {
  let component: AddedditcategoryComponent;
  let fixture: ComponentFixture<AddedditcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddedditcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedditcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
