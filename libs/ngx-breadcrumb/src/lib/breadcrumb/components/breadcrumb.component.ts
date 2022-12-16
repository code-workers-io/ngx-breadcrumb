import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { delay, map, switchMap, tap } from 'rxjs/operators';
import { combineLatest, of, ReplaySubject } from 'rxjs';
import { Breadcrumb } from '../types/breadcrumb.model';
import { getRouteFromUrl } from '../utils/get-route-from-url';

/**
 * Renders a single breadcrumb.
 */
@Component({
  selector: 'ngx-breadcrumb',
  template: `
    <ng-container *ngIf="componentContext$ | async as ctx">
      <ng-container
        *ngIf="last || ctx.breadcrumb?.url === undefined; else internalLink"
      >
        {{ ctx.label | ngxBreadcrumbTranslator: ctx.omitted }}
      </ng-container>
      <ng-template #internalLink>
        <a
          *ngIf="ctx.routerLink !== undefined; else externalBreadcrumb"
          [routerLink]="ctx.routerLink"
        >
          {{ ctx.label | ngxBreadcrumbTranslator: ctx.omitted }}
        </a>
      </ng-template>
      <ng-template #externalBreadcrumb>
        <a [href]="ctx.breadcrumb?.url">
          {{ ctx.label | ngxBreadcrumbTranslator: ctx.omitted }}
        </a>
      </ng-template>
    </ng-container>
  `,
  styles: [
    `
      :host {
        display: block;
        box-sizing: border-box;
        color: var(--ngx-breadcrumb-text-color, #334155);
        background-color: (var(--ngx-breadcrumb-bg-color, #e2e8f0));
        padding: (var(--ngx-breadcrumb-padding, 0.5rem));
        margin: (var(--ngx-breadcrumb-margin, 0));
        border: (var(--ngx-breadcrumb-border, none));
        border-radius: (var(--ngx-breadcrumb-border-radius, 4px));

        a {
          text-decoration: (var(--ngx-breadcrumb-link-decoration, none));
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent {
  @Input() breadcrumb!: Breadcrumb;
  @Input() last!: boolean;

  @HostBinding('attr.aria-current')
  get ariaCurrent() {
    return this.last ? 'page' : 'false';
  }

  private omitted$ = new ReplaySubject<boolean>();
  private label$ = this.omitted$.pipe(
    switchMap((omitted) => (omitted ? of('…') : of(this.breadcrumb.title)))
  );

  componentContext$ = combineLatest([this.omitted$, this.label$]).pipe(
    delay(0), // this is for fixing ExpressionChangedAfterViewInit exception on this.tooltip
    tap(([omitted, label]) => {
      this.cdref.detectChanges();
    }),
    map(([omitted, label]) => ({
      omitted,
      label,
      breadcrumb: this.breadcrumb,
      routerLink: getRouteFromUrl(this.breadcrumb && this.breadcrumb.url),
    }))
  );

  set omitted(arg: boolean) {
    this.omitted$.next(arg);
    this.cdref.detectChanges();
  }

  constructor(private cdref: ChangeDetectorRef) {}
}
