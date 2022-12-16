import { Injectable } from '@angular/core';
import { BreadcrumbService } from './breadcrumb/services/breadcrumb.service';
import { Breadcrumb } from './breadcrumb/types/breadcrumb.model';

/**
 * @publicApi
 * Service for manipulating the breadcrumbs.
 */
@Injectable({
  providedIn: 'root',
})
export class NgxBreadcrumbProviderService {
  constructor(private readonly breadcrumbService: BreadcrumbService) {}
  /**
   * Set a list of breadcrumbs, which should always be rendered first
   */
  setStickyRootBreadcrumbs(...items: Breadcrumb[]): void {
    this.breadcrumbService.setStickyRootBreadcrumbs(...items);
  }
}
