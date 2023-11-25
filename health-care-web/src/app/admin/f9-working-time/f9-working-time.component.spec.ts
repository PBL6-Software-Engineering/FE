import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F9WorkingTimeComponent } from './f9-working-time.component';

describe('F9WorkingTimeComponent', () => {
  let component: F9WorkingTimeComponent;
  let fixture: ComponentFixture<F9WorkingTimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F9WorkingTimeComponent]
    });
    fixture = TestBed.createComponent(F9WorkingTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
