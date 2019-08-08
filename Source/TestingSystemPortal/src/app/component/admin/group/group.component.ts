import { Component, OnInit, ViewChild } from '@angular/core';
import { Group } from 'src/app/model/group/group';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Popup } from 'ng2-opd-popup';
import { GroupService } from 'src/app/service/group/group.service';
import { Router } from '@angular/router';
import { concatMap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { CheckRolePermissionOrMenu } from 'src/app/common/checkRolePermissionOrMenu';
import { MenuFilterService } from 'src/app/service/menu_filter/menu-filter.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  listGroup: Object[] = [];
  listGroup2: Group[] = [];
  listUpdate: Group[] = [];
  insertForm: FormGroup;
  updateForm: FormGroup;
  selectForm = [{ name: 'Department', id: '1' }, { name: 'Group', id: '0' }];
  group: Group;
  showType: string;
  showInsertForm: Boolean = false;
  showUpdateForm: Boolean = false;
  errGroup = '';
  errDelete = '';
  perPage = 5;
  keySearch = '';
  xyz = '';
  deleteId: number;
  check: string;
  parrents: string;
  @ViewChild('popupDelete') popupDelete: Popup;
  @ViewChild('popupDeleteChildren') popupDeleteChildren: Popup;
  @ViewChild('popupApplyFailed') popupApplyFailed: Popup;
  constructor(
    private groupService: GroupService,
    private fb: FormBuilder,
    private router: Router,
    private titleService: Title,
    private checkRole: CheckRolePermissionOrMenu,
    private menuFilter: MenuFilterService
  ) {
    this.menuFilter.checkMenu();
    this.showType = 'table';
  }

  async ngOnInit() {
    this.titleService.setTitle('Testonline System - Group');
    this.insertForm = this.fb.group({
      // tslint:disable-next-line:max-line-length
      name: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9.\-_$@*!,_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹýẾế\\s]+$')]],
      // type: String,
      // parent_name: String
    });
    this.updateForm = this.fb.group({
      id: [''],
      // tslint:disable-next-line:max-line-length
      name: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9.\-_$@*!,_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹýẾế\\s]+$')]],
      // type: String,
      // parent_name: String
    });
    const menuSuccess = await this.menuFilter.checkMenu();
    if (menuSuccess === 1) {
    this.groupService.getListGroup2().subscribe(res => {
      this.listGroup = res;
    });
    this.groupService.getListGroup().subscribe(res => (this.listGroup2 = res));
  }
  }
  onClickAddNew() {
    this.insertForm.reset();
    this.showType = 'form';
    this.showInsertForm = true;
    this.showUpdateForm = false;
    // this.insertForm.get('type').setValue('1');
    this.errGroup = '';
  }
  onClickCloseForm() {
    this.showType = 'table';
    this.showInsertForm = false;
    this.showUpdateForm = false;
  }
  onSubmitInsert() {
    const { valid, value } = this.insertForm;
    if (valid) {
      const gro = value;
      if (gro.parent_name === null) {
        gro.parent_name = 0;
      }
      const formdata = new FormData();
      formdata.append('group', JSON.stringify(gro));
      this.groupService
        .insertGroup(formdata)
        .pipe(concatMap(_ => this.groupService.getListGroup2()))
        .subscribe(
          res => {
            this.groupService.getListGroup().subscribe(resp => (this.listGroup2 = resp));
            this.listGroup = res;
            this.insertForm.reset();
            this.showInsertForm = false;
            this.showType = 'table';
          },
          error => {
            this.errGroup = 'Tên group đã tồn tại. Vui lòng nhập tên khác!';
          }
        );
    }
  }

  onClickDelete(gro: Object, g: string) {
    this.deleteId = gro['0'];
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
    this.parrents = g;
  if (this.parrents === null) {
  this.xyz = 'Xóa group này sẽ xóa hết các group con của nó?';
    this.popupDelete.show(this.popupDelete.options);
  }
  if (this.parrents != null) {
    this.xyz = 'Bạn có chắc chắn xóa group không';
    this.popupDelete.show(this.popupDelete.options);
  }
  }
  confirmDeleteClick() {
    this.groupService
      .deleteGroup(this.deleteId)
      .pipe(concatMap(_ => this.groupService.getListGroup2()))
      .subscribe(
        res => {
          this.groupService.getListGroup().subscribe(resp => (this.listGroup2 = resp));
          this.listGroup = res;
        },
        error => {
          this.router.navigate(['/error']);
        }
      );
    this.popupDelete.hide();
  }

  onClickUpdate(gro: Object) {
    // this.updateForm.patchValue(gro);
    // this.group = gro;
    this.updateForm.get('id').setValue(gro['0']);
    this.updateForm.get('name').setValue(gro['1']);
    // this.updateForm.get('type').setValue(gro['3']);
    // this.updateForm.get('parent_name').setValue(gro['6']);
    // this.updateForm.get('type').setValue('1');
    this.removeSeftName(gro['0']);
    this.showUpdateForm = true;
    this.showType = 'form';
    this.showInsertForm = false;
    this.errGroup = '';
  }
  onSubmitUpdate() {
    const { valid, value } = this.updateForm;
    if (valid) {
      const data = value;
      if (data.parent_name === null) {
        data.parent_name = 0;
      }
      const formdata = new FormData();
      formdata.append('group', JSON.stringify(data));
      this.groupService
        .updateGroup(formdata)
        .pipe(concatMap(_ => this.groupService.getListGroup2()))
        .subscribe(
          res => {
            this.groupService.getListGroup().subscribe(resp => (this.listGroup2 = resp));
            this.listGroup = res;
            this.showUpdateForm = false;
            this.showType = 'table';
          },
          error => {
            this.errGroup = 'Tên group đã tồn tại. Vui lòng nhập tên khác!';
          }
        );
    }
  }
  search(event) {
    this.keySearch = event.target.value.trim();
    if (this.keySearch.trim() !== '') {
      const body = {
        key: this.keySearch
      };
      this.groupService
        .searchGroup(this.keySearch)
        .pipe(concatMap(_ => this.groupService.searchGroup(this.keySearch.trim())))
        .subscribe(
          res => {
            this.listGroup = res;
          },
          error => {
            this.router.navigate(['/error']);
          }
        );
    } else {
      this.groupService
        .getListGroup2()
        .subscribe(res => (this.listGroup = res));
    }
  }
  sort(name: string) {
    if (this.listGroup !== null) {
      const body = {
        name: name
      };
      this.groupService
        .sortGroupByName(name)
        .pipe(concatMap(_ => this.groupService.sortGroupByName(name)))
        .subscribe(
          res => {
            this.listGroup = res;
          },
          error => {
            this.router.navigate(['/error']);
          }
        );
    }
  }

  checkRolePermission(controllerAnAction): boolean {
    return this.checkRole.checkRole(controllerAnAction);
  }

  trackByFn(index, item) {
    return item.id;
  }
  onChange(event) {
    this.perPage = event.target.value;
  }
  checkSpaceName(event) {
    const val = event.target.value.trim();
    this.insertForm.get('name').setValue(val.replace(/\s\s+/g, ' '));
  }
  checkSpaceNameUpdate(event) {
    const val = event.target.value.trim();
    this.updateForm.get('name').setValue(val.replace(/\s\s+/g, ' '));
  }
  removeSeftName(id: number) {
    this.listUpdate = [];
    // tslint:disable-next-line:prefer-const
    let len = this.listGroup2.length;
    for (let i = 0 ; i < len ; i++) {
     if (this.listGroup2[i].id === id) {
        continue;
     } else { this.listUpdate.push(this.listGroup2[i]);
     }
    }
  }
  onClickListUser(id) {
     this.router.navigate(['cms/group/listuser',id]);
  }
}
