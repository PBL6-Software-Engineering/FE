import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F5DepartmentListComponent } from './f5-department-list.component';

describe('F5DepartmentListComponent', () => {
  let component: F5DepartmentListComponent;
  let fixture: ComponentFixture<F5DepartmentListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F5DepartmentListComponent],
    });
    fixture = TestBed.createComponent(F5DepartmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
