import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuService } from '../menu/menu.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Constant } from 'src/app/common/constant';
import { Router } from '@angular/router';
import { concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuFilterService {

  menuUser: Object[];
  URL: string;
  arrURL = [];
  count: number;
  constructor(private http: HttpClient, private menuService: MenuService, private jwt: JwtHelperService, private router: Router) {
  }
   async checkMenu(){
    const email = localStorage.getItem('email');
    const url = window.location.href;
    this.arrURL = url.split('/');
    const len = this.arrURL.length;
    this.URL = this.arrURL[len -2] + '/' + this.arrURL[len-1];
    const formData = new FormData();
    const data = {
      email: email
    };
    formData.append('data', JSON.stringify(data));
    this.count = 0;
    let temp=await this.menuService.getListMenuUser(formData).toPromise();
    this.menuUser = temp;
    this.menuUser.forEach(element => {
      if(this.count !== 0){
          return ;
      }
      element['childs'].forEach(ele => {
          if (ele['link'].indexOf(this.URL) !== -1) {
           this.count++;
           return  1;
          }
        });
   });
  if(this.count === 0){
     this.router.navigate(['/error']);
     return 2;
  } else {
    return 1;
  }
}
}
