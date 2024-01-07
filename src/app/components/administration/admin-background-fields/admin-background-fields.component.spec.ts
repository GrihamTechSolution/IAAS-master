import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBackgroundFieldsComponent } from './admin-background-fields.component';

describe('AdminBackgroundFieldsComponent', () => {
  let component: AdminBackgroundFieldsComponent;
  let fixture: ComponentFixture<AdminBackgroundFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBackgroundFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBackgroundFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
