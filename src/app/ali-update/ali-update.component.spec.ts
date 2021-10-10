import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AliUpdateComponent } from './ali-update.component';

describe('AliUpdateComponent', () => {
  let component: AliUpdateComponent;
  let fixture: ComponentFixture<AliUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AliUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AliUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
