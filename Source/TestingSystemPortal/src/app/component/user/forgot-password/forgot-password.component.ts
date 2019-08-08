import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/model/user/users';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../service/login/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  listUser: User[] = [];
  updateForm: FormGroup;
  user: User;
  errMessage = '';
  successMessage = '';
  constructor(private http: HttpClient,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.updateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  forgotPassWord() {
    const { valid, value } = this.updateForm;
    if (valid) {
      const data = value;
      const formdata = new FormData();
      formdata.append('user', JSON.stringify(data));
      this.userService.forgotPass(formdata)
        .subscribe(res => {
          this.errMessage = '';
          this.successMessage = 'Vui lòng kiểm tra email để lấy mật khẩu!';
          setTimeout(() => {
            this.router.navigate(['hometotal/login']);
          }, 3000);
        },
          error => {
            this.successMessage = '';
            const status = error.status;
            if (status === 404) {
              this.errMessage = 'Tài khoản không tồn tại!';
            } else if (status === 403) {
              this.errMessage = 'Tài khoản chưa được kích hoạt!';
            } else {
              this.errMessage = 'EXPECTATION FAILED';
            }

          });
    }
  }
}
