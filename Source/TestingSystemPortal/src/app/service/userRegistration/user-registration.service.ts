import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../model/user/users';
import { Constant } from '../../common/constant';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  constructor(private http: HttpClient) {}

  createUser(formData: FormData) {
    return this.http.post(Constant.API_CREATE_USER_REGISTRATION, formData);
  }
  createUserRegistration(user: User): Observable<any> {
    return this.http.post(Constant.API_CREATE_USER_REGISTRATION, user);
  }
  registerUser(formData: FormData) {
    return this.http.post(Constant.API_CREATE_USER_REGISTRATION, formData);
  }

  getUserList() {
    return this.http.get<User[]>(Constant.API_GET_ALL_USERS);
  }
}
