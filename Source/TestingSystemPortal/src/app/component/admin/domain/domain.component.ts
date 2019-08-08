import { Component, OnInit, ViewChild } from '@angular/core';
import { domain } from 'src/app/model/domain/domain';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Popup } from 'ng2-opd-popup';
import { DomainService } from 'src/app/service/domain/domain.service';
import { Router } from '@angular/router';
import { concatMap } from 'rxjs/operators';
import { subject } from 'src/app/model/subject/subject';
import { SubjectService } from '../../../service/subject/subject.service';
import { Title } from '@angular/platform-browser';
import { CheckRolePermissionOrMenu } from 'src/app/common/checkRolePermissionOrMenu';
import { MenuFilterService } from 'src/app/service/menu_filter/menu-filter.service';

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.scss']
})
export class DomainComponent implements OnInit {
  listDomain: Object[] = [];
  listSubject: subject[] = [];
  insertForm: FormGroup;
  updateForm: FormGroup;
  domain: domain;
  showTable: Boolean = true;
  showInsertForm: Boolean = false;
  showUpdateForm: Boolean = false;
  errDomain = '';
  errInsert = '';
  deleteId: number;
  perPage = 5;
  keySearch = '';
  @ViewChild('popupDelete') popupDelete: Popup;
  @ViewChild('popupApplyFailed') popupApplyFailed: Popup;
  constructor(
    private domainSerVice: DomainService,
    private fb: FormBuilder,
    private router: Router,
    private subjectService: SubjectService,
    private titleService: Title,
    private checkRole: CheckRolePermissionOrMenu,
    private menuFilter: MenuFilterService
  ) {
    // this.menuFilter.checkMenu();
  }

  async ngOnInit() {
    this.titleService.setTitle('Testonline System - Domain');
    this.insertForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          // tslint:disable-next-line:max-line-length
          Validators.pattern(
            '^[a-zA-Z0-9.-_$@*!,_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹýẾế\\s]+$'
          )
        ]
      ],
      subject_name: ['', [Validators.required]]
    });
    this.updateForm = this.fb.group({
      id: [''],
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          // tslint:disable-next-line:max-line-length
          Validators.pattern(
            '^[a-zA-Z0-9.-_$@*!,_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹýẾế\\s]+$'
          )
        ]
      ],
      subject_name: ['', [Validators.required]]
    });
    let ok = await this.menuFilter.checkMenu();
    if (ok === 1) {
      this.domainSerVice
        .getListDomain()
        .subscribe(res => (this.listDomain = res));
      this.subjectService
        .getListSubject()
        .subscribe(res => (this.listSubject = res));
    }
  }
  onClickAddNew() {
    this.insertForm.reset();
    this.showTable = false;
    this.showInsertForm = true;
    this.showUpdateForm = false;
    this.errDomain = '';
  }
  onClickCloseForm() {
    this.showTable = true;
    this.showInsertForm = false;
    this.showUpdateForm = false;
  }
  onSubmitInsert() {
    const { valid, value } = this.insertForm;
    if (valid) {
      const dom = value;
      const formdata = new FormData();
      formdata.append('domain', JSON.stringify(dom));
      this.domainSerVice
        .createDomain(formdata)
        .pipe(concatMap(_ => this.domainSerVice.getListDomain()))
        .subscribe(
          res => {
            this.listDomain = res;
            this.insertForm.reset();
            this.showInsertForm = false;
            this.showTable = true;
          },
          error => {
            this.errDomain = 'Không được trùng cả tên domain và subject';
          }
        );
    }
    if (this.insertForm.invalid) {
      return;
    }
  }
  onClickDelete(dom: Object) {
    this.deleteId = dom['0'];
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
    this.domainSerVice
      .deleteDomain(this.deleteId)
      .pipe(concatMap(_ => this.domainSerVice.getListDomain()))
      .subscribe(
        res => {
          this.listDomain = res;
        },
        error => {
          this.router.navigate(['/error']);
        }
      );
    this.popupDelete.hide();
  }
  onClickUpdate(dom: Object) {
    // this.updateForm.patchValue(dom);
    // this.domain = dom;
    this.updateForm.get('id').setValue(dom['0']);
    this.updateForm.get('name').setValue(dom['1']);
    this.updateForm.get('subject_name').setValue(dom['4']);
    this.showUpdateForm = true;
    this.showTable = false;
    this.showInsertForm = false;
    this.errDomain = '';
  }
  onSubmitUpdate() {
    const { valid, value } = this.updateForm;
    if (valid) {
      const data = value;
      // const object = new Object();
      const formdata = new FormData();
      formdata.append('domain', JSON.stringify(data));
      this.domainSerVice
        .updateDomain(formdata)
        .pipe(concatMap(_ => this.domainSerVice.getListDomain()))
        .subscribe(
          res => {
            this.listDomain = res;
            this.showUpdateForm = false;
            this.showTable = true;
          },
          error => {
            this.errDomain = 'Không được trùng cả tên domain và subject';
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
      this.domainSerVice
        .onSearchDomain(this.keySearch)
        .pipe(
          concatMap(_ =>
            this.domainSerVice.onSearchDomain(this.keySearch.trim())
          )
        )
        .subscribe(
          res => {
            this.listDomain = res;
          },
          error => {
            this.router.navigate(['/error']);
          }
        );
    } else {
      this.domainSerVice
        .getListDomain()
        .subscribe(res => (this.listDomain = res));
    }
  }
  sort(name: string) {
    if (this.listDomain !== null) {
      const body = {
        name: name
      };
      this.domainSerVice.sortDomainByName(name).subscribe(res => {
        this.listDomain = res;
      });
    }
  }
  trackByFn(index, item) {
    return item.id;
  }
  checkSpaceName(event) {
    const val = event.target.value.trim();
    this.insertForm.get('name').setValue(val.replace(/\s\s+/g, ' '));
  }
  checkSpaceNameUpdate(event) {
    const val = event.target.value.trim();
    this.updateForm.get('name').setValue(val.replace(/\s\s+/g, ' '));
  }
  onChange(event) {
    this.perPage = event.target.value;
  }
  checkRolePermission(actionController): boolean {
    return this.checkRole.checkRole(actionController);
  }
}
