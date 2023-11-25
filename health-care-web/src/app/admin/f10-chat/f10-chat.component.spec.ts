import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F10ChatComponent } from './f10-chat.component';

describe('F10ChatComponent', () => {
  let component: F10ChatComponent;
  let fixture: ComponentFixture<F10ChatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F10ChatComponent],
    });
    fixture = TestBed.createComponent(F10ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
