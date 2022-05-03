import { TestBed } from '@angular/core/testing';

import { TechnitianService } from './technitian.service';

describe('TechnitianService', () => {
  let service: TechnitianService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechnitianService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
