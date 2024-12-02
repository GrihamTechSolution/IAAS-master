import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentHubSingleComponent } from './content-hub-single.component';

describe('ContentHubSingleComponent', () => {
  let component: ContentHubSingleComponent;
  let fixture: ComponentFixture<ContentHubSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentHubSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentHubSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
