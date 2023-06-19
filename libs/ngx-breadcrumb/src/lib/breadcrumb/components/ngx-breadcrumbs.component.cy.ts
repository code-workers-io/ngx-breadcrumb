import { TestBed } from '@angular/core/testing';
import { NgxBreadcrumbsComponent } from './ngx-breadcrumbs.component';

describe(NgxBreadcrumbsComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(NgxBreadcrumbsComponent, {
      add: {
        imports: [],
        providers: [],
      },
    });
  });

  it('renders', () => {
    cy.mount(NgxBreadcrumbsComponent, {
      componentProperties: {
        separatorTemplate: null,
        breadcrumbTemplate: null,
      },
    });
  });
});
