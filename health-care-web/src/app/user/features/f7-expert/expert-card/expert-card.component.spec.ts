import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertCardComponent } from './expert-card.component';

describe('ExpertCardComponent', () => {
  let component: ExpertCardComponent;
  let fixture: ComponentFixture<ExpertCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpertCardComponent]
    });
    fixture = TestBed.createComponent(ExpertCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
