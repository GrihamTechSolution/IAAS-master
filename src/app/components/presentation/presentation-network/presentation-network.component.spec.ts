import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationNetworkComponent } from './presentation-network.component';

describe('PresentationNetworkComponent', () => {
  let component: PresentationNetworkComponent;
  let fixture: ComponentFixture<PresentationNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentationNetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentationNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
