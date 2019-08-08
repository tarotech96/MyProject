import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from '../login/user.service';
import { GetdataService } from '../getdata.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { MenuService } from '../menu/menu.service';
import { Constant } from 'src/app/common/constant';
// tslint:disable-next-line:import-blacklist
import {Observable} from 'rxjs/Rx';
export let browserRefresh = true;
@Injectable()
export class AuthService {
  subscription: Subscription;
  menuUser: Object[];
  mapShow = new Map();
  URL = '';
  arrayURL = [];
  constructor(
    public jwtHelper: JwtHelperService,
    private us: UserService,
    private menuService: MenuService,
    private router: Router
  ) {
    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = false;
      }
  });
  }
    isAuthenticated(): Observable<boolean> {
    const token = localStorage.getItem('access_token');
    const url = window.location.href;
    this.arrayURL = url.split(Constant.BASE_URL_FRONTEND);
    const len = this.arrayURL.length;
    this.URL = url;
    // tslint:disable-next-line:prefer-const
    let subject = new BehaviorSubject<boolean>(true);
    // Kiểm tra role/ Load lai thong tin khi F5
    if (localStorage.getItem('role') != null) {
      const arrayRole = localStorage.getItem('role').split(',');
      const lenght = arrayRole.length;
    //
      // if (this.URL.indexOf('hometotal') !== -1) {
      //   return true;
      // }
      if (lenght <= 2) {
        if (arrayRole[0].toLowerCase() === 'User'.toLowerCase()) {
          this.us.role = false;
        } else {
          this.us.role = true;
        }
      } else {
        this.us.role = true;
      }

      if (!this.jwtHelper.isTokenExpired(token) && this.us.role) {
         this.us.checkUserIsTest(localStorage.getItem('email')).subscribe(res => {

          if (res) {
            window.alert('Tài khoản đang thi , bạn sẽ bị đăng xuất!' );
            this.us.logout();
          }
          subject.next(!res); }) ;
        }
        return subject.asObservable();
      } else {
        subject.next(false);
        return subject.asObservable();
    }
  }
  isAuthenticatedTest() {
    const token = localStorage.getItem('access_token');
    const url = window.location.href;
    this.arrayURL = url.split(Constant.BASE_URL_FRONTEND);
    const len = this.arrayURL.length;
    this.URL = url;
    // tslint:disable-next-line:prefer-const
    let subject = new BehaviorSubject<boolean>(true);
    // Kiểm tra role/ Load lai thong tin khi F5
    if (localStorage.getItem('role') != null) {
      const arrayRole = localStorage.getItem('role').split(',');
      const lenght = arrayRole.length;
    //
      // if (this.URL.indexOf('hometotal') !== -1) {
      //   return true;
      //
      // if (lenght <= 2) {
      //   if (arrayRole[0].toLowerCase() === 'User'.toLowerCase()) {
      //     this.us.role = false;
      //   } else {
      //     this.us.role = true;
      //   }
      // } else {
      //   this.us.role = true;
      // }
      if (!this.jwtHelper.isTokenExpired(token)) {
         return true;
        }
        return false;
      } else {
        return false;
    }
  }
}
