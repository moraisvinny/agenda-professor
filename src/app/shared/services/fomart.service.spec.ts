import { TestBed } from '@angular/core/testing';

import { FomartService } from './fomart.service';

describe('FomartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FomartService = TestBed.get(FomartService);
    expect(service).toBeTruthy();
  });
});
