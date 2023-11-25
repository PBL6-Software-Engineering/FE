import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalDepartmentCreateComponent } from './hospital-department-create.component';

describe('HospitalDepartmentCreateComponent', () => {
  let component: HospitalDepartmentCreateComponent;
  let fixture: ComponentFixture<HospitalDepartmentCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HospitalDepartmentCreateComponent],
    });
    fixture = TestBed.createComponent(HospitalDepartmentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
