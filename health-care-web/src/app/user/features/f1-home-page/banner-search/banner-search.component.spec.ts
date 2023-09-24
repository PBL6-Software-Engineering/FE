import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerSearchComponent } from './banner-search.component';

describe('BannerSearchComponent', () => {
  let component: BannerSearchComponent;
  let fixture: ComponentFixture<BannerSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BannerSearchComponent]
    });
    fixture = TestBed.createComponent(BannerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
