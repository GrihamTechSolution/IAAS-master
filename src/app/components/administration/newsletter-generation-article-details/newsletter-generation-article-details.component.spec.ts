import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterGenerationArticleDetailsComponent } from './newsletter-generation-article-details.component';

describe('NewsletterGenerationArticleDetailsComponent', () => {
  let component: NewsletterGenerationArticleDetailsComponent;
  let fixture: ComponentFixture<NewsletterGenerationArticleDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsletterGenerationArticleDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsletterGenerationArticleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
