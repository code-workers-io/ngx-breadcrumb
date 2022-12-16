import { Inject, Injectable, OnDestroy, Optional } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  PRIMARY_OUTLET,
  Router,
} from '@angular/router';
import { asyncScheduler, BehaviorSubject, Subscription } from 'rxjs';
import { filter, map, observeOn } from 'rxjs/operators';
import { RouterOutletTrackerService } from './router-outlet-tracker.service';
import { Breadcrumb } from '../types/breadcrumb.model';

import {
  NGX_BREADCRUMB_CONFIG,
  NgxBreadcrumbConfig,
} from '../../config/ngx-breadcrumb-config';
import { BreadcrumbFactoryService } from './breadcrumb-factory.service';
import { DEFAULT_FIXED_LEAD, DEFAULT_FIXED_TAIL } from '../../config/constants';
import {log} from "../utils/breadcrumb-console";

/**
 * @privateApi
 * Central service for breadcrumb management.
 *
 * Listens to router events and automatically updates the breadcrumb bar on navigation.
 *
 * This implementation pulls the data required for breadcrumb generation from the router configuration
 * as well as from components implementing the {@link BreadcrumbProvider} interface.
 *
 */
@Injectable({ providedIn: 'root' })
export class BreadcrumbService implements OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private _breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);
  readonly breadcrumbs$ = this._breadcrumbs$.asObservable();
  private _fixedLead$ = new BehaviorSubject<number>(
    this.config?.breadcrumbCount?.fixedLead || DEFAULT_FIXED_LEAD
  );
  readonly fixedLead$ = this._fixedLead$.asObservable();
  private _fixedTail$ = new BehaviorSubject<number>(
    this.config?.breadcrumbCount?.fixedTail || DEFAULT_FIXED_TAIL
  );
  readonly fixedTail$ = this._fixedTail$.asObservable();
  private _stickyRootBreadcrumbs: Breadcrumb[] = [];

  constructor(
    route: ActivatedRoute,
    private router: Router,
    private tracker: RouterOutletTrackerService,
    private breadcrumbFactory: BreadcrumbFactoryService,
    @Optional()
    @Inject(NGX_BREADCRUMB_CONFIG)
    private config: NgxBreadcrumbConfig
  ) {
    if (config?.stickyRoot) {
      this.setStickyRootBreadcrumbs(...config.stickyRoot);
    }
    // @ts-ignore
    this.subscriptions.add(
      router.events
        .pipe(
          observeOn(asyncScheduler),
          filter((event) => event instanceof NavigationEnd),
          map((_) =>
            Array.from(PrimaryOutletActivatedRouteIterator.from(route.snapshot))
          ),
          map((routes: ActivatedRouteSnapshot[]) =>
            this.buildBreadcrumbs(routes)
          )
        )
        // @ts-ignore
        .subscribe((breadcrumbs) => this._breadcrumbs$.next(breadcrumbs))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  /**
   * Set the amount of leading breadcrumbs to be visible
   */
  setFixedLead(val: number): void {
    this._fixedLead$.next(val);
  }

  /**
   * Set the amount of trailing breadcrumbs to be visible
   */
  setFixedTail(val: number): void {
    this._fixedTail$.next(val);
  }

  /**
   * Set a list of breadcrumbs, which should always be rendered first
   */
  setStickyRootBreadcrumbs(...items: Breadcrumb[]): void {
    this._stickyRootBreadcrumbs = items;
  }

  private buildBreadcrumbs(
    routes: ActivatedRouteSnapshot[]
  ): (Breadcrumb | null)[] {
    log('[Breadcrumb Service] building breadcrumbs for %O', routes);

    const result = routes
      .map((route) => this.breadcrumbFactory.create(route))
      .filter((breadcrumb) => !!breadcrumb);

    result.unshift(...(this._stickyRootBreadcrumbs || []));

    return result;
  }
}

/**
 * Iterator that returns the complete PRIMARY_OUTLET route branch
 */
class PrimaryOutletActivatedRouteIterator
  implements Iterator<ActivatedRouteSnapshot>
{
  constructor(private _next: ActivatedRouteSnapshot) {}

  static from(route: ActivatedRouteSnapshot): Iterable<ActivatedRouteSnapshot> {
    return {
      [Symbol.iterator]() {
        return new PrimaryOutletActivatedRouteIterator(route);
      },
    };
  }

  next(): IteratorResult<ActivatedRouteSnapshot> {
    const route = this._next;
    // @ts-ignore
    this._next =
      (route &&
        route.children.find((child) => child.outlet === PRIMARY_OUTLET)) ||
      null;
    return { value: route, done: route === null };
  }
}
