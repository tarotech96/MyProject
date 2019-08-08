import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { concatMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Popup } from 'ng2-opd-popup';
import { User } from 'src/app/model/user/users';
import { UserService } from 'src/app/service/login/user.service';
import { Title } from '@angular/platform-browser';
import { validateDOB } from '../../user/edit-profile/edit-profile.component';
import { Roles } from 'src/app/model/role/Roles';
import { RoleService } from 'src/app/service/role/role.service';
import { CheckRolePermissionOrMenu } from 'src/app/common/checkRolePermissionOrMenu';
import { Constant } from 'src/app/common/constant';
import { MenuFilterService } from 'src/app/service/menu_filter/menu-filter.service';

export function validatorEmptyInput(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { whitespace: true };
}
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  listUser: User[] = [];
  insertForm: FormGroup;
  updateForm: FormGroup;
  listRole: Roles[];
  image: any;
  user: User = {
    id: 0,
    fullname: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    birthday: '',
    img: '',
    status: 0
  };
  showTable: Boolean = true;
  showInsertForm: Boolean = false;
  showUpdateForm: Boolean = false;
  errorExistEmail = '';
  keySearch = '';
  imageSrc: any;
  imageBefore: string;
  showMedia: boolean;
  perPage: 5;
  selectForm = [{ name: 'Active', id: '1' }, { name: 'InActive', id: '0' }];
  baseURL = '';
  constructor(
    public service: UserService,
    private fb: FormBuilder,
    private router: Router,
    private titleService: Title,
    private checkRole: CheckRolePermissionOrMenu,
    private menuFilter: MenuFilterService
  ) {
  }
  @ViewChild('popupDelete') popupDelete: Popup;
  @ViewChild('popupApplyFailed') popupApplyFailed: Popup;
  async ngOnInit() {
    this.baseURL = Constant.BASE_URL;
    this.titleService.setTitle('Testonline System - User');
    this.insertForm = this.fb.group({
      fullname: [
        '',
        [validatorEmptyInput,Validators.required, Validators.maxLength(50)
        ]
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.minLength(6),
          Validators.required,
          Validators.maxLength(32)
        ]
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(12),
          Validators.pattern('^[0-9]*$')
        ]
      ],
      address: ['', Validators.maxLength(255)],
      birthday: ['', [validateDOB]],
      img: ['']
    });

    this.updateForm = this.fb.group({
      id: [''],
      fullname: ['', [validatorEmptyInput,Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]],
      phone: [
        '',
        [Validators.required, Validators.minLength(9), Validators.maxLength(12)]
      ],
      address: ['', Validators.maxLength(255)],
      status: [''],
      img: ['']
    });
    let menuSuccess = await this.menuFilter.checkMenu();
    if (menuSuccess === 1) {
    this.service.getUserList().subscribe(res => {
      this.listUser = res;
      this.perPage = 5;
    });
  }
}
  validateDOB() {
    const dateString = new Date(this.user.birthday);
    const myDate = new Date(dateString);
    const today = new Date();
    if (myDate.getFullYear > today.getFullYear) {
      if (myDate.getMonth > today.getMonth) {
        if (myDate.getDate > today.getDate) {
          return false;
        }
      }
    }
    return true;
  }
  onClickDelete(u: User) {
    this.user = u;
    this.popupDelete.options = {
      header: 'Xóa',
      color: '#C82333',
      confirmBtnClass: 'btn btn-danger',
      confirmBtnContent: 'Xóa',
      cancleBtnClass: 'btn btn-default',
      cancleBtnContent: 'Hủy',
      widthProsentage: 30,
      animation: 'bounceIn'
    };
    this.popupDelete.show(this.popupDelete.options);
  }
  confirmDeleteClick() {
    this.service
      .deleteUserbyId(this.user.id)
      .pipe(concatMap(_ => this.service.getUserList()))
      .subscribe(
        res => {
          this.listUser = res;
        },
        err => {
          this.errorExistEmail = 'Xóa không thành công';
        }
      );
    this.popupDelete.hide();
  }
  onClickAddNew() {
    this.errorExistEmail = '';
    this.insertForm.reset();
    this.showTable = false;
    this.showMedia = true;
    this.showInsertForm = true;
    this.showUpdateForm = false;
  }
  onChangeFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.showMedia = true;
      this.image = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => (this.imageSrc = reader.result);
      reader.readAsDataURL(this.image);
    } else {
      this.imageSrc = '';
    }
  }
  sort(typeSort: string) {
    if (this.listUser !== null) {
      const body = {
        key: this.keySearch,
        type: typeSort
      };
      const formData = new FormData();
      formData.append('data', JSON.stringify(body));
      this.service
        .sortUser(formData)
        .pipe(concatMap(_ => this.service.sortUser(formData)))
        .subscribe(
          res => {
            this.listUser = res;
          },
          err => {
            this.router.navigate(['/error']);
          }
        );
    }
  }
  onClickUpdate(u: User) {
    this.updateForm.patchValue(u);
    this.user = u;
    this.showUpdateForm = true;
    this.showTable = false;
    this.showInsertForm = false;
  }
  onClickCloseForm() {
    this.showTable = true;
    this.showInsertForm = false;
    this.showUpdateForm = false;
  }
  onSubmitInsert() {
    const { valid, value } = this.insertForm;
    if (valid) {
      const data = value;
      const formData = new FormData();
      formData.append('user', JSON.stringify(data));
      formData.append('image', this.image);
      this.service
        .createUser(formData)
        .pipe(concatMap(_ => this.service.getUserList()))
        .subscribe(
          res => {
            this.listUser = res;
            this.errorExistEmail = '';
            this.showInsertForm = false;
            this.showTable = true;
          },
          err => {
            this.errorExistEmail = err.error.message;
          }
        );
    }
  }
  onSubmitUpdate() {
    const { valid, value } = this.updateForm;
    if (valid) {
      const data = value;
       data.id = this.user.id;
      const formData = new FormData();
      formData.append('user', JSON.stringify(data));
      formData.append('image', this.image);
      this.service
        .updateUser(formData)
        .pipe(concatMap(_ => this.service.getUserList()))
        .subscribe(
          res => {
            this.listUser = res;
            this.showUpdateForm = false;
            this.showTable = true;
          },
          err => {
            this.errorExistEmail = err.error.message;
          }
        );
    }
  }
  checkSpaceFullName(event) {
    const val = event.target.value;
    this.insertForm.get('fullname').setValue(val.replace(/\s\s+/g, ' '));
  }
  search(event) {
    this.keySearch = event.target.value.trim();
    if (this.keySearch !== '') {
      const body = {
        key: this.keySearch
      };
      const formData = new FormData();
      formData.append('data', JSON.stringify(body));
      this.service
        .searchUser(formData)
        .pipe(concatMap(_ => this.service.searchUser(formData)))
        .subscribe(
          res => {
            this.listUser = res;
          }
        );
    } else {
      this.service.getUserList().subscribe(res => (this.listUser = res));
    }
  }
  activeAccount(email: string) {
    this.service.activeAccout(email).subscribe(res => {
      this.user = res;
    });
  }
  infor(email: string) {
    this.service.getUserbyEmail(email).subscribe(res => {
      this.router.navigate(['/cms/profile', email]);
    });
  }
  checkRolePermission(controllerAnAction): boolean {
    return this.checkRole.checkRole(controllerAnAction);
  }
  onChange(event) {
    this.perPage = event.target.value;
  }

  trackByFn(index, item) {
    return item.id;
  }
}
