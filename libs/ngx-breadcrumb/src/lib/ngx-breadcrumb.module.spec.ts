import { TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { Component, ViewChild } from '@angular/core';
import { NgxBreadcrumbModule } from './ngx-breadcrumb.module';
import { BreadcrumbsComponent } from './breadcrumb/components/breadcrumbs.component';
import { BreadcrumbComponent } from './breadcrumb/components/breadcrumb.component';
import { BreadcrumbService } from './breadcrumb/services/breadcrumb.service';
import { RouterOutletTrackerDirective } from './breadcrumb/router-outlet-tracker.directive';

describe('NgxBreadcrumbModule', () => {
  let breadcrumbModule: NgxBreadcrumbModule;

  beforeEach(() => {
    breadcrumbModule = new NgxBreadcrumbModule();
  });

  it('should create an instance', () => {
    expect(breadcrumbModule).toBeTruthy();
  });
});

describe('BreadcrumbModule with TestBed', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, NgxBreadcrumbModule],
      declarations: [RouterOutletTestComponent],
    });
  });

  it('should create BreadcrumbsComponent', () => {
    const component = TestBed.createComponent(BreadcrumbsComponent);
    expect(component.componentInstance).toBeDefined();
  });
  it('should create BreadcrumbComponent', () => {
    const component = TestBed.createComponent(BreadcrumbComponent);
    expect(component.componentInstance).toBeDefined();
  });
  it('should create RouterOutletTrackerDirective', () => {
    const component = TestBed.createComponent(RouterOutletTestComponent);
    expect(component.componentInstance.directive).toBeDefined();
  });
  it('should create default BreadcrumbService', () => {
    const service = TestBed.inject(BreadcrumbService);
    expect(service).toBeDefined();
    expect(service).toBeInstanceOf(BreadcrumbService);
  });
});

@Component({
  selector: 'test-router-outlet',
  template: '<router-outlet></router-outlet>',
})
class RouterOutletTestComponent {
  @ViewChild(RouterOutletTrackerDirective, { static: true })
  directive!: RouterOutletTrackerDirective;
}
