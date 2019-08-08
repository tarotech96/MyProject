import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from 'src/app/service/exam/exam.service';
import { Location } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'src/app/service/login/user.service';
import { subject } from 'src/app/model/subject/subject';
import { SubjectService } from 'src/app/service/subject/subject.service';
import { tap, map } from 'rxjs/operators';
import { ChapterService } from 'src/app/service/chapter/chapter.service';
import { chapter } from 'src/app/model/chapter/chapter';
import { DomainService } from 'src/app/service/domain/domain.service';
import { domain } from 'src/app/model/domain/domain';
import { UploadfileServiceService } from 'src/app/service/questionservice/uploadfile-service.service';
import { Question } from 'src/app/model/question_model/question';

@Component({
  selector: 'app-practice-detail',
  templateUrl: './practice-detail.component.html',
  styleUrls: ['./practice-detail.component.scss']
})
export class PracticeDetailComponent implements OnInit {
  exam?: Object;
  subject: subject;
  chapters: chapter[];
  domains: domain[];
  examResultID: Number;
  idExam: number;
  quaLuot: any;
  max_attemp: number;
  temp: number;
  notificationVisibilityWhenVaoThi = false;
  notificationVisibilityWhenMaxAttemptExcess = false;
  setDomain = new Set();
  setChapter = new Set();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private examService: ExamService,
    private location: Location,
    private jwt: JwtHelperService,
    private us: UserService,
    private questionService: UploadfileServiceService
  ) {}

  ngOnInit() {
    this.notificationVisibilityWhenVaoThi = false;
    this.route.params.forEach(urlParams => {
      this.idExam = urlParams['paramId'];
      this.quaLuot = urlParams['paramQualuot'];
    });
    this.examService
      .getExamsByIDS(this.idExam)
      .pipe(
        tap(ress => {
          this.questionService.getQuestionOfExam(ress[0]).subscribe(listQ => {
            listQ.forEach(element => {
              this.setChapter.add(element['chapter']['name']);
              this.setDomain.add(element['domain']['name']);
            });
            this.chapters = Array.from(this.setChapter).sort();
            this.domains = Array.from(this.setDomain).sort();
          });
        })
      )
      .subscribe(res => (this.exam = res));
  }
  onBack() {
    this.location.back();
  }
  // Xử lý sự kiến click vào thi POP UP xuất hiện để confirm
  clickVaoThi(id: number) {
    this.idExam = id;
    if (localStorage.getItem('access_token') === null) {
      this.notificationVisibilityWhenVaoThi = true;
    } else {
      this.checkNumberofResult();
    }
  }

  oncgNotLogin() {
    this.notificationVisibilityWhenMaxAttemptExcess = false;
  }
  // Xử lý sự kiến click vào YES trong POP UP thì bắt đầu vào thi
  oncg(event: boolean) {
    if (event) {
      const token = this.jwt.decodeToken(localStorage.getItem('access_token'));
      if (token != null) {
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
        this.router.navigate([
          '/hometotal/testfreedom',
          { param1: this.idExam }
        ]);
      }
    } else {
      this.notificationVisibilityWhenVaoThi = false;
    }
  }

  // Ham check user login đã làm quá số lượt chưa?
  checkNumberofResult() {
    let temp = 0;
    let max_attemp = 0;
    this.examService
      .getListPracticeResultByUserIDPracticeID(
        this.us.userLogin.id,
        this.idExam
      )
      .subscribe(res => {
        temp = res.length;
        if (res.length !== 0) {
          max_attemp = res[0]['exam']['max_attempt'];
        }
        if (temp === 0) {
          this.notificationVisibilityWhenVaoThi = true;
        } else if (temp < max_attemp) {
          this.notificationVisibilityWhenVaoThi = true;
        } else if (temp === max_attemp) {
          this.notificationVisibilityWhenMaxAttemptExcess = true;
        } else if (temp > max_attemp) {
          this.notificationVisibilityWhenMaxAttemptExcess = true;
        }
      });
  }
}
