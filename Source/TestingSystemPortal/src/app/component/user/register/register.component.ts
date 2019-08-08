import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user/users';
import { UserRegistrationService } from 'src/app/service/userRegistration/user-registration.service';
import { Title } from '@angular/platform-browser';

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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  listUser: User[] = [];

  createForm: FormGroup;
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
  errorExistEmail = '';
  successExistEmail = '';
  showCreateForm: Boolean = false;
  constructor(
    private userRegistrationService: UserRegistrationService,
    private fb: FormBuilder,
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Testonline System - Register');
    this.createForm = this.fb.group({
      fullname: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('.*\\S.*[a-zA-z0-9 ]')]],
      // tslint:disable-next-line:max-line-length
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            // tslint:disable-next-line:max-line-length
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
        ]
      ],
      pass: this.fb.group(
        {
          // tslint:disable-next-line:max-line-length
          password: [
            '',
            [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(100),
              Validators.pattern(/^(?!.* )(?=.*\d)(?=.*[a-z]).{6,100}$/)
            ]
          ],
          confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
        },
        {
          validator: [comparePassword]
        }
      ),
      phone: [
        '',
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.pattern(/^\d+$/)
        ]
      ]
    });
    this.createForm.get('phone').setValue('');
  }

  onSubmitInsert() {
    this.errorExistEmail = '';
    this.successExistEmail = '';
    const { valid, value } = this.createForm;
    if (valid) {
      this.user.fullname = this.createForm.get('fullname').value;
      this.user.email = this.createForm.get('email').value;
      this.user.password = this.createForm.get('pass.password').value;
      this.user.phone = this.createForm.get('phone').value;
      const formData = new FormData();
      formData.append('user', JSON.stringify(this.user));
      this.userRegistrationService
        .createUser(formData)
        .subscribe(
          res => {
            this.successExistEmail =
              'Đăng kí thành công. Vui lòng kiểm tra email để kích hoạt tài khoản';
            setTimeout(() => {
              this.router.navigate(['hometotal/login']);
            }, 3000);
          },
          err => {
            this.errorExistEmail = 'Email đã tồn tại!';
          }
        );
    }
  }
}
