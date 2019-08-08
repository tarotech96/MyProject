import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Constant } from 'src/app/common/constant';

@Injectable()
export class AuthenticationService {
  static AUTH_TOKEN = Constant.BASE_URL + '/login';

  constructor(private http: HttpClient) {  }

  login(email: string, password: string) {
    const body = {
      email: email,
      password: password,
      status: '',
      fullname: ''
    };
    const formData = new FormData();
    formData.append('user', JSON.stringify(body));
    return this.http.post<any>(AuthenticationService.AUTH_TOKEN, formData);
  }
  checkToken(email: string) {
    const tk = localStorage.getItem('access_token');
    let params = new HttpParams();
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    params = params.append('email', email);
    return this.http.get<any>(Constant.API_CHECK_TOKEN, {
      headers: head,
      params: params
    });
  }
}
