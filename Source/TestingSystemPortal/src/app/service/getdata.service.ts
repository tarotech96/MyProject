import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class GetdataService {
  token: string;
  role: string;
  permission: string;

  constructor(private jwt: JwtHelperService) { }
  getToken() {
    this.token = localStorage.getItem('access_token');
    return this.token;
  }
  getRole() {
    this.role = localStorage.getItem('role');
    return this.role;
  }
  getPermission() {
    this.permission = localStorage.getItem('rolePermissionOrMenu');
    return this.permission;
  }

}
