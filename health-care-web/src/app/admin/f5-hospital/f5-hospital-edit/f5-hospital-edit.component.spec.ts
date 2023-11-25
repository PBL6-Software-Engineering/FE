import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F5HospitalEditComponent } from './f5-hospital-edit.component';

describe('F5HospitalEditComponent', () => {
  let component: F5HospitalEditComponent;
  let fixture: ComponentFixture<F5HospitalEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F5HospitalEditComponent],
    });
    fixture = TestBed.createComponent(F5HospitalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
