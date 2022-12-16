import { TestBed } from '@angular/core/testing';

import { NgxBreadcrumbProviderService } from './ngx-breadcrumb-provider.service';
import { BreadcrumbService } from './breadcrumb/services/breadcrumb.service';

describe('NgxBreadcrumbProviderService', () => {
  let service: NgxBreadcrumbProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: BreadcrumbService,
          useValue: createBreadcrumbServiceMock(),
        },
      ],
    });
    service = TestBed.inject(NgxBreadcrumbProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call setStickyRootBreadcrumbs', () => {
    const breadcrumbService = TestBed.inject(BreadcrumbService);
    service.setStickyRootBreadcrumbs();
    expect(breadcrumbService.setStickyRootBreadcrumbs).toHaveBeenCalled();
  });
});

function createBreadcrumbServiceMock(): Partial<BreadcrumbService> {
  return {
    setStickyRootBreadcrumbs: jest.fn(),
  };
}
