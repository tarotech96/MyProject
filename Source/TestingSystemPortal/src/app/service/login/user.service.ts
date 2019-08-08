import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../../model/user/users';
import { Constant } from '../../common/constant';
import { Observable } from 'rxjs';
@Injectable()
export class UserService {
  userLogin = {
    id: 0,
    fullname: '',
    email: '',
    phone: '',
    address: '',
    birthday: '',
    img: '',
    status: 0
  };
  role: boolean;
  menuUser: Object[];
  key = 'item';
  constructor(private http: HttpClient) {}

  logout() {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    this.http
      .post(Constant.API_CREATE_USER_LOGOUT, null, {
        headers: head
      })
      .subscribe(res => {});
    localStorage.clear();
    this.userLogin.id = 0;
    this.userLogin.fullname = '';
    this.userLogin.email = '';
    this.userLogin.phone = '';
    this.userLogin.address = '';
    this.userLogin.birthday = '';
    this.userLogin.img = '';
    this.userLogin.status = 0;
    if (this.role === true) {
      this.role = false;
    }
  }
  //////////// Hvnuoc//////////
  getUserList() {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<User[]>(Constant.API_GET_ALL_USERS, {
      headers: head
    });
  }

  getUserbyId(id: number) {
    return this.http.get<User>(Constant.API_GET_USERS_ID + id);
  }
  createUser(formData: FormData) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_INSERT_USERS, formData, {
      headers: head
    });
  }

  updateUser(formData: FormData) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_UPDATE_USERS, formData, {
      headers: head
    });
  }
  forgotPass(formdata: FormData) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_FORGOT_PASSWORD_USERS, formdata, {
      headers: head
    });
  }
  changePassWord(formdata: FormData) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_CHANGE_PASSWORD_USERS, formdata, {
      headers: head
    });
  }
  deleteUserbyId(id: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    const test = this.http.delete(Constant.API_DELETE_USERS + '/' + id, {
      headers: head
    });
    return test;
  }
  searchUser(formData: FormData) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post<User[]>(Constant.API_SEARCH_USERS, formData, {
      headers: head
    });
  }
  sortUser(formData: FormData) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post<User[]>(Constant.API_SORT_USERS, formData, {
      headers: head
    });
  }
  getUserbyEmail(email: string) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    const body = {
      email: email
    };
    const formData = new FormData();
    formData.append('data', JSON.stringify(body));
    return this.http.post<User>(Constant.API_USERS_PROFILE, formData, {
      headers: head
    });
  }
  getlistExamOfUser(email: string) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Object[]>(
      Constant.BASE_URL + '/users/listexamofuser' + '?email=' + email,
      {
        headers: head
      }
    );
  }
  editProfile(formData: FormData) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_EDIT_PROFILE, formData, {
      headers: head
    });
  }
  checkVerifyEmail(email: string, access: string) {
    return this.http.get<User[]>(
      Constant.BASE_URL + '/active?email=' + email + '&access=' + access
    );
  }
  activeForgot(formdata: FormData) {
    return this.http.post(Constant.BASE_URL + '/activeforgotpass', formdata);
  }
  editProfileNoImage(formData: FormData) {
    return this.http.post(Constant.API_EDIT_PROFILE_NO_IMAGE, formData);
  }
  userDetail(email: string) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<User>(
      Constant.BASE_URL + '/userdetail' + '?email=' + email,
      {
        headers: head
      }
    );
  }
  activeAccout(email: string) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post<User>(
      Constant.BASE_URL + '/active_account' + '?email=' + email,
      {
        headers: head
      }
    );
  }
  checkUserIsTest(email) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    let params = new HttpParams();
    params = params.append('email', email);
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<boolean>(Constant.API_CHECK_USER_IS_TEST, {
      headers: head,
      params: params
    });
  }
  setUserTest(email) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    let params = new HttpParams();
    params = params.append('email', email);
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<boolean>(Constant.API_SET_USER_TEST, {
      headers: head,
      params: params
    });
  }
}
