import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F9ChatComponent } from './f9-chat.component';

describe('F9ChatComponent', () => {
  let component: F9ChatComponent;
  let fixture: ComponentFixture<F9ChatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F9ChatComponent],
    });
    fixture = TestBed.createComponent(F9ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
