import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F2AccountSettingComponent } from './f2-account-setting.component';

describe('F2AccountSettingComponent', () => {
  let component: F2AccountSettingComponent;
  let fixture: ComponentFixture<F2AccountSettingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F2AccountSettingComponent]
    });
    fixture = TestBed.createComponent(F2AccountSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
