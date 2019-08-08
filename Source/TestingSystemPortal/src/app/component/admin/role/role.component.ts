import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { concatMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Popup } from 'ng2-opd-popup';
import { Roles } from 'src/app/model/role/Roles';
import { RoleService } from 'src/app/service/role/role.service';
import { CheckRolePermissionOrMenu } from 'src/app/common/checkRolePermissionOrMenu';
import { Title } from '@angular/platform-browser';
import { MenuFilterService } from 'src/app/service/menu_filter/menu-filter.service';
function validatorEmptyInput(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { whitespace: true };
}
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  listRole: Roles[] = [];
  insertForm: FormGroup;
  updateForm: FormGroup;
  role: Roles;
  showTable: Boolean = true;
  showInsertForm: Boolean = false;
  showUpdateForm: Boolean = false;
  errorExistRole = '';
  keySearch = '';
  perPage: 5;
  constructor(
    private service: RoleService,
    private fb: FormBuilder,
    private router: Router,
    private checkRole: CheckRolePermissionOrMenu,
    private titleService: Title,
    private checkRoleP: CheckRolePermissionOrMenu,
    private menuFilter: MenuFilterService
  ) {}
  @ViewChild('popupDelete') popupDelete: Popup;
  @ViewChild('popupApplyFailed') popupApplyFailed: Popup;
  async ngOnInit() {
    this.titleService.setTitle('Testonline System - Role');
    this.insertForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20), validatorEmptyInput] ],
      description: ['', [Validators.required, Validators.maxLength(50), validatorEmptyInput]]
    });
    this.updateForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.maxLength(20), validatorEmptyInput]],
      description: ['', [Validators.required, Validators.maxLength(50), validatorEmptyInput]]
    });
    let menuSuccess = await this.menuFilter.checkMenu();
    if (menuSuccess === 1) {
    this.service.getListRole().subscribe(res => {
      this.listRole = res;
      this.perPage = 5;
    });
  }
}
  onClickDelete(r: Roles) {
    this.role = r;
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
      .deleteRole(this.role.id)
      .pipe(concatMap(_ => this.service.getListRole()))
      .subscribe(
        res => {
          this.listRole = res;
        },
        err => {
          this.errorExistRole = 'Role đã tồn tại!';
        }
      );
    this.popupDelete.hide();
  }
  onClickAddNew() {
    this.errorExistRole = '';
    this.insertForm.reset();
    this.showTable = false;
    this.showInsertForm = true;
    this.showUpdateForm = false;
  }
  sort() {
    if (this.listRole !== null) {
      if (this.keySearch !== '') {
        this.service
          .getSortRoleKey(this.keySearch)
          .pipe(concatMap(_ => this.service.getSortRoleKey(this.keySearch)))
          .subscribe(
            res => {
              this.listRole = res;
            },
            err => {
              this.router.navigate(['/error']);
            }
          );
      } else {
        this.service
          .getSortRole()
          .pipe(concatMap(_ => this.service.getSortRole()))
          .subscribe(
            res => {
              this.listRole = res;
            },
            err => {
              this.router.navigate(['/error']);
            }
          );
      }
    }
  }
  onClickUpdate(r: Roles) {
    this.updateForm.patchValue(r);
    this.role = r;
    this.showUpdateForm = true;
    this.showTable = false;
    this.showInsertForm = false;
  }
  onClickCloseForm() {
    this.showTable = true;
    this.showInsertForm = false;
    this.showUpdateForm = false;
    this.errorExistRole = '';
  }
  onSubmitInsert() {
    const { valid, value } = this.insertForm;
    if (valid) {
      const role = value;
      const formData = new FormData();
      formData.append('role', JSON.stringify(role));
      this.service
        .insertRole(formData)
        .pipe(concatMap(_ => this.service.getListRole()))
        .subscribe(
          res => {
            this.listRole = res;
            this.errorExistRole = '';
            this.showInsertForm = false;
            this.showTable = true;
          },
          err => {
            this.errorExistRole = err.error.message;
          }
        );
    }
  }
  ///
  onSubmitUpdate() {
    const { valid, value } = this.updateForm;
    if (valid) {
      const Role = value;
      const formData = new FormData();
      formData.append('role', JSON.stringify(Role));
      this.service
        .updateRole(formData)
        .pipe(concatMap(_ => this.service.getListRole()))
        .subscribe(
          res => {
            this.listRole = res;
            this.errorExistRole = '';
            this.showUpdateForm = false;
            this.showTable = true;
          },
          err => {
            this.errorExistRole = 'Role đã tồn tại!';
          }
        );
    }
  }
  filterByTitle(event) {
    this.keySearch = event.target.value.trim();
    if (this.keySearch !== '') {
      const body = {
        key: this.keySearch
      };
      const formData = new FormData();
      formData.append('data', JSON.stringify(body));
      this.service
        .search(formData)
        .subscribe(
          res => {
            this.listRole = res;
          }
        );
    } else {
      this.service.getListRole().subscribe(res => (this.listRole = res));
    }
  }
  checkRolePermission(controllerAnAction): boolean {
    return this.checkRoleP.checkRole(controllerAnAction);
  }
  trackByFn(index, item) {
    return item.id;
  }
  onChange(event) {
    this.perPage = event.target.value;
  }
  isShow(rolePermistionOrMenu) {
    return this.checkRole.checkRole(rolePermistionOrMenu);
  }
}
