import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/login/authentication.service';
import { UserService } from 'src/app/service/login/user.service';
import { Title } from '@angular/platform-browser';
import { UserserviceService } from 'src/app/service/user-service/userservice.service';
import { Roles } from 'src/app/model/role/Roles';
import { RoleService } from 'src/app/service/role/role.service';
import { Location } from '@angular/common';
import { Constant } from 'src/app/common/constant';
import { MenuService } from 'src/app/service/menu/menu.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error = '';
  submitted = false;
  showNoti = false;
  adminpass: string;
  adminemail: string;
  adminName: string;
  tokens: string;
  count: number;
  role: boolean;
  isCheck: boolean;
  errorExist = '';
  listRole: Roles[] = [];
  email: string;
  pass: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private titleService: Title,
    public userserviceService: UserserviceService,
    private roleService: RoleService,
    private menuService: MenuService,
    public jwtHelper: JwtHelperService
  ) {}

  ngOnInit(): void {
    this.count = 0;
    this.titleService.setTitle('Testonline System - Login');
    this.adminemail = '';
    this.adminpass = '';
    // this.userService.logout();
    this.checkToken();
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(30)]
      ]
    });
    // this.email = window.atob(this.getCookie('tk'));
    // this.pass = window.atob(this.getCookie('ps'));
  }

  remember(event) {
    if (event.target.checked === true) {
      this.isCheck = true;
    }
    if (event.target.checked === false) {
      this.isCheck = false;
    }
  }

  getCookie(cname) {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  login() {
    const { valid, value } = this.loginForm;
    if (valid) {
      this.adminemail = this.loginForm.get('email').value;
      this.adminpass = this.loginForm.get('password').value;
      this.authenticationService
        .login(this.adminemail, this.adminpass)
        .subscribe(
          res => {
            localStorage.setItem('role', res['role']);
            localStorage.setItem(
              'rolePermissionOrMenu',
              res['roleandpermission']
            );
            localStorage.setItem('email', res['email']);
            localStorage.setItem('access_token', res['response']);
            this.userService.getUserbyEmail(res['email']).subscribe(ress => {
              this.userService.userLogin.id = ress.id;
              this.userService.userLogin.fullname = ress.fullname;
              this.userService.userLogin.email = ress.email;
              this.userService.userLogin.phone = ress.phone;
              this.userService.userLogin.address = ress.address;
              this.userService.userLogin.birthday = ress.birthday;
              this.userService.userLogin.img = ress.img;
              this.userService.userLogin.status = ress.status;
              localStorage.setItem(
                'item',
                JSON.stringify(this.userService.userLogin)
              );
              const arrayRole = res['role'].split(',');
              this.roleService.getListRole().subscribe(resss => {
                this.listRole = resss;
                const lenght = arrayRole.length;
                if (lenght <= 2) {
                  if (arrayRole[0].toLowerCase() === 'User'.toLowerCase()) {
                    this.userService.role = false;
                  } else {
                    this.userService.role = true;
                  }
                } else {
                  this.userService.role = true;
                }
              });
              this.userserviceService
                .getListExamOfUserASCBYEndDate(ress.id)
                .subscribe(res4 => {
                  this.userserviceService.listExamASC = res4;
                  this.userserviceService.sizeExamAssign = res4.length;
                });
            });
            const formdata = new FormData();
            const data = {
              email: localStorage.getItem('email')
            };
            formdata.append('data', JSON.stringify(data));
            this.menuService.getListMenuUser(formdata).subscribe(menures => {
              this.userService.menuUser = menures;
            });
            if (localStorage.getItem('backURL') === null) {
              this.router.navigate(['hometotal/home']);
            } else {
              this.router.navigate([localStorage.getItem('backURL')]);
              localStorage.removeItem('backURL');
            }
          },
          err => {
            this.errorExist = err.error.message;
          }
        );
      if (this.isCheck === true) {
        document.cookie = 'tk=' + window.btoa(this.adminemail);
        document.cookie = 'ps=' + window.btoa(this.adminpass);
      }
    }
  }
checkToken() {
  const token = localStorage.getItem('access_token');
  const email = localStorage.getItem('email');
  if (!this.jwtHelper.isTokenExpired(token) && email != null) {
    this.authenticationService
    .checkToken(email)
    .subscribe(
      res => {
        localStorage.setItem('role', res['role']);
        localStorage.setItem(
          'rolePermissionOrMenu',
          res['roleandpermission']
        );
        localStorage.setItem('email', res['email']);
        localStorage.setItem('access_token', res['response']);
        this.userService.getUserbyEmail(res['email']).subscribe(ress => {
          this.userService.userLogin.id = ress.id;
          this.userService.userLogin.fullname = ress.fullname;
          this.userService.userLogin.email = ress.email;
          this.userService.userLogin.phone = ress.phone;
          this.userService.userLogin.address = ress.address;
          this.userService.userLogin.birthday = ress.birthday;
          this.userService.userLogin.img = ress.img;
          this.userService.userLogin.status = ress.status;
          localStorage.setItem(
            'item',
            JSON.stringify(this.userService.userLogin)
          );
          const arrayRole = res['role'].split(',');
          this.roleService.getListRole().subscribe(resss => {
            this.listRole = resss;
            const lenght = arrayRole.length;
            if (lenght <= 2) {
              if (arrayRole[0].toLowerCase() === 'User'.toLowerCase()) {
                this.userService.role = false;
              } else {
                this.userService.role = true;
              }
            } else {
              this.userService.role = true;
            }
          });
          this.userserviceService
            .getListExamOfUserASCBYEndDate(ress.id)
            .subscribe(res4 => {
              this.userserviceService.listExamASC = res4;
              this.userserviceService.sizeExamAssign = res4.length;
            });
        });
        const formdata = new FormData();
        const data = {
          email: localStorage.getItem('email')
        };
        formdata.append('data', JSON.stringify(data));
        this.menuService.getListMenuUser(formdata).subscribe(menures => {
          this.userService.menuUser = menures;
        });

        if (localStorage.getItem('backURL') === null) {
          this.router.navigate(['hometotal/home']);
        } else {
          this.router.navigate([localStorage.getItem('backURL')]);
          localStorage.removeItem('backURL');
        }
      },
      err => {
        this.errorExist = err.error.message;
      }
    );
  } else {
    localStorage.clear();
  }
}
  forgetpass(event) {
    this.showNoti = event;
    setTimeout(() => {
      this.showNoti = false;
    }, 2000);
  }
}
