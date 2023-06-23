import { inject, InjectionToken } from '@angular/core';
import { DefaultNgxBreadcrumbTranslationAdapterService } from './default-ngx-breadcrumb-translation-adapter.service';

/**
 * @public
 */
export interface NgxBreadcrumbTranslationAdapter {
  translate: (key: string | undefined | null) => string;
}

const NGX_TRANSLATION_ADAPTER =
  new InjectionToken<NgxBreadcrumbTranslationAdapter>(
    'Translation adaptor for ngx-breadcrumbs',
    {
      providedIn: 'root',
      factory: () => inject(DefaultNgxBreadcrumbTranslationAdapterService),
    }
  );

/**
 * @public
 */
export function provideNgxBreadcrumbTranslationAdapter(
  adapter: NgxBreadcrumbTranslationAdapter
) {
  return {
    provide: NGX_TRANSLATION_ADAPTER,
    useExisting: adapter,
  };
}

/**
 * @internal
 */
export function internalinjectNgxBreadcrumbTranslationAdapter() {
  return inject(NGX_TRANSLATION_ADAPTER, { optional: true });
}
/**
 * @internal
 */
export function injectNgxBreadcrumbTranslationAdapter() {
  return (
    internalinjectNgxBreadcrumbTranslationAdapter() ??
    inject(DefaultNgxBreadcrumbTranslationAdapterService)
  );
}
