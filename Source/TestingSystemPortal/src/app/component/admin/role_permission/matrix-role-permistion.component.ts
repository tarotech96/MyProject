import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { concatMap, map } from 'rxjs/operators';
import { MatrixRoleSeviceService } from 'src/app/service/matrix-role/matrix-role-sevice.service';
import { PermissionService } from 'src/app/service/permission/permission.service';
import { RoleService } from 'src/app/service/role/role.service';
import { Title } from '@angular/platform-browser';
import { MenuFilterService } from 'src/app/service/menu_filter/menu-filter.service';

@Component({
  selector: 'app-matrix-role-permistion',
  templateUrl: './matrix-role-permistion.component.html',
  styleUrls: ['./matrix-role-permistion.component.scss']
})
export class MatrixRolePermistionComponent implements OnInit {
  rolePer: string;
  keySearch = '';
  arrRole = [];
  arrCheck = [];
  Role = [];
  Permistion = [];
  constructor(
    private matrixService: MatrixRoleSeviceService,
    private permissionService: PermissionService,
    private roleService: RoleService,
    private router: Router,
    private titleService: Title,
    private menuFilter: MenuFilterService
  ) {}
  async ngOnInit() {
    this.titleService.setTitle('Testonline System - Role permission');
    const menuSuccess = await this.menuFilter.checkMenu();
    if (menuSuccess === 1) {
      this.permissionService.getListPermissionPromise().then(res => {
        for (let index = 0; index < res.length; index++) {
          this.Role.push({ value: res[index]['name'] });
        }
      });
      this.roleService.getListRolePromise().then(res => {
        for (let index = 0; index < res.length; index++) {
          if (res[index]['name'] !== 'User') {
            this.Permistion.push({ value: res[index]['name'] });
          }
        }
      });
      this.matrixService.getAllRolePermission().subscribe(res => {
        this.rolePer = res['response'].toString();
        this.arrRole = this.rolePer.split(',');
        for (let i = 0; i < this.arrRole.length; i += 2) {
          this.arrCheck.push({
            role: this.arrRole[i],
            permission: this.arrRole[i + 1]
          });
        }
      });
    }
  }
  selectedOptions(myarray) {
    return myarray.filter(opt => opt.checked).map(opt => opt.value);
  }
  // lâm
  onSearch(event) {
    this.Role = [];
    this.keySearch = event.target.value.trim();
    if (this.keySearch !== '') {
      this.permissionService.searchRolePermission(this.keySearch).subscribe(
        res => {
          // ??? this.ROlư
          this.Role = [];
          for (let index = 0; index < Object.keys(res).length; index++) {
            this.Role.push({ value: res[index][0] });
          }
        },
        err => {
          this.router.navigate(['/error']);
        }
      );
    } else {
      this.Role = [];
      this.permissionService.getListPermission().subscribe(res => {
        res.map(val => {
          this.Role.push({ value: val['name'] });
        });
      });
    }
  }
  /////
  onSelect(role: string, per: string, event) {
    if (event.target.checked === true) {
      this.matrixService
        .addRolePermission(per, role)
        .pipe(concatMap(_ => this.matrixService.getAllRolePermission()))
        .subscribe(res => {
          this.rolePer = res['response'].toString();
          this.arrRole = this.rolePer.split(',');
          for (let i = 0; i < this.arrRole.length; i += 2) {
            this.arrCheck.push({
              role: this.arrRole[i],
              permission: this.arrRole[i + 1]
            });
          }
        });
    }
    if (event.target.checked === false) {
      this.matrixService
        .removeRolePermission(per, role)
        .pipe(concatMap(_ => this.matrixService.getAllRolePermission()))
        .subscribe(res => {
          this.rolePer = res['response'].toString();
          this.arrRole = this.rolePer.split(',');
          for (let i = 0; i < this.arrRole.length; i += 2) {
            this.arrCheck.push({
              role: this.arrRole[i],
              permission: this.arrRole[i + 1]
            });
          }
        });
    }
  }
  isCheck(role: string, per: string) {
    for (let index = 0; index < this.arrCheck.length; index += 1) {
      if (
        this.arrCheck[index]['role'] === role &&
        this.arrCheck[index]['permission'] === per
      ) {
        return true;
      }
    }
    return false;
  }
}
