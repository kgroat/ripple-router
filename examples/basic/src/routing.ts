
import { Routes } from '@kgroat/ripple-router';
import { Home } from './Home.ripple';
import { Foo } from './Foo.ripple';

const routes = {
  '/': {
    component: Home,
  },
  '/foo/:$foo': {
    component: Foo,
  }
} satisfies Routes;
