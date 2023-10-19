import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F8PatientEditComponent } from './f8-patient-edit.component';

describe('F8PatientEditComponent', () => {
  let component: F8PatientEditComponent;
  let fixture: ComponentFixture<F8PatientEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F8PatientEditComponent]
    });
    fixture = TestBed.createComponent(F8PatientEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
