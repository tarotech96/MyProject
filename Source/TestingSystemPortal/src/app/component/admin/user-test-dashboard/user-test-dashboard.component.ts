import { Component, OnInit } from '@angular/core';
import { Popup } from 'ng2-opd-popup';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamService } from 'src/app/service/exam/exam.service';
import { UserserviceService } from 'src/app/service/user-service/userservice.service';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/service/login/user.service';
import { Constant } from 'src/app/common/constant';
import { map } from 'rxjs/operators';
export interface Result {
  exam: Object;
  result: Object[];
}
export interface Resultp {
  practice: Object;
  resultp: Object[];
}
@Component({
  selector: 'app-user-test-dashboard',
  templateUrl: './user-test-dashboard.component.html',
  styleUrls: ['./user-test-dashboard.component.scss']
})
export class UserTestDashboardComponent implements OnInit {
  listExam: Object[] = [];
  email: string;
  userID: number;
  idExam: number;
  listId: number[];
  examResult: Object;
  listExamDone: Object[] = [];
  listPracticeDone: Object[] = [];
  listRequest = [];
  showTestTags = false;
  listResult: Result[] = [];
  listResultp: Resultp[] = [];
  examResultID: Number;
  baiThiStatus = true;
  thucHanhSatus = false;
  notificationVisibilityWhenDelete = false;
  notificationVisibilityWhenDelete1 = false;
  listExamResultByUserIDExamID: Object[] = [];
  photo: string;
  nowDate: number;
  constructor(
    private jwt: JwtHelperService,
    private router: Router,
    private examService: ExamService,
    public userserviceService: UserserviceService,
    private titleService: Title,
    private activeRoute: ActivatedRoute,
    public us: UserService
  ) {
    this.activeRoute.paramMap
      .pipe(
        map(params => {
          if (params.get('param1') === '') {
            this.baiThiStatus = true;
            this.thucHanhSatus = false;
          } else if (params.get('param1') === 'false') {
            this.xemBaiThucHanh(true);
          }
        })
      )
      .subscribe();
  }

  ngOnInit() {
    this.notificationVisibilityWhenDelete = false;
    this.notificationVisibilityWhenDelete1 = false;
    this.nowDate = +new Date();
    this.photo =
      Constant.BASE_URL +
      '/resources/images/slidebars/' +
      this.us.userLogin.img;
    // this.activeRoute.params.forEach(urlParams => {
    //   if (urlParams['param1'] === undefined) {
    //     this.baiThiStatus = true;
    //     this.thucHanhSatus = false;
    //   } else {
    //     this.xemBaiThucHanh(true);
    //   }
    // });
    this.titleService.setTitle('Testonline System - Exam history');
    // Get list exam user ASC by end_date
    this.userserviceService
      .getListExamOfUserASCBYEndDate(
        JSON.parse(localStorage.getItem('item')).id
      )
      .subscribe(res4 => {
        this.userserviceService.listExamASC = res4;
        this.userserviceService.sizeExamAssign = res4.length;
      });
    // Get list exam user done
    this.userserviceService
      .getlistExamUserCompleted(JSON.parse(localStorage.getItem('item')).id)
      .subscribe(res3 => {
        this.listExamDone = res3;
        this.listExamDone.forEach(element => {
          this.examService
            .getListExamResultByUserIDExamID(
              JSON.parse(localStorage.getItem('item')).id,
              element[0]
            )
            .subscribe(res2 => {
              const result: Result = {
                exam: null,
                result: []
              };
              result.exam = element;
              result.result = res2;
              this.listResult.push(result);
              this.listResult.sort(function(obj1, obj2) {
                return obj2.exam[0] - obj1.exam[0];
              });
            });
        });
      });
    // Get list PRACTICE done
    this.userserviceService
      .getlistPracticeUserCompleted(JSON.parse(localStorage.getItem('item')).id)
      .subscribe(res8 => {
        this.listPracticeDone = res8;
        this.listPracticeDone.forEach(element1 => {
          this.examService
            .getListPracticeResultByUserIDPracticeID(
              JSON.parse(localStorage.getItem('item')).id,
              element1[0]
            )
            .subscribe(res9 => {
              const resultp: Resultp = {
                practice: null,
                resultp: []
              };
              resultp.practice = element1;
              resultp.resultp = res9;
              this.listResultp.push(resultp);
              this.listResultp.sort(function(obj1, obj2) {
                return obj2.practice[0] - obj1.practice[0];
              });
            });
        });
      });
  }
  // Xem ket qua bai da thi
  // id1: Exam ID
  // id2: Exam_result ID
  ClickButton(id1, id2) {
    this.router.navigate([
      '/hometotal/testresult',
      { param1: id1, param2: id2, paramLocation: 'cms' }
    ]);
  }
  // Xem chi tiet bai thi duoc assigned
  clickXemChiTiet(id: number, quahan: boolean) {
    this.router.navigate([
      '/hometotal/examdetail',
      {
        paramId: id,
        paramQuahan: quahan,
        paramQualuot: false
      }
    ]);
  }
  // Xử lý sự kiến click vào thi POP UP xuất hiện để confirm
  clickVaoThi(id: number) {
    this.idExam = id;
    this.notificationVisibilityWhenDelete = true;
  }
  // Click vào thi
  clickVaoThiP(id) {
    this.idExam = id;
    this.notificationVisibilityWhenDelete1 = true;
  }
  // Xử lý sự kiến click vào YES trong POP UP thì bắt đầu vào thi
  oncg(event: boolean) {
    if (event) {
      const token = this.jwt.decodeToken(localStorage.getItem('access_token'));
      const examResult = {
        email: token['username'],
        exam_id: this.idExam
      };
      const formData = new FormData();
      formData.append('examResult', JSON.stringify(examResult));
      this.examService.getStartExam(formData).subscribe(
        res => {
          this.examResultID = res;
          this.router.navigate([
            '/hometotal/testprocess',
            { param1: this.idExam, param2: this.examResultID }
          ]);
        },
        error => {

        }
      );
    } else {
      this.notificationVisibilityWhenDelete = false;
    }
  }
  // Xử lý sự kiến click vào YES trong POP UP thì bắt đầu vào thi
  oncg1(event: boolean) {
    if (event) {
      const token = this.jwt.decodeToken(localStorage.getItem('access_token'));
      const examResult = {
        email: token['username'],
        exam_id: this.idExam
      };
      const formData = new FormData();
      formData.append('examResult', JSON.stringify(examResult));
      this.examService.getStartExam(formData).subscribe(
        res => {
          this.examResultID = res;
          this.router.navigate([
            '/hometotal/testpractice',
            { param1: this.idExam, param2: this.examResultID }
          ]);
        },
        error => {

        }
      );
    } else {
      this.notificationVisibilityWhenDelete1 = false;
    }
  }

  // Xem bài thi
  xemBaiThi(e) {
    this.baiThiStatus = e;
    this.thucHanhSatus = !e;
  }

  // Xem bài thực hành
  xemBaiThucHanh(e) {
    this.thucHanhSatus = e;
    this.baiThiStatus = !e;
  }
  hamCheckQuaHan(param: any) {
    const da = new Date(param).getTime();
    if (da < new Date().getTime()) {
      return true;
    } else {
      return false;
    }
  }
}
