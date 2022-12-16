import { Type } from '@angular/core';
import { BreadcrumbData } from './breadcrumb-data.model';
import { StickyBreadcrumbComponent } from './sticky-breadcrumb-component';

export interface StickyRootBreadcrumbConfig {
  component: Type<StickyBreadcrumbComponent>;
  data: BreadcrumbData;
}
