import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOpTakersComponent } from './admin-op-takers.component';

describe('AdminOpTakersComponent', () => {
  let component: AdminOpTakersComponent;
  let fixture: ComponentFixture<AdminOpTakersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOpTakersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOpTakersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
