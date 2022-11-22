import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Breadcrumb } from './breadcrumb.model';
import { BreadcrumbService } from './breadcrumb.service';

@Component({
  selector: 'ngx-breadcrumbs',
  template: ` <ngx-breadcrumbs-container
    role="navigation"
    aria-label="breadcrumbs"
    [fixedLead]="(fixedLead$ | async)!"
    [fixedTail]="(fixedTail$ | async)!"
  >
    <ng-container    *ngFor="let breadcrumb of breadcrumbs$ | async; let last = last">
      <ng-container *ngIf='breadcrumbTemplate; else defaultBreadcrumb'>
        <ng-container *ngTemplateOutlet="breadcrumbTemplate; context: { $implicit: breadcrumb, last:last }"></ng-container>
      </ng-container>
      <ng-template #defaultBreadcrumb>
        <ngx-breadcrumb
          [last]="last"
          [breadcrumb]="breadcrumb"
        >
        </ngx-breadcrumb>
      </ng-template>


      <ng-container *ngIf="!last">
        <div class='separator-container'>
          <ng-container *ngIf='separatorTemplate; else defaultSeparator'>
            <ng-container *ngTemplateOutlet="separatorTemplate"></ng-container>
          </ng-container>

          <ng-template #defaultSeparator>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="separator-icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </ng-template>

        </div>

      </ng-container>
    </ng-container>

  </ngx-breadcrumbs-container>`,
  styles: [`
    .separator-container {
      box-sizing: border-box;
      height:  (var(--ngx-separator-container-height, 100%));
      width:  (var(--ngx-separator-container-width, auto));
      background-color: (var(--ngx-separator-container-bg-color, inherit));
      padding: (var(--ngx-separator-container-padding, 0));
      margin: (var(--ngx-separator-container-margin, 0));
    }
    .separator-icon {
      box-sizing: border-box;
      color: (var(--ngx-separator-icon-color, #334155));
      height: (var(--ngx-separator-icon-height, 24px));
      width: (var(--ngx-separator-icon-width, 24px));
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxBreadcrumbsComponent {
  @Input() separatorTemplate: TemplateRef<unknown> | null = null;
  @Input() breadcrumbTemplate: TemplateRef<unknown> | null = null;

  breadcrumbs$: Observable<Breadcrumb[]> =
    this.breadcrumbsService.breadcrumbs$;
  fixedLead$: Observable<number> = this.breadcrumbsService.fixedLead$;
  fixedTail$: Observable<number> = this.breadcrumbsService.fixedTail$;
  constructor(private readonly breadcrumbsService: BreadcrumbService) {}

}
