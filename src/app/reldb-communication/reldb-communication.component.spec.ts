import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReldbCommunicationComponent } from './reldb-communication.component';

describe('ReldbCommunicationComponent', () => {
  let component: ReldbCommunicationComponent;
  let fixture: ComponentFixture<ReldbCommunicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReldbCommunicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReldbCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
