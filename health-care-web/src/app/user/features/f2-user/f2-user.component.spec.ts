import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F2UserComponent } from './f2-user.component';

describe('F2UserComponent', () => {
  let component: F2UserComponent;
  let fixture: ComponentFixture<F2UserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F2UserComponent]
    });
    fixture = TestBed.createComponent(F2UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
