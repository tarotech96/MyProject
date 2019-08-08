import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { concatMap } from 'rxjs/operators';
import { Popup } from 'ng2-opd-popup';
import { Router } from '@angular/router';
import { SlideBars } from 'src/app/model/slidebar/slidebar';
import { SlidebarService } from 'src/app/service/slidebar/slidebar.service';
import { Title } from '@angular/platform-browser';
import { CheckRolePermissionOrMenu } from 'src/app/common/checkRolePermissionOrMenu';
import { Constant } from 'src/app/common/constant';

declare var $: any;

function validatorEmptyInput(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { whitespace: true };
}
@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.scss']
})
export class SlidebarComponent implements OnInit {
  slideBars: SlideBars[] = [];
  insertForm: FormGroup;
  updateForm: FormGroup;
  image: any = File;
  imageUpdate: any = File;
  slidebar: SlideBars;
  keySearch = '';
  slideBarToDelete: SlideBars;
  slideBarActiveNow: SlideBars[] = [];
  showTable: Boolean = true;
  showInsertForm: Boolean = false;
  showUpdateForm: Boolean = false;
  perPage = 5;
  showMedia: boolean;
  imageSrc: any;
  imageBefore: string;
  baseURL = '';

  @ViewChild('popupDelete') popupDelete: Popup;
  @ViewChild('popupApplyFailed') popupApplyFailed: Popup;

  constructor(
    private slidebarService: SlidebarService,
    private fb: FormBuilder,
    private router: Router,
    private titleService: Title,
    private checkRole: CheckRolePermissionOrMenu
  ) {}

  ngOnInit() {
    this.baseURL = Constant.BASE_URL;
    this.titleService.setTitle('Testonline System - Slidebar');
    this.slidebarService.getAllSlideBar().subscribe(
      res => {
        this.slideBars = res;
      },
      err => {
        this.router.navigate(['/error']);
      }
    );
    this.slidebarService.getListSlideBarActive().subscribe(
      res => {
        this.slideBarActiveNow = res;
      },
      err => {
        this.router.navigate(['/error']);
      }
    );
    this.insertForm = this.fb.group({
      title: [
        '',
        [Validators.required, Validators.maxLength(60), validatorEmptyInput]
      ],
      image: ['', [Validators.required, Validators.pattern(/(\.jpg|\.png)$/i)]],
      slogan: [
        '',
        [Validators.required, Validators.maxLength(260), validatorEmptyInput]
      ]
    });
    this.updateForm = this.fb.group({
      title: [
        '',
        [Validators.required, Validators.maxLength(60), validatorEmptyInput]
      ],
      image: ['', [Validators.pattern(/(\.jpg|\.png)$/i)]],
      slogan: [
        '',
        [Validators.required, Validators.maxLength(260), validatorEmptyInput]
      ]
    });
  }

