import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constant } from '../../common/constant';
import { Tag } from '../../model/Tag/Tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  constructor(private http: HttpClient) {}
  getTags() {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Tag[]>(Constant.API_GET_ALL_TAG, {
      headers: head
    });
  }
}
