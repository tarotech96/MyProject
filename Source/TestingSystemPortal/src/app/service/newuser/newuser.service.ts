import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../model/user/users';
import { Constant } from '../../common/constant';

@Injectable({
  providedIn: 'root'
})
export class NewuserService {
  constructor(private http: HttpClient) {}
  addNewUser(newu: User) {
    return this.http.post<User>(Constant.API_INSERT_USERS, newu);
  }
}
