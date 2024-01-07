import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLanguagesComponent } from './admin-languages.component';

describe('AdminLanguagesComponent', () => {
  let component: AdminLanguagesComponent;
  let fixture: ComponentFixture<AdminLanguagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLanguagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
