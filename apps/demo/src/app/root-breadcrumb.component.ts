import {
  Component,
  OnInit,
  NgModule,
  EventEmitter,

} from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';
import {
  StickyBreadcrumbComponent,
  BreadcrumbData,

} from '@code-workers.io/ngx-breadcrumb';

@Component({
  selector: 'ngx-breadcrumb-root-breadcrumb',
  template: `
    <svg
      (click)="onClick()"
      cursor="pointer"
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      width="24"
    >
      <path
        d="M6 19h3v-6h6v6h3v-9l-6-4.5L6 10Zm-2 2V9l8-6 8 6v12h-7v-6h-2v6Zm8-8.75Z"
      />
    </svg>
  `,
  styles: [
    `
      :host {
        display: grid;
        place-items: center;
        width: 24px;
        height: 24px;
        border: 1px solid #e2e8f0;
        border-radius: 100%;
        background-color: #e2e8f0;
        padding: 8px;
      }
    `,
  ]
})
export class RootBreadcrumbComponent implements OnInit, StickyBreadcrumbComponent {
  click: EventEmitter<void> = new EventEmitter<void>()

  constructor(private router: Router) {}

  ngOnInit(): void {}

  getBreadcrumb(): BreadcrumbData {
    return {
      label: 'Home',
      link: '/',
    };
  }

  onClick() {
    // this.router.navigate(['/']);
    this.click.emit(void 0)
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [RootBreadcrumbComponent],
  exports: [RootBreadcrumbComponent],
})
export class RootBreadcrumbComponentModule {}
