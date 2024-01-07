import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUsMapComponent } from './about-us-map.component';

describe('AboutUsMapComponent', () => {
  let component: AboutUsMapComponent;
  let fixture: ComponentFixture<AboutUsMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutUsMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutUsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
