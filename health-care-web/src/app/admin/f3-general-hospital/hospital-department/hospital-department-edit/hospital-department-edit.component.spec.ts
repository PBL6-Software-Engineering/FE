import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalDepartmentEditComponent } from './hospital-department-edit.component';

describe('HospitalDepartmentEditComponent', () => {
  let component: HospitalDepartmentEditComponent;
  let fixture: ComponentFixture<HospitalDepartmentEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HospitalDepartmentEditComponent],
    });
    fixture = TestBed.createComponent(HospitalDepartmentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
