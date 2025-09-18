import { type Component } from 'ripple';
import { Empty } from './empty.ripple';
import { ParsePath, Path } from './path';

export type Route<
	TComponent extends Component<any> = Component,
	TRoutes0 extends `/${string}` = `/${string}`,
	TRoutes1 extends `/${string}` = `/${string}`,
	TRoutes2 extends `/${string}` = `/${string}`,
	TRoutes3 extends `/${string}` = `/${string}`,
	TPrefix extends string = ''
> = {
	component: TComponent;
	notFound?: Component;
} & ({
	allowExtra?: boolean;
} | {
	subRoutes: Routes<
		TRoutes0,
		TRoutes1,
		TRoutes2,
		TRoutes3,
		'/',
		TPrefix
	>;
});

// function foo<
// 	TRoutes0 extends `/${string}`,
// 	TRoutes1 extends `/${string}`,
// 	TRoutes2 extends `/${string}`,
// 	TRoutes3 extends `/${string}`,
// 	TRoutes4 extends `/${string}`
// > (routes: Routes<TRoutes0, TRoutes1, TRoutes2, TRoutes3, TRoutes4>) {
// 	return routes
// }

// foo({
// 	'/foo/:foo': {
// 		component: null as unknown as Component<{ $params: { foo: string } }>,
// 		subRoutes: {
// 			'/:bar': {
// 				component: null as unknown as Component<{ $params: { foo: string, bar: string } }>,
// 				subRoutes: {
// 					'/:baz': {
// 						component: null as unknown as Component<{ $params: { foo: string, bar: string, baz: string } }>,
// 					},
// 				},
// 			},
// 		},
// 	},
// 	'/:root': {
// 		component: null as unknown as Component<{ $params: {} }>,
// 	}
// })

export type Routes<
	TRoutes0 extends `/${string}` = `/${string}`,
	TRoutes1 extends `/${string}` = `/${string}`,
	TRoutes2 extends `/${string}` = `/${string}`,
	TRoutes3 extends `/${string}` = `/${string}`,
	TRoutes4 extends `/${string}` = `/${string}`,
	TPrefix extends string = ''
> = {
	[TRouteStr in TRoutes0]?: Route<
		Component<{ $params: ParsePath<`${TPrefix}${TRouteStr}`>; $children: Component }>,
		TRoutes1,
		TRoutes2,
		TRoutes3,
		TRoutes4,
		`${TPrefix}${TRouteStr}`
	>;
};

export interface RouterProps<
	TRoutes0 extends `/${string}` = `/${string}`,
	TRoutes1 extends `/${string}` = `/${string}`,
	TRoutes2 extends `/${string}` = `/${string}`,
	TRoutes3 extends `/${string}` = `/${string}`,
	TRoutes4 extends `/${string}` = `/${string}`,
	TPrefix extends string = ''
> {
	$routes: Routes<TRoutes0, TRoutes1, TRoutes2, TRoutes3, TRoutes4, TPrefix>;
  $notFound: Component;
	$basePath?: string;
}

export class RouterMap {
	static from(routes: Routes, basePath: string = '') {
		return new RouterMap(routes, basePath);
	}

	private _map = new Map<Path<string>, Route>();

	constructor(routes: Routes, basePath: string = '') {
		for (const [routeStr, route] of Object.entries(routes)) {
			if (typeof routeStr !== 'string') continue;
			const allowExtra = 'subRoutes' in route ? !! route.subRoutes : route.allowExtra ?? false;
			if (basePath.endsWith('/')) basePath = basePath.slice(0, -1);
			const fullPath = basePath + routeStr;
			this._map.set(new Path(fullPath, allowExtra), route);
		}
	}

	public getMatch(route: string): {
		$component: Component;
		$subRoutes: Routes;
		$params: {},
		$path: string,
		$notFound?: Component;
	} | undefined {
		for (const [path, routeDef] of this._map) {
			const $params = path.test(route);
			const $notFound = routeDef.notFound ?? Empty
			if ($params) {
				return {
					$component: routeDef.component,
					$subRoutes: 'subRoutes' in routeDef ? routeDef.subRoutes : {},
					$params,
					$path: path.blueprint,
					$notFound,
				};
			}
		}
	}
}
