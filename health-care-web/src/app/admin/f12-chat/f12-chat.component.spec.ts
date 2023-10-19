import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F12ChatComponent } from './f12-chat.component';

describe('F12ChatComponent', () => {
  let component: F12ChatComponent;
  let fixture: ComponentFixture<F12ChatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F12ChatComponent]
    });
    fixture = TestBed.createComponent(F12ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
