import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ngx-breadcrumb-root-breadcrumb',
  template: `<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M11 39h7.5V26.5h11V39H37V19.5L24 9.75 11 19.5Zm-3 3V18L24 6l16 12v24H26.5V29.5h-5V42Zm16-17.65Z"/></svg>`,
  styles: [],
})
export class RootBreadcrumbComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

@NgModule({
  imports: [CommonModule],
  declarations: [RootBreadcrumbComponent],
  exports: [RootBreadcrumbComponent],
})
export class RootBreadcrumbComponentModule {}
