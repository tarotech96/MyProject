import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constant } from '../../common/constant';
import { Permission } from '../../model/permission/permission';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  constructor(private http: HttpClient) {}
  getListPermission() {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head
        .set('TOKEN', 'Token' + tk)
    return this.http.get<Permission[]>(Constant.API_GET_ALL_PERMISSION,{
      headers: head
    });
  }
  getListPermissionPromise() {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head
        .set('TOKEN', 'Token' + tk)
    return this.http
      .get<Permission[]>(Constant.API_GET_ALL_PERMISSION,{
        headers: head
      })
      .map(response => {
        return response;
      })
      .toPromise();
  }
  updatePermission(formdata: FormData): Observable<any> {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head
        .set('TOKEN', 'Token' + tk)
    return this.http.post(Constant.API_UPDATE_PERMISSION, formdata,{
      headers: head
    });
  }

  insertPermission(formdata: FormData): Observable<any> {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head
        .set('TOKEN', 'Token' + tk)
    return this.http.post(Constant.API_INSERT_PERMISSION, formdata,{
      headers: head
    });
  }

  deletePermission(id: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head
        .set('TOKEN', 'Token' + tk)
    return this.http.delete(Constant.API_DELETE_PERMISSION_BY_ID + '/' + id,{
      headers: head
    });
  }
  getListController() {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head
        .set('TOKEN', 'Token' + tk)
    return this.http.get<string[]>(Constant.API_CONTROLLER_PERMISSION,{
      headers: head
    });
  }
  getListAction(controller: String) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head
        .set('TOKEN', 'Token' + tk)
    return this.http.get<string[]>(
      Constant.API_ACTION_PERMISSION + '?nameController=' + controller,{
        headers: head
      }
    );
  }
  searchPermission(formData: FormData) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head
        .set('TOKEN', 'Token' + tk)
    return this.http.post<Permission[]>(
      Constant.API_SEARCH_PERMISSION,
      formData,{
        headers: head
      }
    );
  }
  
  //lâm
  searchRolePermission(name : string) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get(Constant.API_SEARCH_ROLE_PERMISSION + "?name="+name, {
      headers: head
    });
  }
  //
}
