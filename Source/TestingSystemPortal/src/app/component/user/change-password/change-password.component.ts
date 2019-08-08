import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user/users';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { concatMap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'src/app/service/login/user.service';
import { AuthenticationService } from 'src/app/service/login/authentication.service';

function comparePassword(c: AbstractControl): ValidationErrors | null {
  const value = c.value;
  const { password, confirmPassword } = value;
  if (password !== confirmPassword) {
    return {
      passwordNotMatch: true
    };
  }
  return null;
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  listUser: User[] = [];
  updateForm: FormGroup;
  checkPassForm: FormGroup;
  user: User = {
    id: 0,
    fullname: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    birthday: '',
    img: '',
    status: 1
  };
  errMessage = '';
  adminname = '';
  adminpass = '';
  old_pass = '';
  noti = '';
  sh = '';
  hd = 'hidden';
  tokens: string;
  username = '';
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private jwt: JwtHelperService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.updateForm = this.fb.group({
      password: ['', [Validators.minLength(6)]],
      // password: ['', [Validators.minLength(6)]]
      pass: this.fb.group(
        {
          password: [
            '',
            [
              Validators.required,
              Validators.minLength(6),
              Validators.pattern(/^(?!.* )(?=.*\d)(?=.*[a-z]).{6,20}$/)
            ]
          ],
          confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
        },
        {
          validator: [comparePassword]
        }
      )
    });
    const token = this.jwt.decodeToken(localStorage.getItem('access_token'));
    this.userService.getUserbyEmail(token['username']).subscribe(res => {
      this.adminname = res.email;
      this.adminpass = res.password;
    });
  }
  changePassWord() {
    const { valid, value } = this.updateForm;
    if (valid) {
      this.user.email = this.adminname;
      this.user.password = this.updateForm.get('pass.password').value;
      const formData = new FormData();
      formData.append('user', JSON.stringify(this.user));
      this.userService.changePassWord(formData).subscribe(
        res => {
          this.noti = 'Thay đổi mật khẩu thành công';
          this.hd = 'visible';
          this.sh = 'show';
          setTimeout(() => {
            this.hd = 'hidden';
            this.noti = '';
          }, 1500);
          this.router.navigate(['/hometotal/profile-user']);
        },
        error => {
          this.errMessage =
            'Thao tác chưa được thực hiện, vui lòng thử lại xong!';
          this.noti = 'Thao tác chưa được thực hiện, vui lòng thử lại xong!';
          this.hd = 'visible';
          this.sh = 'show';
          setTimeout(() => {
            this.hd = 'hidden';
            this.noti = '';
          }, 1500);
        }
      );
    }
  }
}
