import { TestBed } from '@angular/core/testing';

import { DefaultNgxBreadcrumbTranslationAdapterService } from './default-ngx-breadcrumb-translation-adapter.service';

describe('DefaultNgxBreadcrumbTranslatorService', () => {
  let service: DefaultNgxBreadcrumbTranslationAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultNgxBreadcrumbTranslationAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('translate', () => {
    it('should return the same value', () => {
      expect(service.translate('test')).toBe('test');
    });
  });
});
