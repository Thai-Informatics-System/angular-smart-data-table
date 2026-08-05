import { TestBed } from '@angular/core/testing';

import { AngularSmartTableViewerService } from './angular-smart-data-table.service';

describe('AngularSmartTableViewerService', () => {
  let service: AngularSmartTableViewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularSmartTableViewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
