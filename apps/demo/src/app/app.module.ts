import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import {
  Breadcrumb,
  NgxBreadcrumbsComponent,
  NgxBreadcrumbTranslationAdapter,
  provideNgxBreadcrumbConfig,
  provideNgxBreadcrumbTranslationAdapter,
} from '@code-workers.io/ngx-breadcrumb';
import {provideRouter, RouterOutlet, Routes} from '@angular/router';

import { OneComponent } from './one.component';
import { OneOneComponent } from './one-one.component';
import { TwoComponent } from './two.component';
import {
  RootBreadcrumbComponent,
  RootBreadcrumbComponentModule,
} from './root-breadcrumb.component';
@Injectable({ providedIn: 'root' })
class translator implements NgxBreadcrumbTranslationAdapter {
  translate(key: string | undefined | null): string {
    // here you would actually call your translation service
    return `👉🏻 ${key}`;
  }
}

const routes: Routes = [
  {
    path: 'one',
    component: OneComponent,
    data: { breadcrumb: 'One' },
    children: [
      {
        path: 'one',
        component: OneOneComponent,
        data: { breadcrumb: 'OneOne' },
      },
    ],
  },
  { path: 'two', component: TwoComponent, data: { breadcrumb: 'Two' } },
];
@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    OneComponent,
    OneOneComponent,
    TwoComponent,
  ],
  imports: [BrowserModule, RootBreadcrumbComponentModule, NgxBreadcrumbsComponent, RouterOutlet],
  providers: [
    provideRouter(routes),
    //provideNgxBreadcrumbTranslationAdapter(translator),
    provideNgxBreadcrumbConfig({
      stickyRoot: [
       new Breadcrumb('Home', '/'),
       new Breadcrumb('Home1', '/')
     ],
      breadcrumbCount: {
        fixedLead: 5,
        fixedTail: 5,
      },
/*      stickyRootComponent: {
        component: RootBreadcrumbComponent,
        data: {
          label: 'Home',
          link: '/',
        },
      },*/
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
