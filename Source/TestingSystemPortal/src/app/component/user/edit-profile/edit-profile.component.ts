import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user/users';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/login/user.service';
import { HttpClient } from '@angular/common/http';
import { concatMap } from 'rxjs/internal/operators/concatMap';
import { JwtHelperService } from '@auth0/angular-jwt';
import { GetdataService } from 'src/app/service/getdata.service';
import { Constant } from 'src/app/common/constant';

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

export function NoWhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    // messy but you get the idea
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  };
}

export function validateDOB(control: AbstractControl) {
  const currentDateTime = new Date();
  const monthValue = currentDateTime.getMonth() + 1;
  const formattedDate =
    currentDateTime.getFullYear() +
    '-' +
    monthValue +
    '-' +
    currentDateTime.getDay();
  const controlValue = new Date(control.value);
  const monthOfControlValue = controlValue.getMonth() + 1;
  const FinalControlValue =
    controlValue.getFullYear() +
    '-' +
    monthOfControlValue +
    '-' +
    controlValue.getDay();
  if (formattedDate < control.value) {
    return { response: true };
  }
  return null;
}

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  listUser: User[] = [];
  image: any;
  showImg: boolean;
  imageSrc: any;
  editForm: FormGroup;
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
  showEditForm: Boolean = false;
  adminname = '';
  adminemail = '';
  userfullname = '';
  userphone = '';
  userbirthday = '';
  useraddress = '';
  userimage = '';
  adminpass = '';
  imgstatus = false;
  message = '';
  URL = '';
  arrayURL = [];
  noti = '';
  sh = '';
  hd = 'hidden';
  role: boolean;
  roleArray: string[] = [];
  img: string;
  baseURL = '';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private http: HttpClient,
    private jwt: JwtHelperService,
    public us: UserService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.baseURL = Constant.BASE_URL;
    const url = window.location.href;
    this.arrayURL = url.split('/');
    const len = this.arrayURL.length;
    this.URL = this.arrayURL[len - 2] + '/' + this.arrayURL[len - 1];
    this.img =
      Constant.BASE_URL +
      '/resources/images/user/' +
      JSON.parse(localStorage.getItem('item')).img;
    if (localStorage.getItem('role') !== null) {
      const arrayRole = localStorage.getItem('role').split(',');
      for (let index = 0; index < arrayRole.length; index++) {
        if (
          arrayRole.indexOf(arrayRole[index]) !== -1 &&
          arrayRole[index] !== 'User'.toLowerCase()
        ) {
          this.role = true;
        } else if (arrayRole[index] === 'User'.toLowerCase()) {
          this.role = false;
        }
      }
    }

    this.editForm = this.fb.group({
      email: ['', [Validators.maxLength(100)]],
      fullname: ['', [NoWhitespaceValidator, Validators.maxLength(50)]],
      phone: ['', [Validators.maxLength(11), Validators.pattern('^[0-9]*$')]],
      birthday: ['', [validateDOB, Validators.required]],
      address: ['', [Validators.maxLength(100)]],
      img: ['']
    });
    const token = this.jwt.decodeToken(localStorage.getItem('access_token'));
    this.userService.getUserbyEmail(token['username']).subscribe(res => {
      this.editForm.get('fullname').setValue(res.fullname);
      this.editForm.get('phone').setValue(res.phone);
      this.editForm.get('birthday').setValue(res.birthday);
      this.editForm.get('address').setValue(res.address);
      this.editForm.get('email').setValue(res.email);
      this.editForm.get('img').setValue(res.img);
    });
  }
  onChangeFile(event) {
    this.image = event.target.files[0];
  }
  onSubmitUpdate() {
    const { valid, value } = this.editForm;
    if (valid) {
      this.user.email = this.editForm.get('email').value;
      this.user.fullname = this.editForm.get('fullname').value;
      this.user.address = this.editForm.get('address').value;
      this.user.phone = this.editForm.get('phone').value;
      this.user.birthday = this.editForm.get('birthday').value;
      const formData = new FormData();
      formData.append('user', JSON.stringify(this.user));
      formData.append('image', this.image);
      this.userService.editProfile(formData).subscribe(
        res => {
          this.userService.getUserbyEmail(this.user.email).subscribe(ress => {
            this.userService.userLogin.fullname = ress.fullname;
            this.userService.userLogin.img = ress.img;
            localStorage.setItem(
              'item',
              JSON.stringify(this.userService.userLogin)
            );
          });
          this.showEditForm = false;
          this.noti = 'Thông tin được thay đổi thành công';
          this.hd = 'visible';
          this.sh = 'show';
          setTimeout(() => {
            this.hd = 'hidden';
            this.noti = '';
            if (this.URL === 'hometotal/edit-profile') {
              this.router.navigate(['/hometotal/profile-user']);
            } else if (this.URL === 'cms/edit-profile') {
              this.router.navigate(['/cms/profile']);
            }
          }, 1000);
        },
        err => {
          this.noti = err.error.message;
          this.hd = 'visible';
          this.sh = 'show';
          setTimeout(() => {
            this.hd = 'hidden';
            this.noti = '';
          }, 1000);
        }
      );
    }
  }
  checkSpaceFullName(event) {
    const val = event.target.value;
    this.editForm.get('fullname').setValue(val.replace(/\s\s+/g, ' '));
  }
  cancel() {
    if (this.URL === 'hometotal/edit-profile') {
      this.router.navigate(['/hometotal/profile-user']);
    } else if (this.URL === 'cms/edit-profile') {
      this.router.navigate(['/cms/profile']);
    }
  }
}
