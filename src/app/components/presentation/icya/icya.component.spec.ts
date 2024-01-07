import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcyaComponent } from './icya.component';

describe('IcyaComponent', () => {
  let component: IcyaComponent;
  let fixture: ComponentFixture<IcyaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcyaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcyaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
