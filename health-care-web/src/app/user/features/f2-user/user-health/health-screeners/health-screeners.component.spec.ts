import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthScreenersComponent } from './health-screeners.component';

describe('HealthScreenersComponent', () => {
  let component: HealthScreenersComponent;
  let fixture: ComponentFixture<HealthScreenersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HealthScreenersComponent],
    });
    fixture = TestBed.createComponent(HealthScreenersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
