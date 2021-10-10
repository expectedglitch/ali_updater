import { TestBed } from '@angular/core/testing';

import { RelDBInterceptor } from './reldb-interceptor';

describe('RelDBInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RelDBInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: RelDBInterceptor = TestBed.inject(RelDBInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
