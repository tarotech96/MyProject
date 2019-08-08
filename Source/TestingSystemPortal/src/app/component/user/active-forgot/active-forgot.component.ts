import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/login/user.service';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { concatMap } from 'rxjs/operators';
import { User } from 'src/app/model/user/users';
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
  selector: 'app-active-forgot',
  templateUrl: './active-forgot.component.html',
  styleUrls: ['./active-forgot.component.scss']
})
export class ActiveForgotComponent implements OnInit {
  listUser: User[] = [];
  updateForm: FormGroup;
  url: string;
  message = '';
  err = '';
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
  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.url = window.location.href;
    const getParam = new URL(this.url);
    this.user.email = getParam.searchParams.get('email');
    this.updateForm = this.fb.group({
      email: this.user.email,
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
  }
  forgotPass() {
    const { valid, value } = this.updateForm;

    if (valid) {
      this.user.email = this.updateForm.get('email').value;
      this.user.password = this.updateForm.get('pass.password').value;
      const formData = new FormData();
      formData.append('user', JSON.stringify(this.user));
      this.userService
        .activeForgot(formData)
        .pipe(concatMap(_ => this.userService.activeForgot(formData)))
        .subscribe(res => {
          this.message = 'Thay đổi mật khẩu thành công';
          setTimeout(() => {
            this.router.navigate(['hometotal/login']);
          }, 2000);
        });
    }
  }
}
