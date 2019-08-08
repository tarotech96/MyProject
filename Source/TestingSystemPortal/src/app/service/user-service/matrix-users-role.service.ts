import { Injectable } from '@angular/core';
import { User } from '../../model/user/users';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constant } from 'src/app/common/constant';

@Injectable({
  providedIn: 'root'
})
export class MatrixUsersRoleService {
  constructor(private http: HttpClient) {}
  addUsersRole(users: string, role: string) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head
        .set('TOKEN', 'Token' + tk)
    return this.http.post<User>(
      Constant.API_addUsersRole + '?email=' + users + '&roleName=' + role,
      null,{
        headers: head
      }
    );
  }
  getAllUsersRole() {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head
        .set('TOKEN', 'Token' + tk)
    return this.http.get<string>(Constant.API_getAllUsersRole, {
      headers: head
    });
  }
  removeUsersRole(users: string, role: string) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head
        .set('TOKEN', 'Token' + tk)
    return this.http.post<User>(
      Constant.API_removeUsersRole+ '?email=' + users + '&roleName=' + role,
      null,{
        headers: head
      }
    );
  }
}
