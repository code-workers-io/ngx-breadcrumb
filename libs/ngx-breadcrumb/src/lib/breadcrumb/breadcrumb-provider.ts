import { BreadcrumbData } from './breadcrumb-data.model';

/**
 * Components implementing this interface express will to be providing text for the breadcrumb.
 */
export interface BreadcrumbProvider {
  getBreadcrumb(): BreadcrumbData;
}

/**
 * Typeguard function for {@link `BreadcrumbProvider`}
 * @param arg
 */
export function isBreadcrumbProvider(arg: { getBreadcrumb: any; }): arg is BreadcrumbProvider {
  return !!arg && !!arg.getBreadcrumb;
}
