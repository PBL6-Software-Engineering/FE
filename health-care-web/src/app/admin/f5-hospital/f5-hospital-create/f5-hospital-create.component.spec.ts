import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F5HospitalCreateComponent } from './f5-hospital-create.component';

describe('F5HospitalCreateComponent', () => {
  let component: F5HospitalCreateComponent;
  let fixture: ComponentFixture<F5HospitalCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F5HospitalCreateComponent]
    });
    fixture = TestBed.createComponent(F5HospitalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
