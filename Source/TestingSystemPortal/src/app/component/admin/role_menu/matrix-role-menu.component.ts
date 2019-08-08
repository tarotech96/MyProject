import { Component, OnInit } from '@angular/core';
import { concatMap } from 'rxjs/operators';
import { MatrixRoleMenuService } from 'src/app/service/matrix-role/matrix-role-menu.service';
import { PermissionService } from 'src/app/service/permission/permission.service';
import { MenuService } from 'src/app/service/menu/menu.service';
import { RoleService } from 'src/app/service/role/role.service';
import { Title } from '@angular/platform-browser';
import { MenuFilterService } from 'src/app/service/menu_filter/menu-filter.service';

@Component({
  selector: 'app-matrix-role-menu',
  templateUrl: './matrix-role-menu.component.html',
  styleUrls: ['./matrix-role-menu.component.scss']
})
export class MatrixRoleMenuComponent implements OnInit {
  roleMenu: string;
  arrRole = [];
  arrCheck = [];
  Role = [];
  Menu = [];
  constructor(
    private matrixService: MatrixRoleMenuService,
    private menuService: MenuService,
    private roleService: RoleService,
    private titleService: Title,
    private menuFilter: MenuFilterService
  ) {}

  async ngOnInit() {
    this.titleService.setTitle('Testonline System - Role menu');
    const menuSuccess = await this.menuFilter.checkMenu();
    if (menuSuccess) {
      this.menuService.getListMenuTree().subscribe(res => {
        this.Menu = res;
        // for (let index = 0; index < res.length; index++) {
        //   this.Menu.push({ value: res[index]['name'] });
        // }
      });
      this.roleService.getListRolePromise().then(res => {
        for (let index = 0; index < res.length; index++) {
          if (res[index]['name'] !== 'User') {
            this.Role.push({ value: res[index]['name'] });
          }
        }
      });
      this.matrixService.getAllRoleMenu().subscribe(res => {
        this.roleMenu = res['response'].toString();
        this.arrRole = this.roleMenu.split(',');
        for (let i = 0; i < this.arrRole.length; i += 2) {
          this.arrCheck.push({
            role: this.arrRole[i],
            menu: this.arrRole[i + 1]
          });
        }
      });
    }
  }
  selectedOptions(myarray) {
    return myarray.filter(opt => opt.checked).map(opt => opt.value);
  }
  onSelect(role: string, menu: string, event) {
    if (event.target.checked === true) {
      this.matrixService
        .addRoleMenu(role, menu)
        .pipe(concatMap(_ => this.matrixService.getAllRoleMenu()))
        .subscribe(res => {
          this.arrCheck = [];
          this.roleMenu = res['response'].toString();
          this.arrRole = this.roleMenu.split(',');
          for (let i = 0; i < this.arrRole.length; i += 2) {
            this.arrCheck.push({
              role: this.arrRole[i],
              menu: this.arrRole[i + 1]
            });
          }
        });
    } else {
      this.matrixService
        .removeRoleMenu(role, menu)
        .pipe(concatMap(_ => this.matrixService.getAllRoleMenu()))
        .subscribe(res => {
          this.arrCheck = [];
          this.roleMenu = res['response'].toString();
          this.arrRole = this.roleMenu.split(',');
          for (let i = 0; i < this.arrRole.length; i += 2) {
            this.arrCheck.push({
              role: this.arrRole[i],
              menu: this.arrRole[i + 1]
            });
          }
        });
    }
  }
  isCheck(role: string, menu: string) {
    for (let index = 0; index < this.arrCheck.length; index += 1) {
      if (
        this.arrCheck[index]['role'] === role &&
        this.arrCheck[index]['menu'] === menu
      ) {
        return true;
      }
    }
    return false;
  }
  onChange(event) {}
}
