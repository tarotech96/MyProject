import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Constant } from '../../common/constant';
import { Viewnewslist } from '../../model/viewnewslist/viewnewslist';

@Injectable({
  providedIn: 'root'
})
export class ViewnewslistService {
  news: Viewnewslist;
  constructor(private http: HttpClient) {}
  sendNews = new EventEmitter<Object>();
  getViewnNewsList() {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Viewnewslist[]>(Constant.API_GET_ALL_NEWS, {
      headers: head
    });
  }
  getViewnNewsbyId(id: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    const test = this.http.get<Viewnewslist>(
      Constant.API_GET_NEWS_BY_ID + '/' + id,
      {
        headers: head
      }
    );
    this.http
      .get<Viewnewslist>(Constant.API_GET_ALL_NEWS + '/' + id, {
        headers: head
      })
      .pipe(map(_ => (response: Response) => {}));
    return test;
  }
  createViewnNewsList(user: Viewnewslist) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post<Viewnewslist>(Constant.API_GET_ALL_NEWS, user, {
      headers: head
    });
  }

  updateViewnNewsList(id: number, data: Partial<Viewnewslist>) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post<Viewnewslist>(
      Constant.API_UPDATE_NEWS + '/' + id,
      data,
      {
        headers: head
      }
    );
  }

  updateNewsActiveStatus(status: string, news_id: string) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post<Viewnewslist>(
      Constant.API_UPDATE_NEWS_ACTIVE_STATUS + '/' + status + '/' + news_id,
      {
        headers: head
      }
    );
  }

  deleteViewnNewsListbyId(id: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    const test = this.http.post<Viewnewslist>(
      Constant.API_GET_ALL_NEWS + '?status=' + status,
      null,
      {
        headers: head
      }
    );
    return test;
  }
  searchNews(keyword: string) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Viewnewslist[]>(
      Constant.API_SEARCH_NEWS + '?keyword=' + keyword,
      {
        headers: head
      }
    );
  }
  searchNewsCMS(keyword: string) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Viewnewslist[]>(
      Constant.API_SEARCH_NEWS_CMS + '?keyword=' + keyword,
      {
        headers: head
      }
    );
  }
  sortByProperty(index: number, type: number, keysearch: string) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Viewnewslist[]>(
      Constant.API_SORT_NEWS +
        '?indexProperty=' +
        index +
        '&typeSort=' +
        type +
        '&keySearch=' +
        keysearch,
      {
        headers: head
      }
    );
  }

  pinNews(id: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<String>(Constant.API_PIN_NEWS + '/' + id, {
      headers: head
    });
  }
  // checkArrayIsChange(oldArray, currentArray) {
  //   let i, item, len;
  //   let ok = 0;
  //   len = currentArray.length;
  //   for (i = 0; i < len; i++) {
  //     item = currentArray[i].pinned;
  //     if (item !== oldArray[i].pinned) {
  //       ok = 1;
  //       break;
  //     }
  //   }
  //   if (ok === 0) {
  //     return 'fail';
  //   } else {
  //     return 'success';
  //   }
  // }
}