  filterByTitle(event) {
    this.keySearch = event.target.value.trim();
    if (this.keySearch !== '') {
      const body = {
        key: this.keySearch
      };
      const formData = new FormData();
      formData.append('data', JSON.stringify(body));
      this.slidebarService.search(formData).subscribe(
        res => {
          this.slideBars = res;
        },
        err => {
          this.router.navigate(['/error']);
        }
      );
    } else {
      this.slidebarService
        .getAllSlideBar()
        .subscribe(res => (this.slideBars = res));
    }
  }
  setImage(event) {
    if (event.target.files && event.target.files[0]) {
      this.showMedia = false;
      this.image = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => (this.imageSrc = reader.result);
      reader.readAsDataURL(this.image);
    } else {
      this.imageSrc = '';
    }
  }
  onClickAddNew() {
    this.insertForm.reset();
    this.showTable = false;
    this.showInsertForm = true;
    this.showUpdateForm = false;
    this.showMedia = true;
  }
  onClickCloseForm() {
    this.showTable = true;
    this.showInsertForm = false;
    this.showUpdateForm = false;
  }
  checkRolePermission(controllerAnAction): boolean {
    return this.checkRole.checkRole(controllerAnAction);
  }
  onSubmitInsert() {
    const { valid, value } = this.insertForm;
    if (valid) {
      const cmcer = value;
      const formData = new FormData();
      formData.append('slidebar', JSON.stringify(cmcer));
      formData.append('image', this.image);
      this.slidebarService
        .insertSlideBar(formData)
        .pipe(concatMap(_ => this.slidebarService.getAllSlideBar()))
        .subscribe(
          res => {
            this.slideBars = res;
          },
          err => {
            this.router.navigate(['/error']);
          }
        );
      this.insertForm.reset();
      this.showInsertForm = false;
      this.showTable = true;
    }
  }
  onClickDelete(slidebar: SlideBars) {
    this.slideBarToDelete = slidebar;
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
    this.slidebarService
      .deleteSlideBar(this.slideBarToDelete.id)
      .pipe(concatMap(_ => this.slidebarService.getAllSlideBar()))
      .subscribe(
        res => {
          this.slideBars = res;
        },
        err => {
          this.router.navigate(['/error']);
        }
      );
    this.popupDelete.hide();
  }
  setUpdateImage(event) {
    const file = event.target.files[0];
    this.imageUpdate = file;
  }
  onClickUpdate(slidebar: SlideBars) {
    this.updateForm.patchValue(slidebar);
    this.imageBefore = slidebar.img;
    this.showMedia = true;
    this.slidebar = slidebar;
    this.showUpdateForm = true;
    this.showTable = false;
    this.showInsertForm = false;
  }

  onSubmitUpdate() {
    const { valid, value } = this.updateForm;
    if (valid) {
      const slidebar = value;
      slidebar.id = this.slidebar.id;
      const formData = new FormData();
      formData.append('slidebar', JSON.stringify(slidebar));
      formData.append('image', this.image);
      this.slidebarService
        .updateSlideBar(formData)
        .pipe(concatMap(_ => this.slidebarService.getAllSlideBar()))
        .subscribe(
          res => {
            this.slideBars = res;
          },
          err => {
            this.router.navigate(['/error']);
          }
        );
      this.updateForm.reset();
      this.showUpdateForm = false;
      this.showTable = true;
    }
  }
  onClickApply(slidebar: SlideBars) {
    if (slidebar.show === false) {
      slidebar.show = true;
      const formData = new FormData();
      formData.append('slidebar', JSON.stringify(slidebar));
      this.slidebarService
        .updateSlideBarStatus(formData)
        .pipe(concatMap(_ => this.slidebarService.getListSlideBarActive()))
        .subscribe(
          res => {
            this.slideBarActiveNow = res;
          },
          err => {
            this.router.navigate(['/error']);
          }
        );
    } else {
      if (this.slideBarActiveNow.length > 2) {
        slidebar.show = false;
        const formData = new FormData();
        formData.append('slidebar', JSON.stringify(slidebar));
        this.slidebarService
          .updateSlideBarStatus(formData)
          .pipe(concatMap(_ => this.slidebarService.getListSlideBarActive()))
          .subscribe(
            res => {
              this.slideBarActiveNow = res;
            },
            err => {
              this.router.navigate(['/error']);
            }
          );
      } else {
        this.popupApplyFailed.options = {
          header: 'Lỗi',
          color: '#C82333',
          showButtons: false,
          widthProsentage: 30,
          animation: 'bounceIn'
        };
        this.popupApplyFailed.show(this.popupApplyFailed.options);
        setTimeout(
          function() {
            this.popupApplyFailed.hide();
          }.bind(this),
          2000
        );
      }
    }
  }
  // Phan trang
  trackByFn(index, item) {
    return item.id;
  }
  onChange(event) {
    this.perPage = event.target.value;
  }
}
