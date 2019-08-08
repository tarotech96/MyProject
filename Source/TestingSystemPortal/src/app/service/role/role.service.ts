import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Roles } from '../../model/role/Roles';
import { Constant } from '../../common/constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(private http: HttpClient) {}
  getListRole() {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Roles[]>(Constant.API_LIST_ROLE, {
      headers: head
    });
  }
  getListRolePromise() {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http
      .get<Roles[]>(Constant.API_LIST_ROLE, {
        headers: head
      }).map(response => {
        return response;
      })
      .toPromise();
  }
  updateRole(formdata: FormData): Observable<any> {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_UPDATE_ROLE, formdata, {
      headers: head
    });
  }

  insertRole(formdata: FormData): Observable<any> {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_INSERT_ROLE, formdata, {
      headers: head
    });
  }

  deleteRole(id: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.delete(Constant.API_DELETE_ROLE + '/' + id, {
      headers: head
    });
  }
  getSortRoleKey(key) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Roles[]>(Constant.API_SORT_ROLE + '/' + key, {
      headers: head
    });
  }
  getSortRole() {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Roles[]>(Constant.API_SORT_ROLE, {
      headers: head
    });
  }
  search(formData: FormData) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post<Roles[]>(Constant.API_SEARCh_ROLE, formData, {
      headers: head
    });
  }
}
