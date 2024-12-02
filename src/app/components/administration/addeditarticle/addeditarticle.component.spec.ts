import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditarticleComponent } from './addeditarticle.component';

describe('AddeditarticleComponent', () => {
  let component: AddeditarticleComponent;
  let fixture: ComponentFixture<AddeditarticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeditarticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeditarticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
