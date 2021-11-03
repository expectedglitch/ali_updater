import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesUpdateComponent } from './countries-update.component';

describe('CountriesUpdateComponent', () => {
  let component: CountriesUpdateComponent;
  let fixture: ComponentFixture<CountriesUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountriesUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountriesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
