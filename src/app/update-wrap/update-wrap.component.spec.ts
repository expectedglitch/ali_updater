import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWrapComponent } from './update-wrap.component';

describe('UpdateWrapComponent', () => {
  let component: UpdateWrapComponent;
  let fixture: ComponentFixture<UpdateWrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateWrapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateWrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
