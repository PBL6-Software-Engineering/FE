import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthParentingComponent } from './health-parenting.component';

describe('HealthParentingComponent', () => {
  let component: HealthParentingComponent;
  let fixture: ComponentFixture<HealthParentingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HealthParentingComponent]
    });
    fixture = TestBed.createComponent(HealthParentingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
