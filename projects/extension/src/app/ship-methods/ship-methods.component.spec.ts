import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipMethodsComponent } from './ship-methods.component';

describe('ShipMethodsComponent', () => {
  let component: ShipMethodsComponent;
  let fixture: ComponentFixture<ShipMethodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipMethodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
