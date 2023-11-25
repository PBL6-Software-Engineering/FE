import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F9ArticleListComponent } from './f9-article-list.component';

describe('F9ArticleListComponent', () => {
  let component: F9ArticleListComponent;
  let fixture: ComponentFixture<F9ArticleListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F9ArticleListComponent],
    });
    fixture = TestBed.createComponent(F9ArticleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
