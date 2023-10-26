import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalDepartmentListComponent } from './hospital-department-list.component';

describe('HospitalDepartmentListComponent', () => {
  let component: HospitalDepartmentListComponent;
  let fixture: ComponentFixture<HospitalDepartmentListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HospitalDepartmentListComponent]
    });
    fixture = TestBed.createComponent(HospitalDepartmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
