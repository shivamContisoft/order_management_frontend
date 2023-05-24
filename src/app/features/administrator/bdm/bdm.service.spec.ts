import { TestBed } from '@angular/core/testing';

import { BdmService } from './bdm.service';

describe('BdmService', () => {
  let service: BdmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BdmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
