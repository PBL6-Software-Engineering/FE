import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F9ArticleDetailComponent } from './f9-article-detail.component';

describe('F9ArticleDetailComponent', () => {
  let component: F9ArticleDetailComponent;
  let fixture: ComponentFixture<F9ArticleDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F9ArticleDetailComponent],
    });
    fixture = TestBed.createComponent(F9ArticleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
