import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFaqCategoryComponent } from './add-edit-faq-category.component';

describe('AddEditFaqCategoryComponent', () => {
  let component: AddEditFaqCategoryComponent;
  let fixture: ComponentFixture<AddEditFaqCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditFaqCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditFaqCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
