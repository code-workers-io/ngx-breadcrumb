import { Injectable } from '@angular/core';
import { Breadcrumb } from './types/breadcrumb.model';
import { BreadcrumbService } from './breadcrumb/breadcrumb.service';

/**
 * @publicApi
 * Service for manipulating the breadcrumbs.
 */
@Injectable({
  providedIn: 'root'
})
export class NgxBreadcrumbProviderService {

  constructor(private readonly breadcrumbService: BreadcrumbService) { }
  /**
   * Set a list of breadcrumbs, which should always be rendered first
   */
  setStickyRootBreadcrumbs(
    ...items:  Breadcrumb[]
  ): void {
    this.breadcrumbService.setStickyRootBreadcrumbs(...items)
  }
}
