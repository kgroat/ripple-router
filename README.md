# @kgroat/ripple-router

A small, typesafe router for ripple-based apps

## Installation

```bash
npm install @kgroat/ripple-router
```

## Usage
Your app's component responsible for routing might look something like this:

```jsx
import { Link, Router } from '@kgroat/ripple-router';
import { Home } from './Home.ripple';
import { MyOtherComponent } from './MyOtherComponent.ripple';

// The $notFound prop provides a $route prop to the component
component NotFound (props: { $route: string }) {
  <h1>{'Not Found'}</h1>
  <p>{'The route '}<code>{props.$route}</code>{' does not exist'}</p>
  <p><Link class='link' href='/'>{'Go Home'}</Link></p>
  <style>
  code {
    background-color: rgba(0, 0, 0, 0.1);
  }
  </style>
}

// The router provides a $params prop to the component containing the route params
component MyComponent (props: { $params: { myParam: string } }) {
  const { $params } = props;
  <h1>{'My Component'}</h1>
  <p>{'The myParam param is "'}{$params.myParam}{'"'}</p>
}

// The params are inherited from the parent route, so :myParam is available here
component MySubComponent (props: { $params: { myParam: string, mySubParam: string } }) {
  const { $params } = props;
  <h1>{'My Sub Component'}</h1>
  <p>{'The myParam param is "'}{$params.myParam}{'"'}</p>
  <p>{'The mySubParam param is "'}{$params.mySubParam}{'"'}</p>
  <p><Link class='link' href='/my-route/foo/bar/'>{'Go to My Route'}</Link></p>
}

component MyInvalidComponent (props: { $params: { nonExistantParam: string } }) {
  const { $params } = props;
  <h1>{'My Sub Component'}</h1>
  <p>{'The nonExistantParam param is "'}{$params.nonExistantParam}{'"'}</p>
}

export component AppRouter () {
  <Router
    $routes={{
      // By default, paths require an exact match
      '/': {
        component: Home,
      },
      // :<paramName> is a required parameter
      '/my-route/:myParam:': {
        component: MyComponent,
        // Adding subRoutes allows for nested routes, and enables inexact matching
        subRoutes: {
          '/:mySubParam': {
            component: MySubComponent,
            // Setting allowExtra to true also enables inexact matching
            allowExtra: true,
          },
        },
      },
      // *<paramName> captures the rest of the path, and is optional
      '/my-other-route/*rest': {
        component: MyOtherComponent,
      },
      '/invalid-route': {
        // Produces a TS error, since MyInvalidComponent has a required nonExistantParam param
        // that the route does not define
        component: MyInvalidComponent,
      }
    }}
    // You must provide a component to handle 404s
    $notFound={NotFound}
  />
}
```
