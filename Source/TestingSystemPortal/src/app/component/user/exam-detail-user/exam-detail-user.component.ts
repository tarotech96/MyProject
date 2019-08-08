import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from 'src/app/service/exam/exam.service';
import { Location } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Exam } from 'src/app/model/exam/exam';
import { SubjectService } from 'src/app/service/subject/subject.service';
import { subject } from 'src/app/model/subject/subject';
import { chapter } from 'src/app/model/chapter/chapter';
import { domain } from 'src/app/model/domain/domain';
import { ChapterService } from 'src/app/service/chapter/chapter.service';
import { DomainService } from 'src/app/service/domain/domain.service';
import { tap } from 'rxjs/operators';
import { UploadfileServiceService } from 'src/app/service/questionservice/uploadfile-service.service';
import { Question } from 'src/app/model/question_model/question';

@Component({
  selector: 'app-exam-detail-user',
  templateUrl: './exam-detail-user.component.html',
  styleUrls: ['./exam-detail-user.component.scss']
})
export class ExamDetailUserComponent implements OnInit {
  exam?: Object;
  subject: subject;
  chapters: chapter[];
  domains: domain[];
  examResultID: Number;
  idExam: number;
  notificationVisibilityWhenDelete = false;
  quaHan: any;
  quaLuot: any;
  setDomain = new Set();
  setChapter = new Set();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private examService: ExamService,
    private location: Location,
    private jwt: JwtHelperService,
    private questionService: UploadfileServiceService
  ) {}

  ngOnInit() {
    this.notificationVisibilityWhenDelete = false;
    this.route.params.forEach(urlParams => {
      this.idExam = urlParams['paramId'];
      this.quaHan = urlParams['paramQuahan'];
      this.quaLuot = urlParams['paramQualuot'];
    });
    // this.examService.getExamsByIDS(this.idExam).subscribe(res => {
    //   this.exam = res;
    // });
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
}
