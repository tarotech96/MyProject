import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from 'src/app/service/group/group.service';
import { UserService } from 'src/app/service/login/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/model/user/users';
import { ExamService } from 'src/app/service/exam/exam.service';
import { Constant } from 'src/app/common/constant';
@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent implements OnInit {
  user: User;
  listExam: Object[] = [];
  listPractice: Object[] = [];
  idadmin: number;
  adminname = '';
  adminemail = '';
  adminStatus = '';
  adminID: number;
  adminPhone = '';
  adminAddress = '';
  img = '';
  middle = '';
  email = '';
  url = '';
  constructor(
    private jwt: JwtHelperService,
    private us: UserService,
    private group: GroupService,
    private router: Router,
    private examService: ExamService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const token = this.jwt.decodeToken(localStorage.getItem('access_token'));
    this.us.getUserbyEmail(token['username']).subscribe(res => {
      this.adminname = res.fullname;
      this.adminemail = res.email;
      this.idadmin = res.id;
      switch (res.status) {
        case 1:
          this.adminStatus = 'Tài khoản hoạt động ';
          break;
        case 0:
          this.adminStatus = 'Tài khoản đã bị chặn';
          break;
        case 2:
          this.adminStatus = 'Tài khoản không được phép truy cập';
          break;
      }
      this.adminID = res.id;
      this.adminAddress = res.address;
      this.adminPhone = res.phone;
      this.img = Constant.BASE_URL + '/resources/images/user/' + res.img;
      this.us
        .getlistExamOfUser(this.adminemail)
        .subscribe(resa => {
          this.listExam = resa;

        });
      this.examService
        .getListPracticeByUser(this.idadmin)
        .subscribe(resb => (this.listPractice = resb));
    });
  }
  // Xem ket qua bai da thi
  clickKetQua1() {
    // id1: Exam ID
    // id2: Exam_result ID
    const baithi = false;
    const thuchanh = true;
    this.router.navigate([
      '/hometotal/examhistory',
      { param1: baithi, param2: thuchanh }
    ]);
  }
  clickKetQua() {
    // id1: Exam ID
    // id2: Exam_result ID
    this.router.navigate(['/hometotal/examhistory']);
  }
}
