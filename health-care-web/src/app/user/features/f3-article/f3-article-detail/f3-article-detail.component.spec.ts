import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F3ArticleDetailComponent } from './f3-article-detail.component';

describe('F3ArticleDetailComponent', () => {
  let component: F3ArticleDetailComponent;
  let fixture: ComponentFixture<F3ArticleDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F3ArticleDetailComponent],
    });
    fixture = TestBed.createComponent(F3ArticleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
