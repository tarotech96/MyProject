import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Newpost } from '../../model/Newpost/Newpost';
import { Constant } from '../../common/constant';

@Injectable({
  providedIn: 'root'
})
export class NewpostService {
  constructor(private http: HttpClient) {}
  createNewpost(newp: Newpost) {
    return (
      Constant.API_INSERT_NEWS +
      '?title=' +
      newp.title +
      '&linkimage=' +
      newp.linkimage +
      '&description=' +
      newp.description +
      '&allTags=' +
      newp.tags +
      '&content=' +
      newp.content +
      '&creatorId=' +
      newp.creator
    );
  }
  addNewpost(newp: Newpost) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post<Newpost>(Constant.API_INSERT_NEWS, newp, {
      headers: head
    });
  }

  getListPageNewsNews() {
    return this.http.get<Object[]>(Constant.API_GET_ALL_PAGENEWS_NEWS);
  }
  getListPinnedNews() {
    return this.http.get<Object[]>(Constant.API_GET_ALL_PINNED_NEWS);
  }
}
