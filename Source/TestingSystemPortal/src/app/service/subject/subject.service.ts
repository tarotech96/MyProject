import { Injectable } from '@angular/core';
import { subject } from 'src/app/model/subject/subject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constant } from 'src/app/common/constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  constructor(private http: HttpClient) {}

  // MR DUC GET SUBJECT BY ID
  getSubjectByID(id: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<subject>(
      Constant.API_GET_SUBJECT_BY_ID + '?id=' + id,
      {
        headers: head
      }
    );
  }
  getListSubject() {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<subject[]>(Constant.API_GET_ALL_SUBJECT, {
      headers: head
    });
  }
  // tslint:disable-next-line:no-shadowed-variable
  createSubject(formdata: FormData) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_INSERT_SUBJECT, formdata, {
      headers: head
    });
  }
  updateSubject(formdata: FormData): Observable<any> {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_UPDATE_SUBJECT, formdata, {
      headers: head
    });
  }
  deleteSubject(id: number) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.delete(Constant.API_DELETE_SUBJECT + '/' + id, {
      headers: head
    });
  }
  onSearchSubject(key: string) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<subject[]>(
      Constant.API_SEARCh_SUBJECT + '?key=' + key,
      {
        headers: head
      }
    );
  }
  sortSubjectByName(name: string) {
    return this.http.get<subject[]>(
      Constant.API_SORT_SUBJECT + '?name=' + name
    );
  }
}
