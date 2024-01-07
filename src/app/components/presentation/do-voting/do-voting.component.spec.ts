import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoVotingComponent } from './do-voting.component';

describe('DoVotingComponent', () => {
  let component: DoVotingComponent;
  let fixture: ComponentFixture<DoVotingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoVotingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoVotingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
