import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F9ArticleEditComponent } from './f9-article-edit.component';

describe('F9ArticleEditComponent', () => {
  let component: F9ArticleEditComponent;
  let fixture: ComponentFixture<F9ArticleEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F9ArticleEditComponent],
    });
    fixture = TestBed.createComponent(F9ArticleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
