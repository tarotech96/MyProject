import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { concatMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Popup } from 'ng2-opd-popup';
import { ExamService } from 'src/app/service/exam/exam.service';
import { SubjectService } from 'src/app/service/subject/subject.service';
import { subject } from 'src/app/model/subject/subject';
import { UserService } from 'src/app/service/login/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Group } from 'src/app/model/group/group';
import { User } from 'src/app/model/user/users';
import { GroupService } from 'src/app/service/group/group.service';
import { DatePipe } from '@angular/common';
import { Exam } from 'src/app/model/exam/exam';
import { log } from 'util';
import { Title } from '@angular/platform-browser';
import { CheckRolePermissionOrMenu } from 'src/app/common/checkRolePermissionOrMenu';
import { UserserviceService } from 'src/app/service/user-service/userservice.service';
import { Constant } from 'src/app/common/constant';
import { UploadfileServiceService } from 'src/app/service/questionservice/uploadfile-service.service';
import { iif, of } from 'rxjs';
import { MenuFilterService } from 'src/app/service/menu_filter/menu-filter.service';

function checkDate(c: AbstractControl): ValidationErrors | null {
  const value = c.value;
  const start_date = new Date(value.start_date).getTime();
  const end_date = new Date(value.end_date).getTime();
  const now = new Date().getTime();
  if (start_date > 0 && end_date > 0) {
    return end_date >= start_date
      ? null
      : {
          twodatenotmatch: true
        };
  }
}
function validatorDate(c: AbstractControl): ValidationErrors | null {
  const value = c.value;
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();
  const today = year + '-' + month + '-' + day;
  if (new Date(value).getFullYear() < 1970) {
    return {
      datenotsatisfy: true
    };
  }
  const date = new Date(value).getTime();
  const now = new Date(today).getTime();
  return date >= now
    ? null
    : {
        datenotsatisfy: true
      };
}

