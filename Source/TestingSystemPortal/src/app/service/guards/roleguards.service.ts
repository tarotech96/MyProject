import { Injectable, OnInit } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DataService } from '../dataservice/dataservice.service';
@Injectable()
export class RoleGuards implements CanActivate {
  permissionAndMenu = '';
  role: string;
  list: string[];
  listRole: string[];
  listControllerAndAction: string[][];
  email: string;
  constructor(
    public auth: AuthService,
    private jwt: JwtHelperService,
    private dataService: DataService
  ) {}
  canActivate(): boolean {
    this.dataService.currentMessage.subscribe(res => {
      this.permissionAndMenu = res;
    });
    const token = this.jwt.decodeToken(localStorage.getItem('access_token'));
    this.role = token['role'];
    this.email = token['email'];
    this.listRole = this.role.split(',');
    const list = this.permissionAndMenu.split(',');
    this.listControllerAndAction = [];
    for (let index = 0; index < list.length; index += 4) {
      this.listControllerAndAction[list[index]] +=
        list[index + 2] + ',' + list[index + 3] + ',';
    }
    for (let index = 0; index < this.listRole.length; index++) {
      const controllerAnActionOfRole = this.listControllerAndAction[
        this.listRole[index]
      ];
    }
    return true;
  }
}
