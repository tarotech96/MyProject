import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SlideBars } from '../../model/slidebar/slidebar';
import { Constant } from '../../common/constant';

@Injectable({
  providedIn: 'root'
})
export class SlidebarService {
  constructor(private httpClient: HttpClient) {}

  getAllSlideBar() {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.httpClient.get<SlideBars[]>(Constant.API_GET_ALL_SLIDEBARS, {
      headers: head
    });
  }
  insertSlideBar(formData: FormData): Observable<any> {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.httpClient.post(Constant.API_INSERT_SLIDEBARS, formData, {
      headers: head
    });
  }
  deleteSlideBar(id: number) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.httpClient.delete(
      Constant.API_DELETE_SLIDEBARS_BY_ID + '/' + id,
      {
        headers: head
      }
    );
  }
  updateSlideBar(formData: FormData): Observable<any> {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.httpClient.post(Constant.API_UPDATE_SLIDEBARS, formData, {
      headers: head
    });
  }
  filterSlideBarByTitle(title: string) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    if (title === '') {
      return this.httpClient.get<SlideBars[]>(Constant.API_GET_ALL_SLIDEBARS, {
        headers: head
      });
    }
    return this.httpClient.get<SlideBars[]>(
      Constant.API_FILTER_SLIDEBARS_BY_TITLE + '/' + title,
      {
        headers: head
      }
    );
  }

  search(formData: FormData) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.httpClient.post<SlideBars[]>(
      Constant.API_SEARCH_SLIDEBANNER,
      formData,
      {
        headers: head
      }
    );
  }

  getListSlideBarActive() {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.httpClient.get<SlideBars[]>(
      Constant.API_GET_ALL_SLIDEBARS_ACTIVE,
      {
        headers: head
      }
    );
  }
  updateSlideBarStatus(formData: FormData): Observable<any> {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.httpClient.post(
      Constant.API_UPDATE_SLIDEBARS_ACTIVE,
      formData,
      {
        headers: head
      }
    );
  }
}
