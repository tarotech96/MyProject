import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactive {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}
@Injectable()
export class ConfirmationGuard implements CanDeactivate<CanComponentDeactive> {

  canDeactivate(component: CanComponentDeactive) {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
