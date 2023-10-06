import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F4AccountUserCreateComponent } from './f4-account-user-create.component';

describe('F4AccountUserCreateComponent', () => {
  let component: F4AccountUserCreateComponent;
  let fixture: ComponentFixture<F4AccountUserCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F4AccountUserCreateComponent]
    });
    fixture = TestBed.createComponent(F4AccountUserCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
