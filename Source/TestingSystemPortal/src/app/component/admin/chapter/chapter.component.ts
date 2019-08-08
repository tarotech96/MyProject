import { Component, OnInit, ViewChild } from '@angular/core';
import { chapter } from 'src/app/model/chapter/chapter';
import { ChapterService } from 'src/app/service/chapter/chapter.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Popup } from 'ng2-opd-popup';
import { concatMap } from 'rxjs/operators';
import { subject } from 'src/app/model/subject/subject';
import { SubjectService } from 'src/app/service/subject/subject.service';
import { Title } from '@angular/platform-browser';
import { CheckRolePermissionOrMenu } from 'src/app/common/checkRolePermissionOrMenu';
import { MenuFilterService } from 'src/app/service/menu_filter/menu-filter.service';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss']
})
export class ChapterComponent implements OnInit {
  listChapter: Object[] = [];
  list: chapter[] = [];
  listUpdate: chapter[] = [];
  listSubject: subject[] = [];
  insertForm: FormGroup;
  updateForm: FormGroup;
  chapter: chapter;
  showTable: Boolean = true;
  showInsertForm: Boolean = false;
  showUpdateForm: Boolean = false;
  errChapter = '';
  errSubject = '';
  perPage = 5;
  idDelete: number;
  parrents: string;
  xyz = '';
  keySearch = '';
  @ViewChild('popupDelete') popupDelete: Popup;
  @ViewChild('popupApplyFailed') popupApplyFailed: Popup;
  constructor(
    private chapterService: ChapterService,
    private subjectService: SubjectService,
    private fb: FormBuilder,
    private router: Router,
    private titleService: Title,
    private checkRole: CheckRolePermissionOrMenu,
    private menuFilter: MenuFilterService
  ) {
    this.menuFilter.checkMenu();
  }

  async ngOnInit() {
    this.titleService.setTitle('Testonline System - Chapter');
    this.insertForm = this.fb.group({
      // tslint:disable-next-line:max-line-length
      name: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9.\-_$@*!,_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹýẾế\\s]+$')]],
      parent_name: [''],
      subject_name: ['', [Validators.required]]
    });
    this.updateForm = this.fb.group({
      id: [''],
      // tslint:disable-next-line:max-line-length
      name: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z0-9.\-_$@*!,_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹýẾế\\s]+$')]],
      parent_name: [''],
      subject_name: ['', [Validators.required]]
    });
    let menuSuccess = await this.menuFilter.checkMenu();
    if (menuSuccess === 1) {
    this.chapterService
      .getListChapter()
      .subscribe(res => (this.listChapter = res));
    this.subjectService
      .getListSubject()
      .subscribe(res => (this.listSubject = res));
    this.chapterService.listChapter().subscribe(res => (this.list = res));
    }
  }
  onClickAddNew() {
    this.insertForm.reset();
    this.showTable = false;
    this.showInsertForm = true;
    this.showUpdateForm = false;
    this.errChapter = '';
  }
  onClickCloseForm() {
    this.showTable = true;
    this.showInsertForm = false;
    this.showUpdateForm = false;
  }
  onSubmitInsert() {
    const { valid, value } = this.insertForm;
    if (valid) {
      const chap = value;
      if (chap.parent_name === null) {
        chap.parent_name = 0;
      }
      const formdata = new FormData();
      formdata.append('chapter', JSON.stringify(chap));
      this.chapterService
        .createChapter(formdata)
        .pipe(concatMap(_ => this.chapterService.getListChapter()))
        .subscribe(
          res => {
            this.chapterService
              .listChapter()
              .subscribe(resp => (this.list = resp));
            this.listChapter = res;
            this.insertForm.reset();
            this.showInsertForm = false;
            this.showTable = true;
          },
          error => {
            this.errChapter = 'Không được trùng tên chapter và subject ';
          }
        );
    }
  }
  onClickDelete(chap: Object, c: string) {
    this.idDelete = chap['0'];
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
    this.parrents = c;
  if (this.parrents === null) {
  this.xyz = 'Xóa chapter này sẽ xóa hết các group con của nó?';
    this.popupDelete.show(this.popupDelete.options);
  }
  if (this.parrents != null) {
    this.xyz = 'Bạn có chắc chắn xóa chapter không';
    this.popupDelete.show(this.popupDelete.options);
  }
  }
  confirmDeleteClick() {
    this.chapterService
      .deleteChapter(this.idDelete)
      .pipe(concatMap(_ => this.chapterService.getListChapter()))
      .subscribe(
        res => {
          this.chapterService.listChapter().subscribe(resp => (this.list = resp));
          this.listChapter = res;
        },
        error => {
          this.router.navigate(['/error']);
        }
      );
    this.popupDelete.hide();
  }
  onClickUpdate(chap: Object) {
    this.updateForm.get('id').setValue(chap['0']);
    this.updateForm.get('name').setValue(chap['1']);
    this.updateForm.get('parent_name').setValue(chap['6']);
    this.updateForm.get('subject_name').setValue(chap['4']);
    this.removeSeftName(chap['0']);
    this.showUpdateForm = true;
    this.showTable = false;
    this.showInsertForm = false;
    this.errChapter = '';
  }
  onSubmitUpdate() {
    const { valid, value } = this.updateForm;
    if (valid) {
      const data = value;
      if (data.parent_name === null) {
        data.parent_name = 0;
      }
      const formdata = new FormData();
      formdata.append('chapter', JSON.stringify(data));
      this.chapterService
        .updateChapter(formdata)
        .pipe(concatMap(_ => this.chapterService.getListChapter()))
        .subscribe(
          res => {
            this.chapterService
              .listChapter()
              .subscribe(resp => (this.list = resp));
            this.listChapter = res;
            this.showUpdateForm = false;
            this.showTable = true;
          },
          error => {
            this.errChapter = 'Không được trùng tên chapter và subject';
          }
        );
    }
  }
  checkRolePermission(controllerAnAction): boolean {
    return this.checkRole.checkRole(controllerAnAction);
  }
  search(event) {
    this.keySearch = event.target.value.trim();
    if (this.keySearch.trim() !== '') {
      const body = {
        key: this.keySearch
      };
      this.chapterService
        .onSearchChapter(this.keySearch)
        .pipe(
          concatMap(_ => this.chapterService.onSearchChapter(this.keySearch.trim()))
        )
        .subscribe(
          res => {
            this.listChapter = res;
          },
          error => {
            this.router.navigate(['/error']);
          }
        );
    } else {
      this.chapterService
        .getListChapter()
        .subscribe(
          res => (this.listChapter = res));
    }
  }
  sort(name: string) {
    if (this.listChapter !== null) {
      const body = {
        name: name
      };
      this.chapterService
        .sortChapterByName(name)
        .pipe(concatMap(_ => this.chapterService.sortChapterByName(name)))
        .subscribe(
          res => {
            this.listChapter = res;
          },
          error => {
            this.router.navigate(['/error']);
          }
        );
    }
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
    let len = this.list.length;
    for (let i = 0 ; i < len ; i++) {
     if (this.list[i].id === id) {
        continue;
     } else { this.listUpdate.push(this.list[i]);
     }
    }
  }
}
