import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipsFromComponent } from './ships-from.component';

describe('ShipsFromComponent', () => {
  let component: ShipsFromComponent;
  let fixture: ComponentFixture<ShipsFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipsFromComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipsFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
