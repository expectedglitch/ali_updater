import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EbayaliComponent } from './ebayali.component';

describe('EbayaliComponent', () => {
  let component: EbayaliComponent;
  let fixture: ComponentFixture<EbayaliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EbayaliComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EbayaliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
