import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F4CategoriesComponent } from './f4-categories.component';

describe('F4CategoriesComponent', () => {
  let component: F4CategoriesComponent;
  let fixture: ComponentFixture<F4CategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F4CategoriesComponent]
    });
    fixture = TestBed.createComponent(F4CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
