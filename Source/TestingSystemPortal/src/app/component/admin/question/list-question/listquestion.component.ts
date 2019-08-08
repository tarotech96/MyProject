import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Popup } from 'ng2-opd-popup';
import { concatMap } from 'rxjs/operators';
import { UploadfileServiceService } from 'src/app/service/questionservice/uploadfile-service.service';
import { Question } from 'src/app/model/question_model/question';
import { UserService } from 'src/app/service/login/user.service';
import { from, forkJoin } from 'rxjs';
import { MatDialog } from '@angular/material';
import { PopupComponent } from './popup/popup.component';
import { Title } from '@angular/platform-browser';
import { Constant } from 'src/app/common/constant';
import { CheckRolePermissionOrMenu } from 'src/app/common/checkRolePermissionOrMenu';
import { MenuFilterService } from 'src/app/service/menu_filter/menu-filter.service';
@Component({
  selector: 'app-listquestion',
  templateUrl: './listquestion.component.html',
  styleUrls: ['./listquestion.component.scss']
})
export class ListquestionComponent implements OnInit {
  urlDownloadFile = Constant.API_DOWNLOADFILE;
  idQuestion: any;
  file: any;
  perPage = 5;
  listNameCreater = [];
  mapNameCreater: Map<number, string>;
  listIdCreater: number[];
  fileExist: number;
  fileDowload: any;
  constructor(
    public uploadService: UploadfileServiceService,
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog,
    private titleService: Title,
    private checkRole: CheckRolePermissionOrMenu,
    private menuFilter: MenuFilterService
  ) {
  }
  @ViewChild('popupDelete') popupDelete: Popup;
  @ViewChild('myInput')
  myInputVariable: ElementRef;
  async ngOnInit() {
    this.mapNameCreater = new Map();
    this.titleService.setTitle('Testonline System - List question');
    let menuSuccess = await this.menuFilter.checkMenu();
    if (menuSuccess === 1) {
    this.uploadService.getAllQuestion();
    }
    this.userService.getUserList().subscribe(res => {
      res.map(x => {
        this.mapNameCreater.set(x['id'], x['fullname']);
      });
    });
    this.fileExist = 0;
  }

  getListQuestion2() {
    const dialogRef = this.dialog.open(PopupComponent);
    dialogRef.afterClosed().subscribe(result => {});
  }

  onDelete(id) {
    this.idQuestion = id;
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
    this.uploadService.deleteQuestion(this.idQuestion).subscribe(res => {
      this.uploadService.getAllQuestion();
    });
    this.popupDelete.hide();
  }
  onAdd() {
    this.router.navigate(['/cms/createquestion']);
  }
  onUpdate(i: any) {
    this.router.navigate(['/cms/updatequestion/' + i]);
  }
  dowloadFile() {
    this.uploadService.downloadFile().subscribe(responseHeader => {
      this.fileDowload = responseHeader;
    });
  }
  onAddExcel(event) {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      this.fileExist = 1;
    } else {
      this.fileExist = 0;
    }
  }
  reset() {
    this.myInputVariable.nativeElement.value = '';
  }
  onChangePage(event) {
    this.perPage = event.target.value;
  }
  clickMe() {
    this.uploadService.downloadFile().subscribe(res => {});
  }
  checkRolePermission(controllerAnAction): boolean {
    return this.checkRole.checkRole(controllerAnAction);
  }
  search(event) {
    const key = event.target.value.trim();
    if (key === '') {
      this.uploadService.getAllQuestion();
    } else {
      const body = {
        key: key
      };
      const formData = new FormData();
      formData.append('data', JSON.stringify(body));
      this.uploadService.search(formData);
    }
  }
}
