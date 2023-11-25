import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F8ConversationsComponent } from './f8-conversations.component';

describe('F8ConversationsComponent', () => {
  let component: F8ConversationsComponent;
  let fixture: ComponentFixture<F8ConversationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F8ConversationsComponent],
    });
    fixture = TestBed.createComponent(F8ConversationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
