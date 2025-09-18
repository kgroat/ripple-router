# @kgroat/ripple-router

A small, typesafe router for ripple-based apps

## Installation

```bash
npm install @kgroat/ripple-router
```

## Usage

Your app's component responsible for routing might look something like this:

```ripple
import { Link, Router } from '@kgroat/ripple-router';
import { Home } from './Home.ripple';
import { MyComponent } from './MyComponent.ripple';

component NotFound (props: { $route: string }) {
  <h1>{'Not Found'}</h1>
  <p>{'The route '}<code>{props.$route}</code>{' does not exist'}</p>
	<p><Link class='link' href='/'>{'Go Home'}</Link></p>
}

export component AppRouter () {
  <Router
    $routes={{
      '/': {
        component: Home,
      },
      '/my-route/:$myParam:': { // :$myParam is a required parameter
        component: MyComponent,
      },

    }}
    $404={NotFound}
  />
}
```