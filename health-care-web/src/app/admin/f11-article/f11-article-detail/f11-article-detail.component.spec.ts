import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F11ArticleDetailComponent } from './f11-article-detail.component';

describe('F11ArticleDetailComponent', () => {
  let component: F11ArticleDetailComponent;
  let fixture: ComponentFixture<F11ArticleDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F11ArticleDetailComponent]
    });
    fixture = TestBed.createComponent(F11ArticleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