function validatorEmptyInput(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { whitespace: true };
}
@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {
  data = {
    group_id: [] = [],
    user_id: [] = [],
    group_id_before: [] = [],
    user_id_before: [] = []
  };
  updateInvite = {
    groupDelete: '',
    groupInsert: '',
    userDelete: '',
    userInsert: ''
  };
  totalQuestion: number;
  config: any;
  file: any;
  listExam: Object[] = [];
  listSubject: subject[] = [];
  listGroup: Group[] = [];
  listUser: User[] = [];
  listItem: any[] = [];
  insertForm: FormGroup;
  updateForm: FormGroup;
  showTable: Boolean = true;
  showInsertForm: Boolean = false;
  showUpdateForm: Boolean = false;
  perPage: number;
  start_date: string;
  end_date: string;
  deleteID: number;
  showMedia: boolean;
  error: string;
  imageSrc: any;
  imageBefore: string;
  selectedUserId = '';
  selectedGroupId = '';
  selectedGroup: Group[] = [];
  selectedUser: User[] = [];
  dropdownSettingGroup = {};
  dropdownSettingUser = {};
  statusID: number;
  selectedAction: string;
  selectedStatusAction: string;
  selectedType = '^0$|^1$';
  baseURL = '';
  isShow: boolean;
  showNoti: boolean;
  mapType = new Map();
  searchKey = '';
  sumUserTest: number;
  constructor(
    private fb: FormBuilder,
    private examService: ExamService,
    private subjectService: SubjectService,
    private router: Router,
    private jwt: JwtHelperService,
    private userService: UserService,
    private groupService: GroupService,
    private datepipe: DatePipe,
    private titleService: Title,
    private checkRole: CheckRolePermissionOrMenu,
    private userserviceService: UserserviceService,
    private us: UserService,
    private questionService: UploadfileServiceService,
    private menuFilter: MenuFilterService
  ) {}
  @ViewChild('popupDelete') popupDelete: Popup;
  @ViewChild('popupError') popupError: Popup;
  async ngOnInit() {
    this.searchKey = '';
    this.mapType.set(0, 'Exam');
    this.mapType.set(1, 'Practice');
    this.totalQuestion = 0;
    this.isShow = true;
    this.baseURL = Constant.BASE_URL;
    this.statusID = 0;
    this.selectedAction = 'action';
    this.showNoti = false;
    this.config = {
      currentPage: 1,
      itemsPerPage: 5
    };
    this.titleService.setTitle('Testonline System - Exam');
    this.insertForm = this.fb.group({
      title: [
        '',
        [Validators.required, Validators.maxLength(255), validatorEmptyInput]
      ],
      name: [
        '',
        [Validators.required, Validators.maxLength(50), validatorEmptyInput]
      ],
      code: [''],
      description: [
        '',
        [Validators.required, Validators.maxLength(500), validatorEmptyInput]
      ],
      media: ['', [Validators.pattern(/.mp3+$/)]],
      date: this.fb.group(
        {
          start_date: ['', [Validators.required, validatorDate]],
          end_date: ['', [Validators.required, validatorDate]]
        },
        {
          validator: [checkDate]
        }
      ),
      question_num: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      time: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      max_attempt: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      percent_passing: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      subject: [''],
      group_id: [''],
      user_id: [''],
      creator: ['']
    });
    this.updateForm = this.fb.group({
      id: [''],
      title: [
        '',
        [Validators.required, Validators.maxLength(255), validatorEmptyInput]
      ],
      name: [
        '',
        [Validators.required, Validators.maxLength(50), validatorEmptyInput]
      ],
      code: ['', [Validators.required]],
      description: [
        '',
        [Validators.required, Validators.maxLength(500), validatorEmptyInput]
      ],
      media: ['', [Validators.pattern(/.mp3+$/)]],
      date: this.fb.group(
        {
          start_date: ['', [Validators.required]],
          end_date: ['', [Validators.required]]
        },
        {
          validator: [checkDate]
        }
      ),
      question_num: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d+$/),
          ,
          (control: AbstractControl) =>
            Validators.min(this.totalQuestion)(control)
        ]
      ],
      time: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      max_attempt: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      percent_passing: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      subject: [''],
      group_id: [''],
      user_id: [''],
      creator: ['']
    });
    const menuSuccess = await this.menuFilter.checkMenu();
    if (menuSuccess === 1) {
      this.examService
        .getListExam(this.searchKey, this.selectedType)
        .subscribe(res => {
          this.listExam = res;
        });
      this.subjectService
        .getListSubject()
        .subscribe(res => (this.listSubject = res));
      this.groupService.getListGroup().subscribe(res => (this.listGroup = res));
      this.userService.getUserList().subscribe(res => (this.listUser = res));
      this.dropdownSettingGroup = {
        singleSelection: false,
        idField: 'id',
        textField: 'name',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        searchPlaceholderText: 'Search',
        itemsShowLimit: 3,
        allowSearchFilter: true
      };
      this.dropdownSettingUser = {
        singleSelection: false,
        idField: 'id',
        textField: 'email',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        searchPlaceholderText: 'Search',
        allowSearchFilter: true
      };
    }
  }
  onClickDelete() {
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
    const data = {
      exam_id: this.deleteID,
      status: 2
    };
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    this.examService
      .updateStatusExam(formData)
      .pipe(
        concatMap(_ =>
          this.examService.getListExam(this.searchKey, this.selectedType)
        )
      )
      .subscribe(
        res => {
          this.listExam = res;
        },
        err => {
          this.router.navigate(['/error']);
        }
      );
    this.popupDelete.hide();
  }
  onClickAddNew() {
    this.insertForm.reset();
    this.error = '';
    this.showMedia = true;
    this.selectedGroup = [];
    this.selectedUser = [];
    this.showTable = false;
    this.showInsertForm = true;
    this.showUpdateForm = false;
  }
  sort() {}
  async onClickUpdate(ex: object) {
    this.updateForm.reset();
    this.error = '';
    this.data.user_id_before = [];
    this.data.group_id_before = [];
    this.data.group_id = [];
    this.data.user_id = [];
    this.updateForm.get('id').setValue(ex['0']);
    this.updateForm.get('name').setValue(ex['1']);
    this.updateForm.get('subject').setValue(ex['2']);
    this.start_date = this.datepipe.transform(ex['3'], 'yyyy-MM-dd');
    this.end_date = this.datepipe.transform(ex['4'], 'yyyy-MM-dd');
    this.updateForm.get('date.start_date').setValue(this.start_date);
    this.updateForm.get('date.end_date').setValue(this.end_date);
    this.updateForm.get('question_num').setValue(ex['5']);
    this.totalQuestion = ex['5'];
    this.updateForm.get('percent_passing').setValue(ex['6']);
    this.updateForm.get('max_attempt').setValue(ex['7']);
    this.updateForm.get('code').setValue(ex['9']);
    this.updateForm.get('time').setValue(ex['10']);
    this.updateForm.get('description').setValue(ex['11']);
    this.updateForm.get('user_id').setValue('');
    this.updateForm.get('group_id').setValue('');
    this.updateForm.get('title').setValue(ex['12']);
    this.updateForm.get('media').setValue('');
    this.imageBefore = ex['13'];
     this.examService.sumUserTestExam(ex['0']).subscribe(res => {
       this.sumUserTest = res;
       if (res > 0) {
       this.error = 'Exam đã được thi bạn không thể thay đổi số lượng câu hỏi!!';
       this.showNoti = true;
       setTimeout(() => {
         this.showNoti = false;
         this.error = '';
       }, 3000);
      }
     });
    this.examService.getListUserExam(ex['0']).subscribe(res => {
      this.selectedUser = res;
      // tslint:disable-next-line:no-shadowed-variable
      if (this.selectedUser.length > 0) {
        this.selectedUser.forEach(element => {
          this.data.user_id_before.push(element.id);
        });
      }
    });
    this.examService.getListGroupExam(ex['0']).subscribe(res => {
      this.selectedGroup = res;
      // tslint:disable-next-line:no-shadowed-variable
      if (this.selectedGroup.length > 0) {
        this.selectedGroup.forEach(element => {
          this.data.group_id_before.push(element.id);
        });
      }
    });
    this.showMedia = true;
    this.showUpdateForm = true;
    this.showTable = false;
    this.showInsertForm = false;
    this.selectedAction = 'action';
  }
  onClickCloseForm() {
    this.showTable = true;
    this.showInsertForm = false;
    this.showUpdateForm = false;
    this.selectedAction = 'action';
    this.statusID = 0;
    this.error = '';
  }
  onSubmitInsert() {
    const token = this.jwt.decodeToken(localStorage.getItem('access_token'));
    this.insertForm.get('creator').setValue(token['username']);
    // tslint:disable-next-line:prefer-const
    let tem_group = '';
    let tem_user = '';
    // tslint:disable-next-line:no-shadowed-variable
    if (this.selectedGroup.length > 0) {
      this.selectedGroup.forEach(function(gr: Group) {
        tem_group += gr.id.toString() + ',';
      });
    }
    if (this.selectedUser.length > 0) {
      this.selectedUser.forEach(element => {
        tem_user += element.id + ',';
      });
    }
    const { valid, value } = this.insertForm;
    const start_date = new Date(value.date.start_date).getTime();
    const end_date = new Date(value.date.end_date).getTime();
    if (valid) {
      const data = value;
      data.group_id = tem_group;
      data.user_id = tem_user;
      let subjectSplt = '';
      subjectSplt = data.subject;
      // tslint:disable-next-line:prefer-const
      let listSubjectSpl = subjectSplt.split(' ');
      // tslint:disable-next-line:prefer-const
      let listcode = listSubjectSpl.map(x => x[0]);
      // tslint:disable-next-line:prefer-const
      let code =
        listcode.reduce((a, b) => a + b, '') +
        Math.round(Math.random() * 1000000) +
        ' ';
      data.code = code;
      const formData = new FormData();
      formData.append('file', this.file);
      formData.append('exam', JSON.stringify(data));
      this.examService
        .createExam(formData)
        // .pipe(
        //   concatMap(_ =>
        //     this.examService.getListExam(this.searchKey, this.selectedType)
        //   )
        // )
        .subscribe(
          res => {
            // this.showInsertForm = false;
            // this.showTable = true;
            // this.error = '';
            // this.selectedAction = 'action';
            // MR DUC thêm ngày 7/1/2019 *** START
            this.userserviceService
              .getListExamOfUserASCBYEndDate(this.us.userLogin.id)
              .subscribe(resd => {
                this.userserviceService.sizeExamAssign = resd.length;
              });
              this.router.navigate(['/cms/examdetail/', { p1: res[0], p2: res[1] }]);
            // MR DUC thêm ngày 7/1/2019 *** END
            // this.pageChange(1);
            // alert('Thêm bài thi thành công vui lòng chọn OKe');
            // window.scrollBy(0, 0);
          },
          err => {
            this.error = err.error.message;
          }
        );
    }
    if (this.insertForm.invalid) {
      return;
    }
  }
  ///
  onSubmitUpdate() {
    const { valid, value } = this.updateForm;
    if (valid) {
      const data = value;
      if (this.selectedGroup.length > 0) {
        this.selectedGroup.forEach(element => {
          this.data.group_id.push(element.id);
        });
      }
      if (this.selectedUser.length > 0) {
        this.selectedUser.forEach(element => {
          this.data.user_id.push(element.id);
        });
      }
      this.updateInvite.userDelete = this.data.user_id_before
        .filter(item => this.data.user_id.indexOf(item) < 0)
        .toString();
      this.updateInvite.userInsert = this.data.user_id
        .filter(item => this.data.user_id_before.indexOf(item) < 0)
        .toString();
      this.updateInvite.groupDelete = this.data.group_id_before
        .filter(item => this.data.group_id.indexOf(item) < 0)
        .toString();
      this.updateInvite.groupInsert = this.data.group_id
        .filter(item => this.data.group_id_before.indexOf(item) < 0)
        .toString();
      const formData = new FormData();
      formData.append('file', this.file);
      formData.append('exam', JSON.stringify(data));
      formData.append('invite', JSON.stringify(this.updateInvite));
      if (this.showMedia === true) {
        this.examService
          .updateExam(formData)
          .pipe(
            concatMap(_ =>
              this.examService.getListExam(this.searchKey, this.selectedType)
            )
          )
          .subscribe(
            res => {
              this.listExam = res;
              this.showUpdateForm = false;
              this.showTable = true;
              this.error = '';
              // MR DUC thêm ngày 7/1/2019 *** START
              this.userserviceService
                .getListExamOfUserASCBYEndDate(this.us.userLogin.id)
                .subscribe(resd => {
                  this.userserviceService.sizeExamAssign = resd.length;
                });
              // MR DUC thêm ngày 7/1/2019 *** END
              window.scrollBy(0, 0);
            },
            err => {
              this.error = err.error.message;
            }
          );
      } else {
        this.examService
          .updateFileExam(formData)
          .pipe(
            concatMap(_ =>
              this.examService.getListExam(this.searchKey, this.selectedType)
            )
          )
          .subscribe(
            res => {
              this.listExam = res;
              this.showUpdateForm = false;
              this.showTable = true;
              this.error = '';
              window.scrollBy(0, 0);
            },
            err => {
              this.error = err.error.message;
            }
          );
      }
    }
  }
  // filterByTitle(event) {
  //   this.keySearch = event.target.value;
  // }
  trackByFn(index, item) {
    return item.id;
  }
  onChange(event) {
    this.config.itemsPerPage = event.target.value;
  }
  checkRolePermission(controllerAnAction): boolean {
    return this.checkRole.checkRole(controllerAnAction);
  }
  onChangeFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.showMedia = false;
      this.file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => (this.imageSrc = reader.result);
      reader.readAsDataURL(this.file);
    } else {
      this.imageSrc = '';
    }
  }

  onChangeAction(event, exam: Exam) {
    window.scroll(0, 0);
    this.selectedAction = '1';
    const type = event.target.value;
    if (type === 'edit_detail') {
      this.router.navigate(['/cms/examdetail/', { p1: exam[0], p2: exam[17] }]);
    } else if (type === 'view') {
      this.router.navigate(['/cms/examdetailadmin/' + exam[0]]);
    } else if (type === 'change_status') {
      this.questionService.getQuestionOfExam(exam[0]).subscribe(res => {
        if (res.length !== 0) {
          this.statusID = exam['0'];
          this.selectedStatusAction = '4';
        } else {
          this.statusID = 0;
          this.error = 'Exam chưa có câu hỏi, bạn cần thêm câu hỏi trước';
          this.showNoti = true;
          setTimeout(() => {
            this.showNoti = false;
          }, 3000);
        }
      });
    } else if (type === 'edit') {
      this.onClickUpdate(exam);
    }
  }
  onItemSelect(item: any) {}
  onSelectAll(items: any) {}
  showError() {
    this.popupError.options = {
      header: 'Lỗi',
      color: '#C82333',
      showButtons: false,
      widthProsentage: 30,
      animation: 'bounceIn'
    };
    this.popupError.show(this.popupError.options);
    setTimeout(() => this.popupError.hide(), 1000);
  }
  pageChange(newPage: number) {
    this.config.currentPage = newPage;
  }
  onChangeStatus(event, id: number) {
    const data = {
      exam_id: id,
      status: event.target.value
    };
    const body = {
      key: this.searchKey.trim(),
      type: 'search'
    };
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    this.examService
      .updateStatusExam(formData)
      .pipe(
        // tap(() => {
        //   formData = new FormData();
        //   formData.append('data', JSON.stringify(body));
        // }),
        concatMap(_ =>
          // iif(
          //   () => this.searchKey.trim() === '',
          //   this.examService.getListExam(this.searchKey, this.selectedType),
            this.examService.getListExam(this.searchKey, this.selectedType)
          // )
        )
      )
      .subscribe(
        res => {
          this.listExam = res;
          // MR DUC thêm ngày 7/1/2019 *** START
          this.userserviceService
            .getListExamOfUserASCBYEndDate(this.us.userLogin.id)
            .subscribe(resd => {
              this.userserviceService.sizeExamAssign = resd.length;
            });
          // MR DUC thêm ngày 7/1/2019 *** END
        },
        err => {
          this.router.navigate(['/error']);
        }
      );
    this.statusID = 0;
    this.selectedAction = 'action';
  }
  search(event) {
    this.searchKey = event.target.value;
    const body = {
      key: event.target.value.trim(),
      type: 'search'
    };
    if (body.key === '') {
      this.examService
        .getListExam(this.searchKey, this.selectedType)
        .subscribe(res => (this.listExam = res));
    } else {
      const formData = new FormData();
      formData.append('data', JSON.stringify(body));
      this.examService
        .getListExam(this.searchKey, this.selectedType)
        .subscribe(res => (this.listExam = res));
    }
  }
  focusOutFunction() {
    this.selectedAction = 'action';
  }
  filterByType(event) {
    this.selectedType = event.target.value;
    this.examService
      .getListExam(this.searchKey, this.selectedType)
      .subscribe(res => (this.listExam = res));
  }
}
