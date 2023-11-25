import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleImgRightComponent } from './article-img-right.component';

describe('ArticleImgRightComponent', () => {
  let component: ArticleImgRightComponent;
  let fixture: ComponentFixture<ArticleImgRightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleImgRightComponent],
    });
    fixture = TestBed.createComponent(ArticleImgRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
