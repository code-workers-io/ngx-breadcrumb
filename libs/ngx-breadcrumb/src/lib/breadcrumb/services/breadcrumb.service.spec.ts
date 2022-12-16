import { TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { RouterOutletTrackerService } from './router-outlet-tracker.service';
import { BreadcrumbService } from './breadcrumb.service';

describe('BreadcrumbService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [BreadcrumbService, RouterOutletTrackerService],
    })
  );

  it('should be created', () => {
    const service: BreadcrumbService = TestBed.inject(BreadcrumbService);
    expect(service).toBeTruthy();
  });
});
