import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddeditlanguageComponent } from './admin-addeditlanguage.component';

describe('AdminAddeditlanguageComponent', () => {
  let component: AdminAddeditlanguageComponent;
  let fixture: ComponentFixture<AdminAddeditlanguageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddeditlanguageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddeditlanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
