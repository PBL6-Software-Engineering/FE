import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F5HospitalDetailComponent } from './f5-hospital-detail.component';

describe('F5HospitalDetailComponent', () => {
  let component: F5HospitalDetailComponent;
  let fixture: ComponentFixture<F5HospitalDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F5HospitalDetailComponent]
    });
    fixture = TestBed.createComponent(F5HospitalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
