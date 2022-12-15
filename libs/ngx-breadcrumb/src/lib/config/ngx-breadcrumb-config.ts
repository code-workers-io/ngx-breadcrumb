import { InjectionToken } from '@angular/core';
import { Breadcrumb } from '../types/breadcrumb.model';


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
}

export const NGX_BREADCRUMB_CONFIG = new InjectionToken<NgxBreadcrumbConfig>(
  'ngx-breadcrumb-config',
  {
    providedIn: 'root',
    factory: () => ({}),
  }
);
