import { EventEmitter, InjectionToken, Type } from '@angular/core';
import { BreadcrumbData } from '../breadcrumb/types/breadcrumb-data.model';
import { Breadcrumb } from '../breadcrumb/types/breadcrumb.model';

export interface BreadcrumbComponent {
  click: EventEmitter<void>;
}

export interface StickyRootBreadcrumbConfig {
  component: Type<BreadcrumbComponent>;
  data: BreadcrumbData;
}

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

export const NGX_BREADCRUMB_CONFIG = new InjectionToken<NgxBreadcrumbConfig>(
  'ngx-breadcrumb-config',
  {
    providedIn: 'root',
    factory: () => ({}),
  }
);
