import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F4HospitalComponent } from './f4-hospital.component';

describe('F4HospitalComponent', () => {
  let component: F4HospitalComponent;
  let fixture: ComponentFixture<F4HospitalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F4HospitalComponent],
    });
    fixture = TestBed.createComponent(F4HospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
