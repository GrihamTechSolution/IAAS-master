import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationsDownloadsComponent } from './presentations-downloads.component';

describe('PresentationsDownloadsComponent', () => {
  let component: PresentationsDownloadsComponent;
  let fixture: ComponentFixture<PresentationsDownloadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentationsDownloadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentationsDownloadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
