import { createContext } from "ripple";

export const RouteContext = createContext({
  $path: window.location.pathname,
  $goTo: (_: string) => {},
});

export function getRoute () {
  return RouteContext.get();
}

// function joinPaths (oldPath: string, newPath: string) {
//   oldPath = oldPath.replace(/\/+$/, '/');
//   newPath = oldPath.replace(/\/+$/, '/');
//   if (newPath.endsWith('/')) {
//     newPath = newPath.substring(0, newPath.length - 1);
//   }

//   if (oldPath.endsWith('/')) {
//     oldPath = oldPath.substring(0, oldPath.length - 1);
//   }

//   if (newPath.startsWith('/')) {
//     return newPath;
//   }

//   while (newPath.startsWith('./')) {
//     newPath = newPath.substring(2);
//   }

//   while (newPath.startsWith('../')) {
//     const parts = oldPath.split('/');
//     parts.pop();
//     oldPath = parts.join('/');
//   }

//   return `${oldPath}/${newPath}`;
// }

