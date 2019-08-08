import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Roles } from '../../model/role/Roles';
import { Constant } from 'src/app/common/constant';

@Injectable({
  providedIn: 'root'
})
export class MatrixRoleMenuService {
  private readonly URL = Constant.BASE_URL + '/role/addRoleMenu';
  private readonly URL_REMOVE = Constant.BASE_URL + '/role/removeRoleMenu';
  private readonly URL_ALL = Constant.BASE_URL + '/role/getAllRoleMenu';
  constructor(private http: HttpClient) {}
  addRoleMenu(role: string, menu: string) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post<Roles>(
      this.URL + '?nameRole=' + role + '&nameMenu=' + menu,
      null,
      {
        headers: head
      }
    );
  }
  getAllRoleMenu() {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<string>(this.URL_ALL, {
      headers: head
    });
  }
  removeRoleMenu(role: string, menu: string) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post<Roles>(
      this.URL_REMOVE + '?nameRole=' + role + '&nameMenu=' + menu,
      null,
      {
        headers: head
      }
    );
  }
}
