# ngx-breadcrumb

- ✅ Easy styling of default breadcrumb via CSS custom properties
- ✅ Customize breadcrumb separator via string or custom template
- ✅ Customize breadcrumb via template
- ✅ Focus on DX

## Installation

```bash
npm install --save @code-workers.io/ngx-breadcrumb
```

## Demo
A live demo is available at [go to demo](https://green-meadow-01c14fc03.2.azurestaticapps.net/)
## Usage

### Import the `NgxBreadcrumbModule` module into your AppModule

> You must import the `NgxBreadcrumbModule` into lazy-loaded modules, too.
> Otherwise, no breadcrumbs will be rendered for the sub-routes of the
> lazy-loaded module.

```typescript
// app.module.ts

import { NgxBreadcrumbModule } from '@code-workers.io/ngx-breadcrumb';

@NgModule({
  imports: [NgxBreadcrumbModule],
})
export class AppModule {}
```

### Provide Breadcrumbs

#### Setup breadcrumb data in your route configuration

```typescript
// app-routing.module.ts

const routes: Routes = [{ path: 'example', data: { breadcrumb: 'Example' } }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

#### Implement the `BreadcrumbProvider` interface (Optional)

> Some components need a dynamic breadcrumb label, e.g. editor components.
> Such components may implement the `BreadcrumbProvider` interface and offer
> dynamic breadcrumb data to the `BreadcrumbService`.

```typescript
// my-editor.component.ts

@Component(...)
export class MyEditorComponent implements BreadcrumbProvider {
    getBreadcrumb(): BreadcrumbData {
      return {
        label: ..., // this could be a string or an observable, e.g. from ReactiveForm controls
        link: ... // this could be `false` to disable linking or a external url (or a different route...)
      };
    }
}
```

### Provide root breadcrumb(s)

Root breadcrumb(s) are breadcrumbs which are rendered in front of the breadcrumbs dervived from the route. This
can e.g. be a "home"-breadcrumb.

You can provide root breadcrumbs either programmatically or by configuration.

#### Programmatically

```typescript
// app.component.ts
// ...
constructor(private breadcrumbProviderService: NgxBreadcrumbProviderService) {
  this.breadcrumbProviderService.setRootBreadcrumbs([
    { label: 'Home', link: '/' }
  ]);
}
```

#### Configuration

```typescript
// app.module.ts
@NgModule({
  imports: [
    NgxBreadcrumbModule.withConfig({
      stickyRoot: [new Breadcrumb('Home', '/'), new Breadcrumb('Home1', '/')],
    }),
  ],
})
export class AppModule {}
```

#### Provide a root breadcrumb component

You can provide a root breadcrumb component which will be rendered in front of the breadcrumbs dervived from the route.

Simply configure it in your `app.module.ts`:

```typescript
NgxBreadcrumbModule.withConfig({
  stickyRootComponent: {
    component: RootBreadcrumbComponent,
    data: {
      label: 'Home',
      link: '/'
    }
  }
})

// component
@Component({
  selector: 'root-breadcrumb',
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
export class RootBreadcrumbComponent implements StickyBreadcrumbComponent {
  click: EventEmitter<void> = new EventEmitter<void>()

  constructor(private router: Router) {}

  getBreadcrumb(): BreadcrumbData {
    return {
      label: 'Home',
      link: '/',
    };
  }

  onClick() {
    this.click.emit(void 0)
  }
}
```

Note: you need to implement the `StickyBreadcrumbComponent`-interface so that it will work properly.

### Additional info on Route setup

For static breadcrumb configuration, you have to provide the required data with the route setup.
Therefore add a `breadcrumb` segment to the Route's `data` attribute.

The `breadcrumb` attribute may be

- a boolean value (if data.breadcrumb === false, no breadcrumb will be generated for that route)
- a string value (string will be taken for breadcrumb label)
- a `BreadcrumbData` object

When providing a `BreadcrumbData` object, you may use the `BreadcrumbData.link` attribute
to either suppress linking of the breadcrumb (text-only) or to specify a deviating url.

For dynamic breadcrumb configuration, your routed components may implement the `BreadcrumbProvider`
interface in order to provide breadcrumb data which overrides the route configuration.

```typescript
const routes: Routes = [
  // Routed component does NOT implement the BreadcrumbProvider interface:

  // don't generate a breadcrumb for this route (as there's no label to display)
  { path: 'example', component: ExampleComponent },
  {
    path: 'example',
    component: ExampleComponent,
    data: { breadcrumb: true },
  },

  // don't generate a breadcrumb for this route (as it has been disabled explicitly)
  {
    path: 'example',
    component: ExampleComponent,
    data: { breadcrumb: false },
  },

  // generate a regular breadcrumb with label "Example"
  {
    path: 'example',
    component: ExampleComponent,
    data: { breadcrumb: 'Example' },
  },
  {
    path: 'example',
    component: ExampleComponent,
    data: { breadcrumb: { label: 'Example' } },
  },
  {
    path: 'example',
    component: ExampleComponent,
    data: { breadcrumb: { label: 'Example', link: true } },
  },

  // generate a label-only breadcrumb with label "Example"
  {
    path: 'example',
    component: ExampleComponent,
    data: { breadcrumb: { label: 'Example', link: false } },
  },

  // generate a breadcrumb with label "Example" linking to an external url
  {
    path: 'example',
    component: ExampleComponent,
    data: { breadcrumb: { label: 'Example', link: 'http://example.com' } },
  },

  // Routed component DOES implement the BreadcrumbProvider interface

  // generate a breadcrumb with data provided by the component
  { path: 'example', component: ExampleBreadcrumbProviderComponent },
  {
    path: 'example',
    component: ExampleBreadcrumbProviderComponent,
    data: { breadcrumb: true },
  },

  // don't generate a breadcrumb for this route (as it has been disabled explicitly)
  {
    path: 'example',
    component: ExampleBreadcrumbProviderComponent,
    data: { breadcrumb: false },
  },

  // generate a breadcrumb; merge the 'label' attribute from route data and component data
  // breadcrumb data from component has precedence over breadcrumb data from route
  {
    path: 'example',
    component: ExampleBreadcrumbProviderComponent,
    data: { breadcrumb: 'Example' },
  },
  {
    path: 'example',
    component: ExampleBreadcrumbProviderComponent,
    data: { breadcrumb: { label: 'Example' } },
  },
  {
    path: 'example',
    component: ExampleBreadcrumbProviderComponent,
    data: { breadcrumb: { label: 'Example', link: true | false } },
  },
];
```

### Futher configuration

The NgxBreadcrumbModule`accepts the`NgxBreadcrumbConfig` configuration-object:

- `breadcrumbCount.fixedLead`: number of visible leading breadcrumbs. Default: 1.
- `breadcrumbCount.fixedTail`: number of visible trailing breadcrumbs. Default: 2.

With this configuration you can control the number of breadcrumbs which are rendered. Breadcrumbs in
between are just rendered as dots.

# Customization

There are two ways to for customization: via `ng-template` and/or via CSS custom properties

### Customization via `ng-template`

#### Breadcrumb customization

```html
<ngx-breadcrumbs [breadcrumbTemplate]="bc"></ngx-breadcrumbs>

<ng-template #bc let-last="last" let-crumb> {{crumb.label}} </ng-template>
```

#### Breadcrumb separator customization

```html
<ngx-breadcrumbs [separatorTemplate]="sep"></ngx-breadcrumbs>

<ng-template #sep> // </ng-template>
```

## Customization via CSS custom properties

Available CSS custom properties:

The `breadcrumb-container`

- `--ngx-breadcrumb-container-padding`: padding of the breadcrumb container. Default: `0.5rem`.
- `--ngx-breadcrumb-container-margin`: the margin of the breadcrumb container.
- `--ngx-breadcrumb-container-bg-color`: the background color of the breadcrumb container.
- `--ngx-breadcrumb-gap-between`: gap between breadcrumbs. Default: `0.5rem`.
- `--ngx-breadcrumb-container-width`: the width of the breadcrumb container. Default: `fit-content`.
- The `breadcrumb` itself:
- `--ngx-breadcrumb-padding`: padding of the breadcrumb. Default: `0.5rem`.
- `--ngx-breadcrumb-margin`: the margin of the breadcrumb.
- `--ngx-breadcrumb-bg-color`: the background color of the breadcrumb.
- `--ngx-breadcrumb-border`: the border of the breadcrumb. Default: `none`.
- `--ngx-breadcrumb-border-radius`: the border-radius of the breadcrumb. Default: `0`.
- `--ngx-breadcrumb-link-decoration`: the text-decoration of the breadcrumb link. Default: `none`.

The separator container:

- `--ngx-separator-container-height`: the height of the separator container. Default: `100%`.
- `--ngx-separator-container-width`: the width of the separator container. Default: `auto`.
- `--ngx-separator-container-padding`: the padding of the separator container. Default: `0`.
- `--ngx-separator-container-margin`: the margin of the separator container. Default: `0`.
- `--ngx-separator-container-bg-color`: the background color of the separator container. Default: `inherit`.

The separator-icon between breadcrumbs:

- `--ngx-separator-icon-color`: the color of the separator icon. Default: `black`.
- `--ngx-separator-icon-height`: the height of the separator icon. Default: `24px`.
- `--ngx-separator-icon-width`: the width of the separator icon. Default: `24px`.

See Demo for examples.

## Translate Breadcrumbs

To translate the breadcrums you only need to provide the `NGX_TRANSLATION_ADAPTER` token with an
implementation of the `NgxBreadcrumbTranslationAdapter`-interface. You can choose any translation
library of your choice.

```typescript
import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root',
})
export class MyTranslationAdapter implements NgxBreadcrumbTranslationAdapter {
  constructor(private translateService: TranslateService) {}

  translate(key: string): string {
    return this.translateService.instant(key);
  }
}

// app.module.ts


@NgModule({
  providers: [{provide: NGX_TRANSLATION_ADAPTER, useExisting: MyTranslationAdapter }],
})
export class AppModule {}
```

## Compatibility

The versions align with the Angular versions. This means version 13.x.x of this library is compatible with Angular 13.x.x. or greater.
