import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { chapter } from 'src/app/model/chapter/chapter';
import { Constant } from 'src/app/common/constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {

  constructor(private http: HttpClient) { }
  getListChapter() {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head
      .set('TOKEN', 'Token' + tk);
    return this.http.get<Object[]>(Constant.API_GET_ALL_CHAPTER, {
      headers: head
    });
  }
  listChapter() {
    const tk = localStorage.getItem('access_token');
    const rpm = localStorage.getItem('rolePermissionOrMenu');
    let head = new HttpHeaders();
    head = head
      .set('TOKEN', 'Token' + tk);
    return this.http.get<chapter[]>(Constant.API_GET_ALL_CHAPTER_OBJECT, {
      headers: head
    });
  }
  createChapter(formdata: FormData) {
    const tk = localStorage.getItem('access_token');
    const rpm = localStorage.getItem('rolePermissionOrMenu');
    let head = new HttpHeaders();
    head = head
      .set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_INSERT_CHAPTER, formdata, {
      headers: head
    });
  }
  updateChapter(formdata: FormData): Observable<any> {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head
      .set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_UPDATE_CHAPTER, formdata, {
      headers: head
    });
  }
  deleteChapter(id: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head
      .set('TOKEN', 'Token' + tk);
    return this.http.delete(Constant.API_DELETE_CHAPTER + '/' + id, {
      headers: head
    });
  }
  onSearchChapter(key: string) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head
      .set('TOKEN', 'Token' + tk);
    return this.http.get<chapter[]>(Constant.API_SEARCh_CHAPTER + '?key=' + key, {
      headers: head
    }
    );
  }
  sortChapterByName(name: string) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head
      .set('TOKEN', 'Token' + tk);
    return this.http.get<chapter[]>(Constant.API_SORT_CHAPTER + '?name=' + name, {
      headers: head
    }
    );
  }
  getLisChapterBySubject(idSubject: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head
      .set('TOKEN', 'Token' + tk);
    return this.http.get<chapter[]>(Constant.API_getLisChapterBySubject + idSubject, {
      headers: head
    });
  }
  getLisChapterBySubjectAndParent(idSubject: number) {
    const tk = localStorage.getItem('access_token');
    const rpm = localStorage.getItem('rolePermissionOrMenu');
    let head = new HttpHeaders();
    head = head
      .set('TOKEN', 'Token' + tk);
    return this.http.get<chapter[]>(Constant.API_getLisChapterBySubjectAndParent + idSubject, {
      headers: head
    });
  }
}
