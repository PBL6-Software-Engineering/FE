import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F3ArticleListComponent } from './f3-article-list.component';

describe('F3ArticleListComponent', () => {
  let component: F3ArticleListComponent;
  let fixture: ComponentFixture<F3ArticleListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F3ArticleListComponent]
    });
    fixture = TestBed.createComponent(F3ArticleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
