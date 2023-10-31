import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F11ArticleListComponent } from './f11-article-list.component';

describe('F11ArticleListComponent', () => {
  let component: F11ArticleListComponent;
  let fixture: ComponentFixture<F11ArticleListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F11ArticleListComponent],
    });
    fixture = TestBed.createComponent(F11ArticleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
