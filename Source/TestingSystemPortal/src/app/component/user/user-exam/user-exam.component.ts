import { Component, OnInit } from '@angular/core';
import { ExamService } from 'src/app/service/exam/exam.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'src/app/service/login/user.service';
import { UserserviceService } from 'src/app/service/user-service/userservice.service';
import { Title } from '@angular/platform-browser';
import { tap } from 'rxjs/operators';

export interface Result {
  exam: Object;
  result: Object[];
}
@Component({
  selector: 'app-user-exam',
  templateUrl: './user-exam.component.html',
  styleUrls: ['./user-exam.component.scss']
})
export class UserExamComponent implements OnInit {
  // listExam: Object[] = [];
  perPage: number;
  idExam: number;
  examResultID: Number;
  email: string;
  tenBaiThi: string;
  chuDeBaiThi: string;
  userID: number;
  listResult: Result[] = [];
  notificationVisibilityWhenDelete = false;
  nowDate: number;
  searchBoolean = true;
  constructor(
    private examService: ExamService,
    private router: Router,
    private jwt: JwtHelperService,
    private userService: UserService,
    private userserviceService: UserserviceService,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.nowDate = +new Date();
    this.notificationVisibilityWhenDelete = false;
    this.titleService.setTitle('Testonline System - User exam');
    // Phan trang
    this.perPage = 10;

    // Get list exam cua User va tinh so lan da thi
    this.userserviceService
      .getlistExamOfUser(this.userService.userLogin.email)
      .pipe(
        tap(exams => {
          exams.forEach(element => {
            this.examService
              .getListExamResultByUserIDExamID(
                this.userService.userLogin.id,
                element[0]
              )
              .subscribe(response => {
                const result: Result = {
                  exam: null,
                  result: []
                };
                result.exam = element;
                result.result = response;
                this.listResult.push(result);
                this.listResult.sort(function(obj1, obj2) {
                  return obj1[0] - obj2[0];
                });
              });
          });
        })
      )
      .subscribe(exams => {
        // this.listExam = exams;
      });
  }
  // Chuyen sang history
  clickLichSu() {
    this.router.navigate(['/hometotal/examhistory']);
  }
  // Xem chi tiet Exam
  clickXemChiTiet(id: number, quahan: boolean, qualuot: boolean) {
    this.router.navigate([
      '/hometotal/examdetail',
      {
        paramId: id,
        paramQuahan: quahan,
        paramQualuot: qualuot
      }
    ]);
  }
  // Xem ket qua Exam
  clickKetQua(id) {
    this.router.navigate([
      'hometotal/testresult',
      { param1: this.idExam, param2: this.examResultID }
    ]);
  }
  // Xử lý sự kiến click vào thi POP UP xuất hiện để confirm
  clickVaoThi(id: number, ten: string, chude: string) {
    this.idExam = id;
    this.tenBaiThi = ten;
    this.chuDeBaiThi = chude;
    this.notificationVisibilityWhenDelete = true;
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
            {
              param1: this.idExam,
              param2: this.examResultID,
              param3: this.tenBaiThi,
              param4: this.chuDeBaiThi
            }
          ]);
        },
        error => {

        }
      );
    } else {
      this.notificationVisibilityWhenDelete = false;
    }
  }
  // Phan trang
  trackByFn(index, item) {
    return item.id;
  }
  onChange(event) {
    this.perPage = event.target.value;
  }
  hamCheckQuaHan(param: any) {
    const da = new Date(param).getTime();
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    const today = year + '-' + month + '-' + day;
    const now = new Date(today).getTime();

    if (da >= now) {
      return false;
    } else {
      return true;
    }
  }
  sapXep(param) {
    if (param === 0) {
      this.searchBoolean = !this.searchBoolean;
      if (this.searchBoolean) {
        this.listResult.sort((obj1, obj2) =>
          obj1.exam[1].localeCompare(obj2.exam[1])
        );
      } else {
        this.listResult.sort((obj1, obj2) =>
          obj2.exam[1].localeCompare(obj1.exam[1])
        );
      }
    } else if (param === 1) {
      this.searchBoolean = !this.searchBoolean;
      if (this.searchBoolean) {
        this.listResult.sort((obj1, obj2) =>
          obj1.exam[2].localeCompare(obj2.exam[2])
        );
      } else {
        this.listResult.sort((obj1, obj2) =>
          obj2.exam[2].localeCompare(obj1.exam[2])
        );
      }
    }
  }
}
