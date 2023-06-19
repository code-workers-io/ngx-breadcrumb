import { inject, InjectionToken } from '@angular/core';
import { Breadcrumb } from '../breadcrumb/types/breadcrumb.model';
import { StickyRootBreadcrumbConfig } from '../breadcrumb/types/sticky-root-breadcrumb-config';
/**
 * @public
 */
export interface NgxBreadcrumbConfig {
  /**
   * Breadcrumbs which will be always displayed in front of every other breadcrumb.
   * If stickyRootComponents is set, this property will be ignored.
   */
  stickyRoot?: Breadcrumb[];
  breadcrumbCount?: {
    /**
     * amount of leading breadcrumbs to be visible
     */
    fixedLead: number;
    /**
     * amount of trailing breadcrumbs to be visible
     */
    fixedTail: number;
  };
  stickyRootComponent?: StickyRootBreadcrumbConfig;
}

const NGX_BREADCRUMB_CONFIG = new InjectionToken<NgxBreadcrumbConfig>(
  'ngx-breadcrumb-config',
  {
    providedIn: 'root',
    factory: () => ({}),
  }
);

/**
 * @public
 */
export function provideNgxBreadcrumbConfig(config: NgxBreadcrumbConfig) {
  return {
    provide: NGX_BREADCRUMB_CONFIG,
    useValue: config,
  };
}

/**
 * @internal
 */
export function injectNgxBreadcrumbConfig() {
  return inject(NGX_BREADCRUMB_CONFIG, { optional: true });
}
