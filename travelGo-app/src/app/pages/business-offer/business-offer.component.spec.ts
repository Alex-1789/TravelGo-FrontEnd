import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessOfferComponent } from './business-offer.component';

describe('BusinessOfferComponent', () => {
  let component: BusinessOfferComponent;
  let fixture: ComponentFixture<BusinessOfferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessOfferComponent]
    });
    fixture = TestBed.createComponent(BusinessOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
