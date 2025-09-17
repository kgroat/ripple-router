/// <reference types="ripple/jsx-runtime" preserve="true" />

import { type Component } from 'ripple';

import { getPath, useGoTo } from './context';
import { type RouterProps, type Routes } from './routing';

import { Link as OrigLink } from './link.ripple';
import { Router as OrigRouter } from './router.ripple';

export const Router = OrigRouter as <TRoutes extends `/${string}`>(
	props: RouterProps<TRoutes>
) => void;

export const Link = OrigLink as Component<JSX.IntrinsicElements['a']>;

export {
	type RouterProps,
	type Routes,
	getPath,
	useGoTo,
};
