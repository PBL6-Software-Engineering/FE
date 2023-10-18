import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F7HospitalServiceEditComponent } from './f7-hospital-service-edit.component';

describe('F7HospitalServiceEditComponent', () => {
  let component: F7HospitalServiceEditComponent;
  let fixture: ComponentFixture<F7HospitalServiceEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F7HospitalServiceEditComponent]
    });
    fixture = TestBed.createComponent(F7HospitalServiceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
