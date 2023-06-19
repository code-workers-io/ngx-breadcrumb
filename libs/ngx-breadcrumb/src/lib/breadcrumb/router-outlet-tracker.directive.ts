import { Directive, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { RouterOutletTrackerService } from './services/router-outlet-tracker.service';
import { log } from './utils/breadcrumb-console';

/**
 * This directive, when available in a module, will register itself automatically on `<router-outlet>` activation and deactivation events
 * and publishes the activated/deactivated component through the {@link RouterOutletTrackerService}.
 */
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'router-outlet',
  standalone: true,
})
export class RouterOutletTrackerDirective implements OnDestroy {
  private destroyed$ = new Subject<void>();

  constructor(routerOutlet: RouterOutlet, tracker: RouterOutletTrackerService) {
    routerOutlet.activateEvents
      .pipe(takeUntil(this.destroyed$))
      .subscribe((event) => {
        log('[RouterOutletTracker] component activated: %O', event);
        tracker.componentActivated(event);
      });

    routerOutlet.deactivateEvents
      .pipe(takeUntil(this.destroyed$))
      .subscribe((event) => {
        log('[RouterOutletTracker] component deactivated: %O', event);
        tracker.componentDeactivated(event);
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
