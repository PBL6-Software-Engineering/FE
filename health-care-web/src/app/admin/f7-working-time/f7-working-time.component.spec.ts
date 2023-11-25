import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F7WorkingTimeComponent } from './f7-working-time.component';

describe('F7WorkingTimeComponent', () => {
  let component: F7WorkingTimeComponent;
  let fixture: ComponentFixture<F7WorkingTimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F7WorkingTimeComponent],
    });
    fixture = TestBed.createComponent(F7WorkingTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
