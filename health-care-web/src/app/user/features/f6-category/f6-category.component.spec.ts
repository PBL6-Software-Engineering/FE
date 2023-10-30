import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F6CategoryComponent } from './f6-category.component';

describe('F6CategoryComponent', () => {
  let component: F6CategoryComponent;
  let fixture: ComponentFixture<F6CategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F6CategoryComponent]
    });
    fixture = TestBed.createComponent(F6CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
