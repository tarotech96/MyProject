import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Group } from 'src/app/model/group/group';
import { Constant } from 'src/app/common/constant';
import { Observable } from 'rxjs';
import { ListUserGroupDTO } from 'src/app/model/group/ListUserGroupDTO';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor(private http: HttpClient) {}

  getListGroup() {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head
        .set('TOKEN', 'Token' + tk)
    return this.http.get<Group[]>(Constant.API_LIST_GROUP, {
      headers: head
    });
  }
  getListGroup2() {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head
        .set('TOKEN', 'Token' + tk)
    return this.http.get<Object[]>(Constant.API_LIST2_GROUP, {
      headers: head
    });
  }
  insertGroup(formdata: FormData): Observable<any> {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head
        .set('TOKEN', 'Token' + tk)
    return this.http.post(Constant.API_INSERT_GROUP, formdata, {
      headers: head
    });
  }
  updateGroup(formdata: FormData): Observable<any> {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head
        .set('TOKEN', 'Token' + tk)
    return this.http.post(Constant.API_UPDATE_GROUP, formdata, {
      headers: head
    });
  }
  deleteGroup(id: Number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head
        .set('TOKEN', 'Token' + tk)
    return this.http.delete(Constant.API_DELETE_GROUP_BY_ID + '/' + id, {
      headers: head
    });
  }
  searchGroup(key: string) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head
        .set('TOKEN', 'Token' + tk)
    return this.http.get<Object[]>(Constant.API_SEARCH_GROUP_BY_NAME + '?key=' + key, {
      headers: head
    });
  }
  sortGroupByName(name: string) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head
        .set('TOKEN', 'Token' + tk)
    return this.http.get<Group[]>(Constant.API_SORT_GROUP + '?name' + name, {
      headers: head
    });
  }
  listUserGroup(id: number,searchKey: string) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    let params = new HttpParams();
    params = params.append('searchKey', searchKey);
    head = head
        .set('TOKEN', 'Token' + tk)
    return this.http.get<ListUserGroupDTO>(Constant.API_LIST_USER_GROUP + '/' + id, {
      headers: head,
      params: params
    });
  }
  addUserGroup(idGroup: string, idUserArray: string,searchKey: string) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    let params = new HttpParams();
    params = params.append('groupId', idGroup);
    params = params.append('listUser', idUserArray);
    params = params.append('searchKey', searchKey);
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<ListUserGroupDTO>(Constant.API_ADD_USER_GROUP, {
      headers: head,
      params: params
    });
  }
  removeUserGroup(idGroup: string, idUser: string,searchKey: string) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    let params = new HttpParams();
    params = params.append('groupId', idGroup);
    params = params.append('userId', idUser);
    params = params.append('searchKey', searchKey);
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<ListUserGroupDTO>(Constant.API_REMOVE_USER_GROUP, {
      headers: head,
      params: params
    });
  }
}
