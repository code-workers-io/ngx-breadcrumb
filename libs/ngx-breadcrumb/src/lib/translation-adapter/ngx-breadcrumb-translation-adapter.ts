import { inject, InjectionToken } from '@angular/core';
import { DefaultNgxBreadcrumbTranslationAdapterService } from './default-ngx-breadcrumb-translation-adapter.service';

export interface NgxBreadcrumbTranslationAdapter {
  translate: (key: string | undefined | null) => string;
}

export const NGX_TRANSLATION_ADAPTER =
  new InjectionToken<NgxBreadcrumbTranslationAdapter>(
    'Translation adaptor for ngx-breadcrumbs',
    {
      providedIn: 'root',
      factory: () => inject(DefaultNgxBreadcrumbTranslationAdapterService),
    }
  );
