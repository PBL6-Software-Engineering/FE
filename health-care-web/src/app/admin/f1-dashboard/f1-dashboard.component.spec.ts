import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F1DashboardComponent } from './f1-dashboard.component';

describe('F1DashboardComponent', () => {
  let component: F1DashboardComponent;
  let fixture: ComponentFixture<F1DashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F1DashboardComponent],
    });
    fixture = TestBed.createComponent(F1DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
