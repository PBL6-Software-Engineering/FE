import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F5DepartmentsComponent } from './f5-departments.component';

describe('F5DepartmentsComponent', () => {
  let component: F5DepartmentsComponent;
  let fixture: ComponentFixture<F5DepartmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F5DepartmentsComponent],
    });
    fixture = TestBed.createComponent(F5DepartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
