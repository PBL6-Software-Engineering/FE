import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F7HospitalServiceCreateComponent } from './f7-hospital-service-create.component';

describe('F7HospitalServiceCreateComponent', () => {
  let component: F7HospitalServiceCreateComponent;
  let fixture: ComponentFixture<F7HospitalServiceCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F7HospitalServiceCreateComponent]
    });
    fixture = TestBed.createComponent(F7HospitalServiceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
