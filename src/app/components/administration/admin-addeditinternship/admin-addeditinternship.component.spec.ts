import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddeditinternshipComponent } from './admin-addeditinternship.component';

describe('AdminAddeditinternshipComponent', () => {
  let component: AdminAddeditinternshipComponent;
  let fixture: ComponentFixture<AdminAddeditinternshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddeditinternshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddeditinternshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
