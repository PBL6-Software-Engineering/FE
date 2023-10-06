import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F8PatientListComponent } from './f8-patient-list.component';

describe('F8PatientListComponent', () => {
  let component: F8PatientListComponent;
  let fixture: ComponentFixture<F8PatientListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F8PatientListComponent]
    });
    fixture = TestBed.createComponent(F8PatientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
