import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleImgLeftComponent } from './article-img-left.component';

describe('ArticleImgLeftComponent', () => {
  let component: ArticleImgLeftComponent;
  let fixture: ComponentFixture<ArticleImgLeftComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleImgLeftComponent]
    });
    fixture = TestBed.createComponent(ArticleImgLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
