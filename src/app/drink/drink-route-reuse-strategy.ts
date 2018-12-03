import { RouteReuseStrategy } from '@angular/router/';
import { ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';
import { Injectable } from '@angular/core';

export class DefaultRouteReuseStrategy implements RouteReuseStrategy {
  shouldDetach(route: ActivatedRouteSnapshot): boolean { return false; }
  store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {}
  shouldAttach(route: ActivatedRouteSnapshot): boolean { return false; }
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle|null { return null; }
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean{
    return false;
  }
}

@Injectable()
export class DrinkRouteReuseStrategy extends DefaultRouteReuseStrategy{
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean{
    let name = future.component && (<any>future.component).name;

    return super.shouldReuseRoute(future, curr) && name !== 'MakeDrinkPage';
  }
}
