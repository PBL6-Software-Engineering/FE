import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleImgLeft2Component } from './article-img-left2.component';

describe('ArticleImgLeft2Component', () => {
  let component: ArticleImgLeft2Component;
  let fixture: ComponentFixture<ArticleImgLeft2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleImgLeft2Component],
    });
    fixture = TestBed.createComponent(ArticleImgLeft2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
