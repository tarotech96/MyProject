import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
@Injectable()
export class CheckRolePermissionOrMenu {
  listCheck: string[];
  permissionAndMenu = '';
  role: string;
  list: string[];
  controllerAnActionOfRole: string;
  listRole: string[];
  count: number;
  listControllerAndAction: string[][];
  constructor(private jwt: JwtHelperService, private router: Router) {}
  checkRole(controllerAnAction) {
    this.listCheck = [];
    this.permissionAndMenu = '';
    this.role = '';
    this.list = [];
    this.controllerAnActionOfRole = '';
    this.listRole = [];
    this.permissionAndMenu = localStorage.getItem('rolePermissionOrMenu');
    const token = this.jwt.decodeToken(localStorage.getItem('access_token'));
    this.role = token['role'];
    this.listRole = this.role.split(',');
    // for (let i = 0; i < this.listRole.length; i++) {
    //   if (this.listRole[i].toLowerCase() === 'Admin'.toLowerCase()) {
    //     return true;
    //   }
    // }
    this.list = this.permissionAndMenu.split(',');
    this.listControllerAndAction = [];
    for (let index = 0; index < this.list.length; index += 4) {
      this.listControllerAndAction[this.list[index]] +=
        this.list[index + 2] + ',' + this.list[index + 3] + ',';
    }
    for (let index = 0; index < this.listRole.length; index++) {
      this.controllerAnActionOfRole = this.listControllerAndAction[
        '' + this.listRole[index] + ''
      ];
      if (typeof this.controllerAnActionOfRole !== 'undefined') {
        this.list = [];
        this.controllerAnActionOfRole = this.controllerAnActionOfRole.substring(9, this.controllerAnActionOfRole.length - 1);
        let temp = '';
        temp = this.controllerAnActionOfRole.slice();
        this.list = temp.split(',');
        this.listCheck = [];
        for (let index1 = 0; index1 <= this.list.length - 2; index1 += 2) {
          this.listCheck.push(this.list[index1] + this.list[index1 + 1]);
        }
        if (this.listCheck.indexOf(controllerAnAction) !== -1) {
          this.count++;
          return true;
        }
      }
    }
    if (this.count === 0) {
      this.router.navigate(['error']);
    }
    return false;
  }
}
