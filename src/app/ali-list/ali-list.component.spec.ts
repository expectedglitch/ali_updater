import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AliListComponent } from './ali-list.component';

describe('AliListComponent', () => {
  let component: AliListComponent;
  let fixture: ComponentFixture<AliListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AliListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AliListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
