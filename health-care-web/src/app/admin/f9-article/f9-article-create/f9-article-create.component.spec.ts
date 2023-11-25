import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F9ArticleCreateComponent } from './f9-article-create.component';

describe('F9ArticleCreateComponent', () => {
  let component: F9ArticleCreateComponent;
  let fixture: ComponentFixture<F9ArticleCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F9ArticleCreateComponent],
    });
    fixture = TestBed.createComponent(F9ArticleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
