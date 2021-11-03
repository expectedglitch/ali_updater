import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxTimeComponent } from './max-time.component';

describe('MaxTimeComponent', () => {
  let component: MaxTimeComponent;
  let fixture: ComponentFixture<MaxTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaxTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaxTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
