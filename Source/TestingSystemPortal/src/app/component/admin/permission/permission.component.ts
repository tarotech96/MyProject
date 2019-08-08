import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { concatMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Popup } from 'ng2-opd-popup';
import { Permission } from 'src/app/model/permission/permission';
import { PermissionService } from 'src/app/service/permission/permission.service';
import { Title } from '@angular/platform-browser';
import { CheckRolePermissionOrMenu } from 'src/app/common/checkRolePermissionOrMenu';
import { MenuFilterService } from 'src/app/service/menu_filter/menu-filter.service';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {
  listPermission: Permission[] = [];
  listController: string[] = [];
  listAction: string[] = [];
  permission: Permission;
  insertForm: FormGroup;
  updateForm: FormGroup;
  perPage = 5;
  errorPermission = '';
  showTable: Boolean = true;
  showInsertForm: Boolean = false;
  showUpdateForm: Boolean = false;
  keySearch = '';
  @ViewChild('popupDelete') popupDelete: Popup;
  @ViewChild('popupApplyFailed') popupApplyFailed: Popup;
  constructor(
    private service: PermissionService,
    private fb: FormBuilder,
    private router: Router,
    private titleService: Title,
    private checkRole: CheckRolePermissionOrMenu,
    private checkMenu: MenuFilterService
  ) {}

  async ngOnInit() {
    this.titleService.setTitle('Testonline System - Permission');
    this.insertForm = this.fb.group({
      // tslint:disable-next-line:max-line-length
      name: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9.\-_$@*!,_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹýẾế\\s]+$')]],
      // tslint:disable-next-line:max-line-length
      description: ['', [Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9.\-_$@*!,_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹýẾế\\s]+$')]],
      controller: ['', [Validators.required, Validators.maxLength(30)]],
      action: ['', [Validators.required, Validators.maxLength(30)]]
    });
    this.updateForm = this.fb.group({
      // tslint:disable-next-line:max-line-length
      name: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9.\-_$@*!,_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹýẾế\\s]+$')]],
      // tslint:disable-next-line:max-line-length
      description: ['', [Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9.\-_$@*!,_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹýẾế\\s]+$')]],
      controller: ['', [Validators.required, Validators.maxLength(30)]],
      action: ['', [Validators.required, Validators.maxLength(30)]]
    });
    let menuSuccess = await this.checkMenu.checkMenu();
    if (menuSuccess === 1) {
    this.service
      .getListPermission()
      .subscribe(res => (this.listPermission = res));
    this.service
      .getListController()
      .subscribe(res => (this.listController = res));
    }
  }
  Change(event) {
    const formData = new FormData();
    const text = event.target.value;
    formData.append('nameController', text);
    this.service
      .getListAction(text)
      .pipe(concatMap(_ => this.service.getListAction(text)))
      .subscribe(res => {
        this.listAction = res;
      });
  }
  onClickAddNew() {
    this.insertForm.reset();
    this.showTable = false;
    this.showInsertForm = true;
    this.showUpdateForm = false;
    this.errorPermission = '';
  }
  onClickCloseForm() {
    this.showTable = true;
    this.showInsertForm = false;
    this.showUpdateForm = false;
  }
  onSubmitInsert() {
    const { valid, value } = this.insertForm;
    if (valid) {
      const permission = value;
      if (permission.description === null) {
        permission.description = '';
      }
      const formData = new FormData();
      formData.append('permission', JSON.stringify(permission));
      this.service
        .insertPermission(formData)
        .pipe(concatMap(_ => this.service.getListPermission()))
        .subscribe(
          res => {
            this.listPermission = res;
            this.insertForm.reset();
            this.showInsertForm = false;
            this.showTable = true;
          },
          err => {
            this.errorPermission = 'Controller và action đã tồn tại!';
          }
        );
    }
  }
  onClickDelete(p: Permission) {
    this.permission = p;
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
      .deletePermission(this.permission.id)
      .pipe(concatMap(_ => this.service.getListPermission()))
      .subscribe(
        res => {
          this.listPermission = res;
        },
        err => {
          this.router.navigate(['/error']);
        }
      );
    this.popupDelete.hide();
  }
  onClickUpdate(p: Permission) {
    this.updateForm.patchValue(p);
    this.service
      .getListAction(p.controller)
      .pipe(concatMap(_ => this.service.getListAction(p.controller)))
      .subscribe(res => {
        this.listAction = res;
      });
    this.updateForm.get('action').setValue(p.action);
    this.permission = p;
    this.showUpdateForm = true;
    this.showTable = false;
    this.showInsertForm = false;
  }

  checkRolePermission(controllerAnAction): boolean {
    return this.checkRole.checkRole(controllerAnAction);
  }

  onSubmitUpdate() {
    const { valid, value } = this.updateForm;
    if (valid) {
      const permission = value;
      if (permission.description === null) {
        permission.description = '';
      }
      permission.id = this.permission.id;
      const formData = new FormData();
      formData.append('permission', JSON.stringify(permission));
      this.service
        .updatePermission(formData)
        .pipe(concatMap(_ => this.service.getListPermission()))
        .subscribe(
          res => {
            this.listPermission = res;
            this.updateForm.reset();
            this.showUpdateForm = false;
            this.showTable = true;
          },
          err => {
            this.errorPermission = 'Controller và action đã tồn tại!';
          }
        );
    }
  }
  search(event) {
    this.keySearch = event.target.value.trim();
    if (this.keySearch.trim() !== '') {
      const body = {
        key: this.keySearch.trim()
      };
      const formData = new FormData();
      formData.append('data', JSON.stringify(body));
      this.service
        .searchPermission(formData)
        .pipe(concatMap(_ => this.service.searchPermission(formData)))
        .subscribe(
          res => {
            this.listPermission = res;
          }
        );
    } else {
      this.service
        .getListPermission()
        .subscribe(res => (this.listPermission = res));
    }
  }
  checkSpaceName(event) {
    const val = event.target.value.trim();
    this.insertForm.get('name').setValue(val.replace(/\s\s+/g, ' '));
  }
  checkSpaceNameUpdate(event) {
    const val = event.target.value.trim();
    this.updateForm.get('name').setValue(val.replace(/\s\s+/g, ' '));
  }
  checkSpaceDes(event) {
    const val = event.target.value.trim();
    this.insertForm.get('description').setValue(val.replace(/\s\s+/g, ' '));
  }
  checkSpaceDesUpdate(event) {
    const val = event.target.value.trim();
    this.updateForm.get('description').setValue(val.replace(/\s\s+/g, ' '));
  }

  trackByFn(index, item) {
    return item.id;
  }
  onChange(event) {
    this.perPage = event.target.value;
  }
}
