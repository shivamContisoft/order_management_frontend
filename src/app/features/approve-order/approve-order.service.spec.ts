import { TestBed } from '@angular/core/testing';

import { ApproveOrderService } from './approve-order.service';

describe('ApproveOrderService', () => {
  let service: ApproveOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApproveOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
