import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constant } from '../../common/constant';
import { Menu } from '../../model/menu/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private http: HttpClient) { }
  getListMenu() {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head
      .set('TOKEN', 'Token' + tk);
    return this.http.get<Object[]>(Constant.API_GET_ALL_MENU, {
      headers: head
    });
  }
  getListParentName() {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head
      .set('TOKEN', 'Token' + tk);
    return this.http.get<Menu[]>(Constant.API_GET_LIST_PARENT_NAME, {
      headers: head
    });
  }
  getListMenuPromise() {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head
      .set('TOKEN', 'Token' + tk);
    return this.http
      .get<Menu[]>(Constant.API_GET_ALL_MENU, {
        headers: head
      })
      .map(response => {
        return response;
      })
      .toPromise();
  }
  updateMenu(formdata: FormData): Observable<any> {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head
      .set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_UPDATE_MENU, formdata, {
      headers: head
    });
  }

  insertMenu(formdata: FormData): Observable<any> {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head
      .set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_INSERT_MENU, formdata, {
      headers: head
    });
  }

  deleteMenu(id: number) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head
      .set('TOKEN', 'Token' + tk);
    return this.http.delete(Constant.API_DELETE_MENU_BY_ID + '/' + id, {
      headers: head
    });
  }
  getListMenuTree() {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head
      .set('TOKEN', 'Token' + tk);
    return this.http.get<Menu[]>(Constant.API_LIST_MENU_TREE , {
      headers: head
    });
  }
  getListMenuUser(formData: FormData) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head
      .set('TOKEN', 'Token' + tk);
    return this.http.post<Object[]>(Constant.API_LIST_MENU_USER , formData, {
      headers: head
    });
  }
  onSearchMenu(key: string) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head
      .set('TOKEN', 'Token' + tk);
    return this.http.get<Menu[]>(Constant.API_SEARCH_MENU_BY_NAME + '?name=' + key, {
      headers: head
    }
    );
  }
}
