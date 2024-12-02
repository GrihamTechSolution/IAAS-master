import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentHubComponent } from './content-hub.component';

describe('ContentHubComponent', () => {
  let component: ContentHubComponent;
  let fixture: ComponentFixture<ContentHubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentHubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
