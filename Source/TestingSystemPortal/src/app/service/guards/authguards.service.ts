import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild } from '@angular/router';
import { AuthService } from './auth.service';
import { Constant } from 'src/app/common/constant';
// tslint:disable-next-line:import-blacklist
import {Observable, Subject, BehaviorSubject} from 'rxjs/Rx';
import { MenuService } from '../menu/menu.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable()
export class AuthGuardService implements CanActivate {
  role: boolean;
  roleArray: string[] = [];
  menuUser: Object[];
  mapShow = new Map();
  arrURL = [];
  URL: string;
  constructor(
    public auth: AuthService, public router: Router, private jwt: JwtHelperService) {
    const backURL = window.location.href;
    const URL = backURL.split(Constant.BASE_URL_FRONTEND);
    localStorage.setItem('backURL', URL[1]);
  }
  canActivate(): Observable<boolean>  {
    const token = localStorage.getItem('access_token');
    if (this.jwt.isTokenExpired(token)) {
      alert('Phiên làm việc của bạn đã hết !');
      this.router.navigate(['/login']);
    }
    // tslint:disable-next-line:prefer-const
    // tslint:disable-next-line:no-var-keyword
    // tslint:disable-next-line:prefer-const
    let authenticated = this.auth.isAuthenticated();
    const subject = new BehaviorSubject<boolean>(false);
    authenticated.subscribe(res => {

      if (res === false) {
        this.router.navigate(['/login']);
      }
      subject.next(res);
    });
    return subject.asObservable().first();
    // if (!this.auth.isAuthenticated()) {
    //   this.router.navigate(['/login']);
    //   return false;
    // }
    // return true;

  }
}
@Injectable()
export class AuthGuardServiceTest implements CanActivate {
  role: boolean;
  roleArray: string[] = [];
  menuUser: Object[];
  mapShow = new Map();
  arrURL = [];
  URL: string;
  constructor(
    public auth: AuthService, public router: Router, private jwt: JwtHelperService) {
    const backURL = window.location.href;
    const URL = backURL.split(Constant.BASE_URL_FRONTEND);
    localStorage.setItem('backURL', URL[1]);
  }
  canActivate()  {
    const token = localStorage.getItem('access_token');
    if (this.jwt.isTokenExpired(token)) {
      alert('Phiên làm việc của bạn đã hết !');
      localStorage.clear();
      this.router.navigate(['/login']);
    }
    // tslint:disable-next-line:prefer-const
    // var authenticated = this.auth.isAuthenticated();
    // var subject = new BehaviorSubject<boolean>(false);
    // authenticated.subscribe(res=>{
    //
    //   if(res==false){
    //     this.router.navigate(['/login']);
    //   }
    //   subject.next(res);
    // });
    // return subject.asObservable().first();

    if (!this.auth.isAuthenticatedTest()) {

      this.router.navigate(['/login']);
      return false;
    }
    return true;

  }
}
