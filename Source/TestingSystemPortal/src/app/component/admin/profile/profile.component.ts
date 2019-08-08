import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user/users';
import { UserService } from 'src/app/service/login/user.service';
import { GroupService } from 'src/app/service/group/group.service';
import { Group } from 'src/app/model/group/group';
import { ExamService } from 'src/app/service/exam/exam.service';
import { CheckRolePermissionOrMenu } from 'src/app/common/checkRolePermissionOrMenu';
import { Constant } from 'src/app/common/constant';
 // Lâm update at 14-02-2019
 import { SubjectService } from 'src/app/service/subject/subject.service';
import { UserserviceService } from 'src/app/service/user-service/userservice.service';
import { tap } from 'rxjs/operators';
export interface Result {
  exam: Object;
  result: Object[];
}
export interface Result1 {
  exam1: Object;
  result1: Object[];
}
///
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;
  listExam: Object[] = [];
  listPractice: Object[] = [];
  listResult: Result[] = [];
  mapNameSubject: Map<number, string>;
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
  rolepermission: string;
  checkrolepermission: boolean;
  roleArray: string[] = [];
  rolepermissionArray: string[] = [];
  listGroup: Group[] = [];
  role: boolean;
  auth: string;
  baseURL = '';
  constructor(
    private jwt: JwtHelperService,
    private us: UserService,
    private group: GroupService,
    private router: Router,
    private examService: ExamService,
    private subjectService: SubjectService,
    private activeRoute: ActivatedRoute,
    private checkRole: CheckRolePermissionOrMenu,
    private userserviceService: UserserviceService
  ) {
  }

  ngOnInit() {
    this.baseURL = Constant.BASE_URL;
    this.url = window.location.href;
    // const getParam = new URL(this.url);
    this.email = this.activeRoute.snapshot.params['email'];
    if (this.email == null) {
      this.a();
    }
    if (this.email != null) {
      this.b();
    }
    this.group.getListGroup().subscribe(res => (this.listGroup = res));
  }
  clickXemChiTiet(id) {
    this.router.navigate(['/hometotal/examdetail', id]);
  }

  editprofile() {
    if (this.us.role === false) {
      this.router.navigate(['/hometotal/edit-profile']);
    } else if (this.us.role === true) {
      this.router.navigate(['/cms/edit-profile']);
    }
  }
  changepass() {
    if (this.us.role === false) {
      this.router.navigate(['/hometotal/changepassword']);
    } else if (this.us.role === true) {
      this.router.navigate(['/cms/changepassword']);
    }
  }
  a() {
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

  b() {
    this.mapNameSubject = new Map();
    this.subjectService.getListSubject().subscribe(res => {
      res.map(x => {
        this.mapNameSubject.set(x['id'], x['name']);
      });
    });
    this.us.getUserbyEmail(this.email).subscribe(res => {
      this.adminname = res.fullname;
      this.adminemail = res.email;
      this.idadmin = res.id;
      switch (res.status) {
        case 1:
          this.adminStatus = 'Tài khoản hoạt động ';
          break;
        case 2:
          this.adminStatus = 'Tài khoản đã bị chặn';
          break;
        case 0:
          this.adminStatus = 'Tài khoản không được phép truy cập';
          break;
      }
      this.adminID = res.id;
      this.adminAddress = res.address;
      this.adminPhone = res.phone;
      this.img = Constant.BASE_URL + '/resources/images/user/' + res.img;
       // Lâm update at 14-02-2019
      this.us
      .getlistExamOfUser(this.adminemail)
      .pipe(
        tap(exams => {
          exams.forEach(element => {
            this.examService
              .getListExamResultByUserIDExamID(
                this.idadmin,
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
      this.userserviceService
      .getlistPracticeOfUser(this.adminemail)
      .pipe(
        tap(exams => {
          exams.forEach(element => {
            this.examService
              .getListExamResultByUserIDExamID(
                this.idadmin,
                element[0]
              )
              .subscribe(response => {
                const result1: Result1 = {
                  exam1: null,
                  result1: []
                };
                result1.exam1 = element;
                result1.result1 = response;
                this.listPractice.push(result1);
                this.listPractice.sort(function(obj1, obj2) {
                  return obj1[0] - obj2[0];
                });
              });
          });
        })
      )
      .subscribe(exams => {
        // this.listExam = exams;
      });
    });
     // Lâm update at 14-02-2019
  }
  // check role
  checkRolePermission(controllerAnAction): boolean {
    return this.checkRole.checkRole(controllerAnAction);
  }
}
