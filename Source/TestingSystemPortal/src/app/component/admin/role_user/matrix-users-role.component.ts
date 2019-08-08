import { Component, OnInit } from '@angular/core';
import { concatMap } from 'rxjs/operators';
import { MatrixUsersRoleService } from 'src/app/service/user-service/matrix-users-role.service';
import { RoleService } from 'src/app/service/role/role.service';
import { UserserviceService } from 'src/app/service/user-service/userservice.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MenuFilterService } from 'src/app/service/menu_filter/menu-filter.service';

@Component({
  selector: 'app-matrix-users-role',
  templateUrl: './matrix-users-role.component.html',
  styleUrls: ['./matrix-users-role.component.scss']
})
export class MatrixUsersRoleComponent implements OnInit {
  usersRole: string;
  keySearch = '';
  listUser = [];
  arrUsers = [];
  arrCheck = [];
  Role = [];
  Users = [];
  perPage: number;
  constructor(
    private matrixUsersRole: MatrixUsersRoleService,
    private roleService: RoleService,
    private userService: UserserviceService,
    private router: Router,
    private titleService: Title,
    private menuFilter: MenuFilterService
  ) {}

  async ngOnInit() {
    this.perPage = 5;
    this.titleService.setTitle('Testonline System - User role');
    const menuSuccess = await this.menuFilter.checkMenu();
    if (menuSuccess === 1) {
      this.roleService.getListRolePromise().then(res => {
        for (let index = 0; index < res.length; index++) {
          if (res[index]['name'] !== 'User') {
            this.Role.push({ value: res[index]['name'] });
          }
        }
      });
      this.userService.getListUserPromise().then(res => {
        for (let index = 0; index < res.length; index++) {
          this.Users.push({
            value: res[index]['fullname'],
            email: res[index]['email']
          });
        }
      });
      this.matrixUsersRole.getAllUsersRole().subscribe(res => {
        this.usersRole = res['response'].toString();
        this.arrUsers = this.usersRole.split(',');
        for (let i = 0; i < this.arrUsers.length; i += 2) {
          this.arrCheck.push({
            email: this.arrUsers[i],
            role: this.arrUsers[i + 1]
          });
        }
      });
    }
  }

  selectedOption(myArray) {
    return myArray.filter(opt => opt.checked).map(opt => opt.value);
  }

  onSelect(user: string, role: string, event) {
    if (event.target.checked === true) {
      this.matrixUsersRole
        .addUsersRole(user, role)
        .pipe(concatMap(_ => this.matrixUsersRole.getAllUsersRole()))
        .subscribe(res => {
          this.usersRole = res['response'].toString();
          this.arrUsers = this.usersRole.split(',');
          for (let i = 0; i < this.arrUsers.length; i += 2) {
            this.arrCheck.push({
              email: this.arrUsers[i],
              role: this.arrUsers[i + 1]
            });
          }
        });
    }
    if (event.target.checked === false) {
      this.matrixUsersRole
        .removeUsersRole(user, role)
        .pipe(concatMap(_ => this.matrixUsersRole.getAllUsersRole()))
        .subscribe(res => {
          this.usersRole = res['response'].toString();
          this.arrUsers = this.usersRole.split(',');
          for (let i = 0; i < this.arrUsers.length; i += 2) {
            this.arrCheck.push({
              email: this.arrUsers[i],
              role: this.arrUsers[i + 1]
            });
          }
        });
    }
  }
  isCheck(email: string, role: string) {
    for (let i = 0; i < this.arrCheck.length; i += 1) {
      if (
        this.arrCheck[i]['email'] === email &&
        this.arrCheck[i]['role'] === role
      ) {
        return true;
      }
    }
    return false;
  }
  onSearch(event) {
    this.keySearch = event.target.value;
    if (this.keySearch.trim() !== '') {
      const body = {
        key: this.keySearch
      };
      this.userService.searchMatrixUserRoleByName(this.keySearch).subscribe(
        res => {
          this.Users = [];
          for (let index = 0; index < Object.keys(res).length; index++) {
            this.Users.push({ value: res[index][0], email: res[index][1] });
          }
        },
        error => {
          this.router.navigate(['/error']);
        }
      );
    } else {
      this.Users = [];
      this.userService.getListUserPromise().then(res => {
        for (let index = 0; index < res.length; index++) {
          this.Users.push({
            value: res[index]['fullname'],
            email: res[index]['email']
          });
        }
      });
    }
  }
  // Phân trang
  trackByFn(index, item) {
    return item.id;
  }
  onChange(event) {
    this.perPage = event.target.value;
  }
}
