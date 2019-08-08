import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { contact } from 'src/app/model/contact/contact';
import { Constant } from 'src/app/common/constant';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private http: HttpClient) {}
  getListCustomer() {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<contact[]>(Constant.API_GET_ALL_CUSTOMER, {
      headers: head
    });
  }
  createCustomer(formdata: FormData) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_INSERT_CUSTOMER, formdata, {
      headers: head
    });
  }
  deleteCustomer(id: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.delete(Constant.API_DELETE_CUSTOMER + '/' + id, {
      headers: head
    });
  }
  searchCustomer(key: string) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<contact[]>(
      Constant.API_SEARCh_CUSTOMER + '?key=' + key,
      {
        headers: head
      }
    );
  }
  sortCustomer(key: string) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<contact[]>(
      Constant.API_SORT_CUSTOMER + '?key=' + key,
      {
        headers: head
      }
    );
  }
}
