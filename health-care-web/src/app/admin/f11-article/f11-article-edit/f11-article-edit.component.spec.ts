import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F11ArticleEditComponent } from './f11-article-edit.component';

describe('F11ArticleEditComponent', () => {
  let component: F11ArticleEditComponent;
  let fixture: ComponentFixture<F11ArticleEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F11ArticleEditComponent]
    });
    fixture = TestBed.createComponent(F11ArticleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
