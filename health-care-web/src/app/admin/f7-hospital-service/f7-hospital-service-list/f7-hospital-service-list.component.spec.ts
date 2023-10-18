import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F7HospitalServiceListComponent } from './f7-hospital-service-list.component';

describe('F7HospitalServiceListComponent', () => {
  let component: F7HospitalServiceListComponent;
  let fixture: ComponentFixture<F7HospitalServiceListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F7HospitalServiceListComponent]
    });
    fixture = TestBed.createComponent(F7HospitalServiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
