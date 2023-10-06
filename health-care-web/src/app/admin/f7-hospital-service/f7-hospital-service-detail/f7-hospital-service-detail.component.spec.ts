import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F7HospitalServiceDetailComponent } from './f7-hospital-service-detail.component';

describe('F7HospitalServiceDetailComponent', () => {
  let component: F7HospitalServiceDetailComponent;
  let fixture: ComponentFixture<F7HospitalServiceDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F7HospitalServiceDetailComponent]
    });
    fixture = TestBed.createComponent(F7HospitalServiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
