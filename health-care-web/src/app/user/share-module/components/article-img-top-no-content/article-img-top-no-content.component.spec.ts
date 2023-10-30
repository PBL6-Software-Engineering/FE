import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleImgTopNoContentComponent } from './article-img-top-no-content.component';

describe('ArticleImgTopNoContentComponent', () => {
  let component: ArticleImgTopNoContentComponent;
  let fixture: ComponentFixture<ArticleImgTopNoContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleImgTopNoContentComponent]
    });
    fixture = TestBed.createComponent(ArticleImgTopNoContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
