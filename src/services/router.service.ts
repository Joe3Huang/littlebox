export const enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
  }
  
  export type Route = {
    method: HttpMethod;
    route: string;
    handler: (...params: any) => Promise<any>;
  };
  
  export type RouteParam = {
    idx: number;
    paramKey: string;
  };
  
  /**
   * Extract all the route params out of the route into an array of RouteParam.
   * Example: /api/user/:id => [{ idx: 2, paramKey: 'id' }]
   * @param route the configured route with params
   */
  export const extractRouteParams: (route: string) => RouteParam[] = (route) =>
    route.split('/').reduce((accum: RouteParam[], curr: string, idx: number) => {
      if (/:[A-Za-z1-9]{1,}/.test(curr)) {
        const paramKey: string = curr.replace(':', '');
        const param: RouteParam = { idx, paramKey };
        return [...accum, param];
      }
      return accum;
    }, []);
  
  export const routeParamPattern: (route: string) => string = (route) =>
    route.replace(/\/\:[^/]{1,}/gi, '/[^/]{1,}').replace(/\//g, '\\/');