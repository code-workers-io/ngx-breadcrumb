import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from './breadcrumb/breadcrumbs.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { RouterOutletTrackerDirective } from './breadcrumb/router-outlet-tracker.directive';
import { NgxBreadcrumbsComponent } from './breadcrumb/ngx-breadcrumbs.component';
import { BreadcrumbConsoleSettings } from './breadcrumb/breadcrumb-console';
import {
  NGX_BREADCRUMB_CONFIG,
  NgxBreadcrumbConfig,
} from './config/ngx-breadcrumb-config';
import { NgxBreadcrumbTranslatorPipe } from './translation-adapter/ngx-breadcrumb-translator.pipe';

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [
    BreadcrumbsComponent,
    BreadcrumbComponent,
    RouterOutletTrackerDirective,
    NgxBreadcrumbsComponent,
    NgxBreadcrumbTranslatorPipe,
  ],
  declarations: [
    BreadcrumbsComponent,
    BreadcrumbComponent,
    RouterOutletTrackerDirective,
    NgxBreadcrumbsComponent,
    NgxBreadcrumbTranslatorPipe,
  ],
})
export class NgxBreadcrumbModule {
  static withConfig(
    options?: NgxBreadcrumbConfig
  ): ModuleWithProviders<NgxBreadcrumbModule> {
    return {
      ngModule: NgxBreadcrumbModule,
      providers: [
        {
          provide: NGX_BREADCRUMB_CONFIG,
          useValue: options ?? null,
        },
      ],
    };
  }
  public static setDebug(arg: boolean) {
    BreadcrumbConsoleSettings.enabled = arg || false;
  }
  public static getDebug(): boolean {
    return BreadcrumbConsoleSettings.enabled || false;
  }
}
