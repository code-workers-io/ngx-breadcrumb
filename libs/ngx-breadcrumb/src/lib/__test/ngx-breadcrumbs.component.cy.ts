import {
  provideRouter,
  Router,
  RouterOutlet,
  Routes,
} from '@angular/router';
import { Component, EventEmitter, inject, OnInit } from '@angular/core';
import {NgxBreadcrumbsComponent} from "../breadcrumb/components/ngx-breadcrumbs.component";
import {NgxBreadcrumbConfig, provideNgxBreadcrumbConfig} from "../config/ngx-breadcrumb-config";
import {StickyBreadcrumbComponent} from "../breadcrumb/types/sticky-breadcrumb-component";
import {BreadcrumbData} from "../breadcrumb/types/breadcrumb-data.model";

describe(NgxBreadcrumbsComponent.name, () => {
  it('render HomeComponent', () => {
    mount();
  });

  it('should render Home breadcrumb', () => {
    mount();
    cy.get('ngx-breadcrumbs').contains('Home').should('have.length', 1);
  });
  it('should render Home and Sub breadcrumb', () => {
    const { showBreadcrumb } = mount();
    showBreadcrumb('btnTwo');
    cy.get('ngx-breadcrumb').should('have.length', 2);
  });
  it('should render 2 Breadcrumbs as Sticky Root Breadcrumb', () => {
    mount({
      bcConfig: {
        stickyRoot: [
          {
            url: '/home',
            label: 'Home',
          },
          {
            url: '/home',
            label: 'Home 2',
          },
        ],
        breadcrumbCount: {
          fixedLead: 2,
          fixedTail: 2,
        }
      },
    });
    cy.get('ngx-breadcrumb').should('have.length', 3);
  });
  it('should render RootComponent as Sticky Root Breadcrumb', () => {
    mount({
      bcConfig: {
        breadcrumbCount: {
          fixedLead: 1,
          fixedTail: 1,
        },
        stickyRootComponent: {
          component: RootBreadcrumbComponent,
          data: {
            label: 'Home',
            link: '/',
          },
        },
      },
    });
    cy.get('test-root-breadcrumb').should('exist');
  });

});

@Component({
  template: `
    HomeComponent
    <br />
    <ngx-breadcrumbs> </ngx-breadcrumbs>
    <br />
    <button data-testid="btnOne" (click)="toOne()">One</button>
    <button data-testid="btnTwo" (click)="toTwo()">Two</button>
    <br />
  `,
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, NgxBreadcrumbsComponent],
  styles: [
    `
      :host {
        display: block;
      }
      :root {
        --ngx-breadcrumb-container-bg-color: blue;
        --ngx-breadcrumb-container-width: 100%;
      }
    `,
  ],
})
class HomeComponent {
  private router = inject(Router);

  toOne() {
    this.router.navigate(['home']);
  }

  toTwo() {
    this.router.navigate(['home', 'sub']);
  }
}
@Component({
  template: ` SubComponent `,
  selector: 'app-sub',
  standalone: true,
  imports: [RouterOutlet],
})
class SubComponent {}

const initialConfig: NgxBreadcrumbConfig = {
  breadcrumbCount: {
    fixedLead: 2,
    fixedTail: 2,
  },
};

const initialRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: {
      breadcrumb: 'Home',
    },
    children: [
      {
        path: 'sub',
        component: SubComponent,
        data: {
          breadcrumb: 'Sub',
        },
      },
    ],
  },
];

function mount(cfg?: { bcConfig?: NgxBreadcrumbConfig }) {
  const mergedConfig: NgxBreadcrumbConfig = {
    ...initialConfig,
    ...cfg?.bcConfig,
  };
  cy.mount(HomeComponent, {
    imports: [],
    providers: [
      provideNgxBreadcrumbConfig(mergedConfig),
      provideRouter(initialRoutes),
    ],
  });

  cy.getByTestId('btnOne').click();

  return {
    showBreadcrumb: (selector: string) => {
      cy.getByTestId(selector).click();
    },
  };
}

@Component({
  selector: 'test-root-breadcrumb',
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
  ],
})
class RootBreadcrumbComponent implements  StickyBreadcrumbComponent {
  click: EventEmitter<void> = new EventEmitter<void>();

  getBreadcrumb(): BreadcrumbData {
    return {
      label: 'Home',
      link: '/',
    };
  }

  onClick() {
    // this.router.navigate(['/']);
    this.click.emit(void 0);
  }
}
