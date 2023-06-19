import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  HostBinding,
  Input,
  OnDestroy,
  QueryList,
} from '@angular/core';
import { BreadcrumbComponent } from './breadcrumb.component';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ngx-breadcrumbs-container',
  template: `<ng-content></ng-content>`,
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
        padding: (
          var(--ngx-breadcrumb-container-padding, 0.5rem 0.5rem 0.5rem 0.5rem)
        );
        margin: (var(--ngx-breadcrumb-container-margin, 0));
        width: (var(--ngx-breadcrumb-container-width, fit-content));
        background-color: (var(--ngx-breadcrumb-container-bg-color, inherit));
        gap: (var(--ngx-breadcrumb-gap-between, 0.5rem));
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class BreadcrumbsComponent implements AfterContentInit, OnDestroy {
  @HostBinding('class.breadcrumbs') readonly useHostClass = true;

  @ContentChildren(BreadcrumbComponent)
  private breadcrumbs!: QueryList<BreadcrumbComponent>;

  /**
   * Maximum number of breadcrumbs shown starting from the root.
   */
  @Input() fixedLead = 1;

  /**
   * Maximum number of breadscrumbs shown starting from the current page.
   */
  @Input() fixedTail = 2;

  private subscription = new Subscription();

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterContentInit(): void {
    this.subscription.add(
      this.breadcrumbs.changes.subscribe(() => {
        this.breadcrumbs.forEach(
          (breadcrumb, index) => (breadcrumb.omitted = !this.isShown(index))
        );
      })
    );
  }

  protected isShown(index: number) {
    return (
      index < this.fixedLead ||
      index >= this.breadcrumbs.length - this.fixedTail
    );
  }
}
