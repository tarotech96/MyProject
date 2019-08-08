import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { domain } from 'src/app/model/domain/domain';
import { Constant } from 'src/app/common/constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DomainService {
  constructor(private http: HttpClient) {}
  getListDomain() {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Object[]>(Constant.API_GET_ALL_DOMAIN, {
      headers: head
    });
  }
  createDomain(formdata: FormData) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_INSERT_DOMAIN, formdata, {
      headers: head
    });
  }
  updateDomain(formdata: FormData): Observable<any> {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_UPDATE_DOMAIN, formdata, {
      headers: head
    });
  }
  deleteDomain(id: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.delete(Constant.API_DELETE_DOMAIN + '/' + id, {
      headers: head
    });
  }
  onSearchDomain(key: string) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<domain[]>(Constant.API_SEARCh_DOMAIN + '?key=' + key, {
      headers: head
    });
  }
  sortDomainByName(name: string) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<domain[]>(Constant.API_SORT_DOMAIN + '?name=' + name, {
      headers: head
    });
  }
  getLisDomainBySubject(idSubject: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<domain[]>(
      Constant.API_getLisDomainBySubject + idSubject,
      {
        headers: head
      }
    );
  }
}
