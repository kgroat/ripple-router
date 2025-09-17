import { type Component } from 'ripple';
import { ParsePath, Path } from './path';

export interface Route<TComponent extends Component = Component> {
	component: TComponent;
	allowExtra?: boolean;
}

export type Routes<TRoutes extends `/${string}` = `/${string}`> = {
	[TRouteStr in TRoutes]: Route<Component<{ $params: ParsePath<TRouteStr> }>>;
};

export interface RouterProps<TRoutes extends `/${string}` = `/${string}`> {
	$routes: Routes<TRoutes>;
  $404: Component;
}

export class RouterMap {
	static from(routes: Routes) {
		return new RouterMap(routes);
	}

	private _map = new Map<Path<string>, Component>();

	constructor(routes: Routes) {
		for (const [routeStr, route] of Object.entries(routes)) {
			if (typeof routeStr !== 'string') continue;
			this._map.set(new Path(routeStr, route.allowExtra), route.component);
		}
	}

	public getMatch(route: string): { $component: Component; $params: {} } | undefined {
		for (const [path, $component] of this._map) {
			const $params = path.test(route);
			if ($params) {
				return {
					$component,
					$params,
				};
			}
		}
	}
}
