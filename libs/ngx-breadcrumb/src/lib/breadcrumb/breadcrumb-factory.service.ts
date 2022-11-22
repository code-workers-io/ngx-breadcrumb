import { ActivatedRouteSnapshot, UrlSegment } from '@angular/router';
import { Observable, of } from 'rxjs';
import { RouterOutletTrackerService } from './router-outlet-tracker.service';
import { BreadcrumbProvider, isBreadcrumbProvider } from './breadcrumb-provider';
import { BreadcrumbData, isBreadcrumbData } from './breadcrumb-data.model';
import { Breadcrumb } from './breadcrumb.model';
import { error, log } from './breadcrumb-console';
import { Injectable } from '@angular/core';


@Injectable({providedIn: 'root'})
export class BreadcrumbFactoryService   {
  /**
   * Creates a new `Breadcrumb` instance based on the provided route.
   *
   * Extracts breadcrumb data from both, the route data and the component
   * (if it implements the BreadcrumbProvider interface).
   *
   * * Returns `null` if the route's `data.breadcrumb` attribute is set to `false`.
   * * If no breadcrumb label can be determined this method returns `null` to avoid breadcrumb generation.
   */
  create(route: ActivatedRouteSnapshot): Breadcrumb | null {
    const component = this.tracker.getActiveComponent(route.component);

    // fail-fast; should never happen
    if (!route) {
      error(
        '[Breadcrumb Factory] NullPointerException: route must not be null',
      );
      return null;
    }

    const routeData = (route.routeConfig && route.routeConfig.data) || {};
    const routeUrl = this.getUrlSegments(route)
      .map((segment) => segment.path)
      .join('/');

    // do not generate breadcrumb for this route
    if (routeData['breadcrumb'] === false) {
      log(
        '[Breadcrumb Factory] breadcrumb disabled for %O ("%s")',
        route,
        routeUrl,
      );
      return null;
    }

    if (!!route.parent && !!route.component && !component) {
      error(
        '[Breadcrumb Factory] could not find active component for %O ("%s").\n' +
          'Have you thought of importing the BreadcrumbModule into the declaring feature module?',
        route,
        routeUrl,
      );
    }

    // do not generate breadcrumb for this route
    if (!routeData['breadcrumb'] && !isBreadcrumbProvider(component)) {
      log(
        '[Breadcrumb Factory] breadcrumb not configured for %O ("%s")',
        route,
        routeUrl,
      );
      return null;
    }

    const bcFromComponent = this.getBreadcrumbDataFromComponent(component);
    const bcFromRoute = this.getBreadcrumbDataFromRoute(route);
    const bc = this.mergeBreadcrumbData(bcFromRoute, bcFromComponent);

    // if link is a boolean, we use the route or undefined. If link is a string, we assume it to be a valid URL...
    if (typeof bc?.link === 'boolean') {
      bc.link = (bc?.link && routeUrl) || undefined;
    }

    log(
      '[Breadcrumb Factory] identified breadcrumb data %o for %O ("%s")',
      bc,
      route,
      routeUrl,
    );

    return new Breadcrumb(bc?.label, bc?.link);
  }

  /**
   * Extracts Breadcrumb data from component
   *
   * If the component implements the `BreadcrumbProvider` interface, its `getBreadcrumb()` method is called.
   *
   * > **Notice:** this method just checks if a `getBreadcrumb()` method is present!
   */
  private getBreadcrumbDataFromComponent(
    component: BreadcrumbProvider | never,
  ): BreadcrumbData | null {
    return (
      (isBreadcrumbProvider(component) && component.getBreadcrumb()) ||
      null
    );
  }

  /**
   * Extracts Breadcrumb data from `ActivatedRouteSnapshot`.
   *
   * > **Notice:** uses `routeConfig.data` instead of `data` to prevent use of
   * > inherited data as mentioned at https://github.com/angular/angular/issues/12767#issuecomment-260493205
   *
   * @param route
   */
  private getBreadcrumbDataFromRoute(
    route: ActivatedRouteSnapshot,
  ): BreadcrumbData | null{
    const routeData =
      (route && route.routeConfig && route.routeConfig.data) || {};
    if (!routeData || !routeData['breadcrumb']) {
      return null;
    }
    if (typeof routeData['breadcrumb'] === 'string') {
      return { label: routeData['breadcrumb'] };
    }
    // if (routeData['breadcrumb'] instanceof Observable) {
    //   return { label: routeData['breadcrumb'], link: true };
    // }
    if (isBreadcrumbData(routeData['breadcrumb'])) {
      return routeData['breadcrumb'];
    }
    return null;
  }

  /**
   * Helper function used by {@link BreadcrumbFactoryService}.
   *
   * Merge two BreadcrumbData objects according to the following rules:
   * * if attribute `label` is present in both, route and component data, `merge` them into a single observable, route data first
   * * if attribute `label` is present on just one of the two, use it as-is
   * * use attribute `link` from route data if present, else fallback to component data
   * * if neither route data nor component data is defined, return null
   *
   * @param fromRoute
   * @param fromComponent
   */
  private mergeBreadcrumbData(
    fromRoute: BreadcrumbData | null,
    fromComponent: BreadcrumbData | null
  ): BreadcrumbData | null {
    if (!fromRoute && !fromComponent) {
      return null;
    }

    const labelFromRoute = fromRoute && fromRoute.label;
    const labelFromComponent = fromComponent && fromComponent.label;
    const linkFromRoute = fromRoute && fromRoute.link;
    const linkFromComponent = fromComponent && fromComponent.link;

    const result: BreadcrumbData = { label: undefined, link: true };
    if (labelFromComponent) {
      result.label = labelFromComponent;
    } else if (labelFromRoute) {
      result.label = labelFromRoute;
    }

    if ('string boolean'.includes(typeof linkFromRoute)) {
      result.link = linkFromRoute;
    } else if ('string boolean'.includes(typeof linkFromComponent)) {
      result.link = linkFromComponent;
    }
    return result;
  }

  /**
   * Returns all UrlSegments from provided route to root path
   * (non-recursive version)
   */
  private getUrlSegments(route: ActivatedRouteSnapshot | null | undefined): UrlSegment[] {
    const result = [];
    do {
      if (route?.url){
        result.unshift(...route.url);
      }

      route = route?.parent;
    } while (route);
    return result;
  }

  /**
   * Wrap {arg} into an observable or return unchanged if it already is an observable
   */
  private wrap<T>(arg: Observable<T> | T): Observable<T> {
    return arg instanceof Observable ? arg : of(arg);
  }

  /**
   * Create a new BreadcrumbFactoryService instance
   *
   * @param tracker a service providing active `Component` instances
   */
  constructor(private tracker: RouterOutletTrackerService) {}
}

/*
 * Important information on how route data is inherited:
 * - Resolved data is derived from params. So the rules apply to params and data in the same way.
 * - An empty-path route inherits its parent's params and data. This is because it cannot have its own params
 *   (it's an empty-path route), and, as a result, it often uses its parent's params and data as its own.
 * - Any route inherits its parent's params and data if the parent is a componentless route.
 *   This is because there is no component that can inject the parent's activated route.
 * - Nothing else gets inherited.
 *
 * Source: Victor Savkin (https://github.com/angular/angular/issues/12767#issuecomment-260493205)
 */
