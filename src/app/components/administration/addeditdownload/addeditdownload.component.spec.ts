import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditdownloadComponent } from './addeditdownload.component';

describe('AddeditdownloadComponent', () => {
  let component: AddeditdownloadComponent;
  let fixture: ComponentFixture<AddeditdownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeditdownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeditdownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
