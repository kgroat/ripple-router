import { mount } from 'ripple';

import { App } from './App.ripple';
import { type ParsePath } from '@kgroat/ripple-router';

mount(App, {
	target: document.getElementById('root'),
});

type Foo = ParsePath<'/foo'> extends never ? true : false;
