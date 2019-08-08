import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserserviceService } from 'src/app/service/user-service/userservice.service';
import { ExamService } from 'src/app/service/exam/exam.service';
import { Exam } from 'src/app/model/exam/exam';
import { forkJoin } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-exam-detail-admin',
  templateUrl: './exam-detail-admin.component.html',
  styleUrls: ['./exam-detail-admin.component.scss']
})
export class ExamDetailAdminComponent implements OnInit {
  exam: Exam;
  listexamResult: Object[];
  listUser: Object[];
  listUserId: Number[];
  listIdUserComplete = [];
  numberUserCompleted: number;
  numberUserInCompleted: number;
  listUserComplete: Object[];
  listUserInComplete: Object[];
  sumUser: number;
  data: any;
  constructor(
    private activeRoute: ActivatedRoute,
    private examService: ExamService,
    private router: Router,
    private userService: UserserviceService
  ) {}

  ngOnInit() {
    this.data = this.activeRoute.snapshot.params['idExam'];
    this.examService
      .getExamById(this.data)
      .pipe(
        tap(output => {
          this.exam = output;
        }),
        switchMap(output1 => this.examService.getListUserExam(this.exam['id'])),
        tap(output3 => {
          this.listUserId = output3.map(x => x['id']);
        }),
        switchMap(out1 =>
          this.userService.getListUserComplete(this.listUserId, this.exam['id'])
        ),
        tap(res1 => {
          const result = [];
          let tep = [];
          tep = res1;
          res1 = res1.map(x => x['users']['id']);
          res1 = res1.filter(function(item, pos) {
            if (res1.indexOf(item) === pos) {
              result.push(tep[pos]);
            }
            return res1.indexOf(item) === pos;
          });
          this.listIdUserComplete = res1;
          this.listUserComplete = tep;
          this.numberUserCompleted = res1.length;
        }),
        switchMap(out2 =>
          this.userService.getListUserInComplete(
            this.listIdUserComplete,
            this.listUserId
          )
        ),
        tap(res2 => {
          this.listUserInComplete = res2;
          this.numberUserInCompleted = res2.length;
        })
      )
      .subscribe(data => {});
    this.examService.getListExamResult(this.data).subscribe(res3 => {
      res3 = res3.map(x => x['users']['id']);
      res3 = res3.filter(function(item, pos) {
        return res3.indexOf(item) === pos;
      });
    });
  }
  onViewResult(idExamResult, idExam) {
    this.router.navigate([
      '/hometotal/testresult/',
      { param1: idExam, param2: idExamResult }
    ]);
  }
}
