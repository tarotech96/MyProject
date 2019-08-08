import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Roles } from '../../model/role/Roles';
import { Constant } from 'src/app/common/constant';
@Injectable({
  providedIn: 'root'
})
export class MatrixRoleSeviceService {
  private readonly URL = Constant.BASE_URL + '/role/addRolePermission';
  private readonly URL_REMOVE =
    Constant.BASE_URL + '/role/removeRolePermission';
  private readonly URL_ALL = Constant.BASE_URL + '/role/getAllRolePermission';
  constructor(private http: HttpClient) {}
  addRolePermission(role: string, permission: string) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post<Roles>(
      this.URL + '?nameRole=' + role + '&namePermission=' + permission,
      null,
      {
        headers: head
      }
    );
  }
  getAllRolePermission() {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<string>(this.URL_ALL, {
      headers: head
    });
  }
  removeRolePermission(role: string, permission: string) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post<Roles>(
      this.URL_REMOVE + '?nameRole=' + role + '&namePermission=' + permission,
      null,
      {
        headers: head
      }
    );
  }
}
