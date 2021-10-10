import { TestBed } from '@angular/core/testing';

import { LoadingGuard as LoadingGuard } from './loading-guard';

describe('ProductsLoadingGuardService', () => {
  let service: LoadingGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
