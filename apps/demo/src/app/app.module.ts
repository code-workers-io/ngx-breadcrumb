import {Injectable, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import {
  NGX_TRANSLATION_ADAPTER,
  NgxBreadcrumbModule,
  NgxBreadcrumbTranslationAdapter
} from "@code-workers.io/ngx-breadcrumb";
import {RouterModule, Routes} from "@angular/router";
import {Breadcrumb} from "../../../../libs/ngx-breadcrumb/src/lib/breadcrumb/breadcrumb.model";
import {OneComponent} from "./one.component";
import {OneOneComponent} from "./one-one.component";
import {TwoComponent} from "./two.component";
@Injectable({providedIn: 'root'})
class translator implements NgxBreadcrumbTranslationAdapter {
  translate(key: string | undefined | null): string {
    return `${key} translated`;
  }

}

const routes: Routes = [
  { path: 'one', component: OneComponent, data: { breadcrumb: 'One' }, children: [
      { path: 'one', component: OneOneComponent, data: { breadcrumb: 'OneOne' } }
    ] },
  { path: 'two', component: TwoComponent, data: { breadcrumb: 'Two' } },
]
@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, OneComponent, OneOneComponent, TwoComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes), NgxBreadcrumbModule.withConfig({
    stickyRoot: [
      new Breadcrumb('Home', '/'),
      new Breadcrumb('Home1', '/')
    ],
    breadcrumbCount: {
      fixedLead: 5,
      fixedTail: 5,
    }
  })],
  providers: [{ provide: NGX_TRANSLATION_ADAPTER, useClass: translator}],
  bootstrap: [AppComponent],
})
export class AppModule {}
