import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleImgTopComponent } from './article-img-top.component';

describe('ArticleImgTopComponent', () => {
  let component: ArticleImgTopComponent;
  let fixture: ComponentFixture<ArticleImgTopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleImgTopComponent]
    });
    fixture = TestBed.createComponent(ArticleImgTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
