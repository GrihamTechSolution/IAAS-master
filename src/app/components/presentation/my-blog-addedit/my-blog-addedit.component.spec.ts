import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBlogAddeditComponent } from './my-blog-addedit.component';

describe('MyBlogAddeditComponent', () => {
  let component: MyBlogAddeditComponent;
  let fixture: ComponentFixture<MyBlogAddeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyBlogAddeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBlogAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
