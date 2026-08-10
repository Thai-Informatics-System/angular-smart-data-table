import { TestBed } from '@angular/core/testing';

import { AngularSmartDataTableService } from './angular-smart-data-table.service';

describe('AngularSmartDataTableService', () => {
  let service: AngularSmartDataTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularSmartDataTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
