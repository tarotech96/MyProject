import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';

import { User } from '../../model/user/users';
import { Constant } from '../../common/constant';
import { Exam } from 'src/app/model/exam/exam';
import { UserService } from '../login/user.service';
@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  sizeExamAssign: number;
  listExamASC: Object[] = [];
  constructor(private http: HttpClient) {}
  // MR DUC GET LIST EXAM USER COMPLETED
  getlistExamUserCompleted(id) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Object[]>(
      Constant.API_GET_LIST_EXAM_USERS_COMPLETED + '/' + id,
      {
        headers: head
      }
    );
  }
  // MR DUC GET LIST PRACTICE USER COMPLETED
  getlistPracticeUserCompleted(id) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Object[]>(
      Constant.API_GET_LIST_PRACTICE_USERS_COMPLETED + '/' + id,
      {
        headers: head
      }
    );
  }
  getlistExamOfUser(email: string) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Object[]>(
      Constant.GET_LIST_EXAM_OF_USER + '?email=' + email,
      {
        headers: head
      }
    );
  }
  getlistPracticeOfUser(email: string) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Object[]>(
      Constant.GET_LIST_PRACTICE_OF_USER + '?email=' + email,
      {
        headers: head
      }
    );
  }
  getListExamOfUserASCBYEndDate(id) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Object[]>(
      Constant.API_GET_LIST_EXAM_USERS_ASC_BY_END_DATE + '?id=' + id,
      {
        headers: head
      }
    );
  }
  getUserList() {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<User[]>(Constant.API_GET_ALL_USERS, {
      headers: head
    });
  }
  getListUserPromise() {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http
      .get<User[]>(Constant.API_GET_ALL_USERS, {
        headers: head
      })
      .map(response => {
        return response;
      })
      .toPromise();
  }
  getUserbyId(id: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Object>(Constant.API_GET_USERS_ID + id, {
      headers: head
    });
  }
  // getUserbyEmail(email: string) {
  //   const formData = new FormData();
  //  formData.append('email' , JSON.stringify(formData));
  //   return this.http.post<User>(Constant.URL_USERS, email);
  // }

  createUser(user: User) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post<User>(Constant.API_GET_ALL_USERS, user, {
      headers: head
    });
  }

  updateUser(id: number, data: Partial<User>) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post<User>(Constant.API_UPDATE_USERS + '/' + id, data, {
      headers: head
    });
  }

  deleteUserbyId(id: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    const test = this.http.post<User>(
      Constant.API_GET_ALL_USERS + '/' + id,
      null,
      {
        headers: head
      }
    );
    return test;
  }
  searchUser(keyword: string) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<User[]>(
      Constant.API_SEARCH_USERS + '?keyword=' + keyword,
      {
        headers: head
      }
    );
  }
  searchMatrixUserRoleByName(fullname: string) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Object[]>(
      Constant.API_SEARCH_LIST_USER_ROLE + '?fullname=' + fullname,
      {
        headers: head
      }
    );
  }
  sortByProperty(index: number, type: number, keysearch: string) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<User[]>(
      Constant.API_SORT_USERS +
        '?indexProperty=' +
        index +
        '&typeSort=' +
        type +
        '&keysearch=' +
        keysearch,
      {
        headers: head
      }
    );
  }
  getListUserComplete(listUser, examId) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Object[]>(
      Constant.API_GET_LISTUSERCOMPLETE +
        '?listUser=' +
        listUser +
        '&examId=' +
        examId,
      {
        headers: head
      }
    );
  }
  getListUserInComplete(listUser, listIdComplete) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Object[]>(
      Constant.API_GET_LISTUSERINCOMPLETE +
        '?listUser=' +
        listUser +
        '&listComplete=' +
        listIdComplete,
      {
        headers: head
      }
    );
  }
}
