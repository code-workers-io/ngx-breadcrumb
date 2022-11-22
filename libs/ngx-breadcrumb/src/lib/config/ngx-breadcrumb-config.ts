import { InjectionToken } from '@angular/core';
import { Breadcrumb } from '../breadcrumb/breadcrumb.model';

export interface NgxBreadcrumbConfig {
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
  }
}

export const NGX_BREADCRUMB_CONFIG = new InjectionToken<NgxBreadcrumbConfig>('ngx-breadcrumb-config', {
  providedIn: 'root',
  factory: () => ({}),
});
