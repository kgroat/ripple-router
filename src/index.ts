/// <reference types="ripple/jsx-runtime" preserve="true" />

import { type Component } from 'ripple';

import { getRoute } from './context';
import { type ParsePath } from './path';
import { type RouterProps, type Routes } from './routing';

import { Link as OrigLink } from './link.ripple';
import { Router as OrigRouter } from './router.ripple';

export const Router = OrigRouter as <
	TRoutes extends `/${string}`,
	TRoutes1 extends `/${string}`,
	TRoutes2 extends `/${string}`,
	TRoutes3 extends `/${string}`,
	TRoutes4 extends `/${string}`
>(
	props: RouterProps<TRoutes, TRoutes1, TRoutes2, TRoutes3, TRoutes4>
) => void;

export const Link = OrigLink as Component<JSX.IntrinsicElements['a']>;

export {
	type ParsePath,
	type RouterProps,
	type Routes,
	getRoute,
};
