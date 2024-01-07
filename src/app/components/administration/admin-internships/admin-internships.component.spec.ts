import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInternshipsComponent } from './admin-internships.component';

describe('AdminInternshipsComponent', () => {
  let component: AdminInternshipsComponent;
  let fixture: ComponentFixture<AdminInternshipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminInternshipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInternshipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
