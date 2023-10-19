import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F11ArticleCreateComponent } from './f11-article-create.component';

describe('F11ArticleCreateComponent', () => {
  let component: F11ArticleCreateComponent;
  let fixture: ComponentFixture<F11ArticleCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F11ArticleCreateComponent]
    });
    fixture = TestBed.createComponent(F11ArticleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
