import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { concatMap } from 'rxjs/operators';
import { Popup } from 'ng2-opd-popup';
import { Menu } from 'src/app/model/menu/menu';
import { MenuService } from 'src/app/service/menu/menu.service';
import { PermissionService } from 'src/app/service/permission/permission.service';
import { Title } from '@angular/platform-browser';
import { CheckRolePermissionOrMenu } from 'src/app/common/checkRolePermissionOrMenu';
import { MenuFilterService } from 'src/app/service/menu_filter/menu-filter.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  listMenu: Object[] = [];
  listParentName: Menu[] = [];
  listController: string[] = [];
  listAction: string[] = [];
  insertForm: FormGroup;
  updateForm: FormGroup;
  showTable: Boolean = true;
  showInsertForm: Boolean = false;
  showUpdateForm: Boolean = false;
  perPage = 5;
  errorMenu = '';
  idDelete: number;
  keySearch = '';
  @ViewChild('popupDelete') popupDelete: Popup;
  @ViewChild('popupApplyFailed') popupApplyFailed: Popup;
  constructor(
    private service: MenuService,
    private fb: FormBuilder,
    private router: Router,
    private servicePer: PermissionService,
    private titleService: Title,
    private checkRole: CheckRolePermissionOrMenu,
    private menuFilter: MenuFilterService
  ) {
    this.menuFilter.checkMenu();
  }

  async ngOnInit() {
    this.titleService.setTitle('Testonline System - Menu');
    this.insertForm = this.fb.group({
      // tslint:disable-next-line:max-line-length
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(50)
        ]
      ],
      parent_name: [''],
      // tslint:disable-next-line:max-line-length
      icon: [
        '',
        [
          Validators.required,
          Validators.maxLength(20)
        ]
      ],
      // tslint:disable-next-line:max-line-length
      link: [
        '',
        [
          Validators.required,
          Validators.maxLength(256)
        ]
      ]
    });
    this.updateForm = this.fb.group({
      id: [''],
      // tslint:disable-next-line:max-line-length
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(50)
        ]
      ],
      parent_name: [''],
      // tslint:disable-next-line:max-line-length
      icon: [
        '',
        [
          Validators.required,
          Validators.maxLength(20)
        ]
      ],
      // tslint:disable-next-line:max-line-length
      link: [
        '',
        [
          Validators.required,
          Validators.maxLength(256)
        ]
      ],
      order_num: ['', [Validators.required]]
    });
    const menuSuccess = await this.menuFilter.checkMenu();
    if (menuSuccess === 1) {
    this.service.getListMenu().subscribe(res => (this.listMenu = res));
    this.service
      .getListParentName()
      .subscribe(res => (this.listParentName = res));
  }
}
  filterByTitle(event) {}
  Change(event) {
    const formData = new FormData();
    const text = event.target.value;
    formData.append('nameController', text);
    this.servicePer
      .getListAction(text)
      .pipe(concatMap(_ => this.servicePer.getListAction(text)))
      .subscribe(res => {
        this.listAction = res;
      });
  }
  onClickAddNew() {
    this.insertForm.reset();
    this.showTable = false;
    this.showInsertForm = true;
    this.showUpdateForm = false;
    this.errorMenu = '';
  }
  onClickCloseForm() {
    this.showTable = true;
    this.showInsertForm = false;
    this.showUpdateForm = false;
  }
  onSubmitInsert() {
    const { valid, value } = this.insertForm;
    if (valid) {
      const menu = value;
      if (menu.parent_name === null) {
        menu.parent_name = 0;
      }
      const formData = new FormData();
      formData.append('menu', JSON.stringify(menu));
      this.service
        .insertMenu(formData)
        .pipe(concatMap(_ => this.service.getListMenu()))
        .subscribe(
          res => {
            this.listMenu = res;
            this.insertForm.reset();
            this.showInsertForm = false;
            this.showTable = true;
          },
          err => {
            this.errorMenu = 'Tên menu không được trùng!';
          }
        );
    }
  }

  checkRolePermission(controllerAnAction): boolean {
    return this.checkRole.checkRole(controllerAnAction);
  }
  onClickDelete(m: Object) {
    this.idDelete = m['0'];
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
      .deleteMenu(this.idDelete)
      .pipe(concatMap(_ => this.service.getListMenu()))
      .subscribe(
        res => {
          this.listMenu = res;
        },
        err => {
          this.router.navigate(['/error']);
        }
      );
    this.popupDelete.hide();
  }
  onClickUpdate(menu: Object) {
    this.updateForm.get('id').setValue(menu['0']);
    this.updateForm.get('name').setValue(menu['1']);
    this.updateForm.get('parent_name').setValue(menu['6']);
    this.updateForm.get('icon').setValue(menu['2']);
    this.updateForm.get('link').setValue(menu['3']);
    this.updateForm.get('order_num').setValue(menu['4']);
    this.showUpdateForm = true;
    this.showTable = false;
    this.showInsertForm = false;
    this.errorMenu = '';
  }
  onSubmitUpdate() {
    const { valid, value } = this.updateForm;
    if (valid) {
      const menu = value;
      if (menu.parent_name === null) {
        menu.parent_name = 0;
      }
      const formData = new FormData();
      formData.append('menu', JSON.stringify(menu));
      this.service
        .updateMenu(formData)
        .pipe(concatMap(_ => this.service.getListMenu()))
        .subscribe(
          res => {
            this.listMenu = res;
            this.updateForm.reset();
            this.showUpdateForm = false;
            this.showTable = true;
          },
          err => {
            this.errorMenu = 'Order_num không được trùng!';
          }
        );
    }
  }
  search(event) {
    this.keySearch = event.target.value.trim();
    if (this.keySearch !== '') {
      const body = {
        key: this.keySearch
      };
      this.service
        .onSearchMenu(this.keySearch)
        .pipe(concatMap(_ => this.service.onSearchMenu(this.keySearch)))
        .subscribe(
          res => {
            this.listMenu = res;
          },
          error => {
            this.router.navigate(['/error']);
          }
        );
    } else {
      this.service.getListMenu().subscribe(res => (this.listMenu = res));
    }
  }
  checkSpaceName(event) {
    const val = event.target.value.trim();
    this.insertForm.get('name').setValue(val.replace(/\s\s+/g, ' '));
  }
  checkSpaceLink(event) {
    const val = event.target.value.trim();
    this.insertForm.get('link').setValue(val.replace(/\s\s+/g, ' '));
  }
  checkSpaceIcon(event) {
    const val = event.target.value.trim();
    this.insertForm.get('icon').setValue(val.replace(/\s\s+/g, ' '));
  }
  checkSpaceNameUpdate(event) {
    const val = event.target.value.trim();
    this.updateForm.get('name').setValue(val.replace(/\s\s+/g, ' '));
  }
  checkSpaceLinkUpdate(event) {
    const val = event.target.value.trim();
    this.updateForm.get('link').setValue(val.replace(/\s\s+/g, ' '));
  }
  checkSpaceIconUpdate(event) {
    const val = event.target.value.trim();
    this.updateForm.get('icon').setValue(val.replace(/\s\s+/g, ' '));
  }
  trackByFn(index, item) {
    return item.id;
  }
  onChange(event) {
    this.perPage = event.target.value;
  }
}
