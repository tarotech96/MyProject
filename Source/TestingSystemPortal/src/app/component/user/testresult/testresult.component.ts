import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from 'src/app/service/exam/exam.service';
import { tap, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Exam } from 'src/app/model/exam/exam';
import { domain } from 'src/app/model/domain/domain';
import { UploadfileServiceService } from 'src/app/service/questionservice/uploadfile-service.service';
import { element } from '@angular/core/src/render3';
export interface Result {
  quesId: number;
  ques: [];
  correct: boolean;
}
export interface Domn {
  name: string;
  totalQues: number;
  correct: number;
  per: number;
}
@Component({
  selector: 'app-test-detail',
  templateUrl: './testresult.component.html',
  styleUrls: ['./testresult.component.scss']
})
export class TestresultComponent implements OnInit {
  userId: number;
  domains: domain[];
  mapQuesTionMoi: Object[];
  mapCheckQuestionMoi: Object[];
  examId: number;
  passPercen: number;
  corect: number;
  time: number;
  avgTime: number;
  incorect: number;
  pass: boolean;
  ratio: number;
  examResult: Object;
  listResult: Result[] = [];
  listDomn: Domn[] = [];
  exam: Object;
  examResultID: number;
  score: number;
  created_at: Date;
  question_num: number;
  name: string;
  minute: number;
  totaltime: string;
  timeperques: number;
  isFreeTest: boolean;
  ex?: Exam;
  domainsLens: number;
  checkLocation = '';
  cauHoiChuaLam: number;
  showHideDomainDetail: boolean;
  setDomain = new Set();
  // list question cua object , 1 object 2 phan tu id_question, list answer ng dùng của câu hỏi đó
  mapAnswer = new Map();
  mapCheckedAnser = new Map();
  mapMark = new Map();
  mapABC = new Map();
  // map check đúng sai của câu hỏi
  mapCheckQuestion = new Map();
  mapQuesTion = new Map();
  idExam: number;
  listQuestion: Object[] = [];
  listAnswer: Object[] = [];
  currentQuestion: Object = {
    id: 0,
    content: '',
    answer_Options: [] = []
  };
  // list câu trả lời của question
  answerArray: Array<number> = [];
  len: number;
  per1: number;
  per2: number;
  per3: number;
  per4: number;
  q1: number;
  q2: number;
  constructor(
    private activeRoute: ActivatedRoute,
    private examService: ExamService,
    private router: Router,
    private location: Location,
    private jwt: JwtHelperService
  ) {
    this.activeRoute.params.forEach(urlParams => {
      this.examId = urlParams['param1'];
      this.examResultID = urlParams['param2'];
      this.checkLocation = urlParams['paramLocation'];
    });
  }

  ngOnInit() {
    this.showHideDomainDetail = false;
    const token = this.jwt.decodeToken(localStorage.getItem('access_token'));
    if (token != null) {
      this.isFreeTest = false;
      this.examService
        .getExamReSultByExamAndId(this.examResultID, this.examId)
        .pipe(
          tap(output => {
            this.examResult = output;
            this.passPercen = Math.round(
              (output['correct_num'] / output['exam']['question_num']) * 100
            );
            this.corect = output['correct_num'];
            this.incorect =
              output['exam']['question_num'] - output['correct_num'];
            this.question_num = output['exam']['question_num'];
            this.score = Math.round(output['total_score'] * 100) / 10;
            this.pass = output['pass'];
            this.created_at = output['created_at'];
            this.name = output['exam']['name'];
            this.minute = output['exam']['time'];
            this.totaltime = output['time'];
            const av = output['time'].split(':');
            const tavt = av[0] * 60 + av[1] * 1;
            this.timeperques = Math.round(
              ((tavt * 1) / output['exam']['question_num']) * 1
            );
          }),
          tap(output => {
            this.examService
              .getListQuestionResult(output['id'])
              .subscribe(res1 => {
                this.cauHoiChuaLam =
                  output['exam']['question_num'] - res1.length;
              });
          }),
          switchMap(output => this.examService.getExamById(this.examId))
        )
        .subscribe(res => {
          this.ex = res;
        });
    } else {
      this.showResulerFreeUser();
    }
    // View detail by domain
    this.examService.getListQuestionExam(this.examId).subscribe(res => {
      this.listQuestion = res;
      res.forEach(element0 => {
        if( element0['domain']!=null){
        if (
          element0['domain']['name'] != null ||
          element0['domain']['name'] !== ''
        ) {
          this.setDomain.add(element0['domain']['name']);
        }
      }
      });
      this.domains = Array.from(this.setDomain).sort();
      this.domainsLens = this.domains.length;
      this.len = this.listQuestion.length;
      this.listQuestion.forEach(element1 => {
        this.mapQuesTion.set(element1['id'], element1);
        this.mapCheckQuestion.set(element1['id'], false);
      });
      if (this.len > 0) {
        this.sortAnwserOption();
        this.examService
          .getListQuestionResult(this.examResultID)
          .subscribe(res1 => {
            if (res1.length > 0) {
              this.listAnswer = res1;
              this.listAnswer.forEach(element2 => {
                this.mapAnswer.set(element2[0], element2[1]);
                this.mapCheckQuestion.set(
                  element2[0],
                  this.checkCorrect(
                    element2[1],
                    this.mapQuesTion.get(element2[0])
                  )
                );
              });
              this.mapQuesTionMoi = Array.from(this.mapQuesTion);
              this.mapCheckQuestionMoi = Array.from(this.mapCheckQuestion);
              for (let index = 0; index < this.mapQuesTionMoi.length; index++) {
                const re: Result = {
                  quesId: 0,
                  ques: [],
                  correct: false
                };
                re.quesId = this.mapQuesTionMoi[index][0];
                re.ques = this.mapQuesTionMoi[index][1];
                re.correct = this.mapCheckQuestionMoi[index][1];
                this.listResult.push(re);
              }
              this.domains.forEach(elementd => {
                const d: Domn = {
                  name: '',
                  totalQues: 0,
                  correct: 0,
                  per: 0
                };
                d.name = elementd.toString();
                d.totalQues = this.listResult.filter(
                  val => val.ques['domain']['name'] === elementd
                ).length;
                this.listResult
                  .filter(val => val.ques['domain']['name'] === elementd)
                  .forEach(ele => {
                    if (ele.correct === true) {
                      d.correct++;
                    }
                  });
                d.per = Math.round((d.correct / d.totalQues) * 100);
                this.listDomn.push(d);
              });
            }
          });
      }
    });
  }
  clickRewviewTest() {
    this.router.navigate([
      'hometotal/detailresult',
      {
        param1: this.examId,
        param2: this.examResultID,
        param3: this.name
      }
    ]);
  }
  onBack() {
    this.location.back();
  }
  onClickQuayVe(param) {
    if (this.checkLocation === 'cms') {
      if (param === 1) {
        this.checkLocation = '';
        this.router.navigate([
          '/cms/dashboard',
          { param1: false, param2: true }
        ]);
      } else if (param === 0) {
        this.checkLocation = '';
        this.router.navigate(['/cms/dashboard']);
      }
    } else {
      if (param === 1) {
        this.router.navigate([
          '/hometotal/examhistory',
          { param1: false, param2: true }
        ]);
      } else if (param === 0) {
        this.router.navigate(['/hometotal/examhistory']);
      }
    }
  }
  baiThucHanhCMS() {
    this.router.navigate(['/hometotal/practice']);
  }
  baiThiHanhCMS() {
    this.router.navigate(['/hometotal/userexam']);
  }
  lichSuCMS() {
    if (this.checkLocation === 'cms') {
      this.router.navigate(['/cms/dashboard']);
    } else {
      this.router.navigate(['/hometotal/examhistory']);
    }
  }
  showResulerFreeUser() {
    if (sessionStorage.getItem(this.examId.toString()) != null) {
      this.isFreeTest = true;
      const output = JSON.parse(sessionStorage.getItem(this.examId.toString()));
      this.examResult = output;
      this.ex = output;
      this.passPercen = Math.round(
        (output['correct_num'] / output['exam']['question_num']) * 100
      );
      this.corect = output['correct_num'];
      this.incorect = output['exam']['question_num'] - output['correct_num'];
      this.question_num = output['exam']['question_num'];
      this.score = Math.round(output['total_score'] * 100) / 10;
      this.pass = output['pass'];
      this.created_at = new Date();
      this.name = output['exam']['name'];
      this.minute = output['exam']['time'];
      this.totaltime = output['time'];
      const av = output['time'].split(':');
      const tavt = av[0] * 60 + av[1] * 1;
      this.timeperques = Math.round(
        ((tavt * 1) / output['exam']['question_num']) * 1
      );
    }
  }
  clickViewDomainDetail(val) {
    this.showHideDomainDetail = true;
    this.per1 = this.listDomn[val]['per'];
    this.q1 = this.listDomn[val]['correct'];
    this.q2 = this.listDomn[val]['totalQues'];
    this.per3 = Math.round(((this.q2 - this.q1) / this.q2) * 100);
  }

  // View theo domains
  checkAnswer() {
    this.mapCheckedAnser = new Map();
    this.answerArray.forEach(elementkk => {
      this.mapCheckedAnser.set(elementkk, true);
    });
  }
  splitAnswer(answer: String) {
    if (typeof answer !== 'undefined' || answer === '') {
      let tem = answer.split('[');
      tem = tem[1].split(']');
      tem = tem[0].split(',');
      tem.forEach(elementz => {
        this.answerArray.push(+elementz);
      });
      this.checkAnswer();
    }
  }
  checkCorrect(answer: string, question: Object) {
    const arrayCorrect: number[] = [];
    question['answer_Options'].forEach(elementu => {
      if (elementu['correct']) {
        arrayCorrect.push(elementu['id']);
      }
    });
    if (typeof answer !== 'undefined' || answer === '') {
      const arrayAnser: number[] = [];
      let tem = answer.split('[');
      tem = tem[1].split(']');
      tem = tem[0].split(',');
      tem.forEach(elementj => {
        arrayAnser.push(+elementj);
      });
      if (arrayAnser.length !== arrayCorrect.length) {
        return false; // Mau cam -- Sai
      }
      const missing = arrayAnser.filter(function(item) {
        return arrayCorrect.indexOf(item) < 0;
      });
      if (missing.length === 0) {
        return true; // Mau xanh la cay - Dung
      } else {
        return false; // Mau cam -- Sai
      }
    } else {
      return false;
    }
  }
  sortAnwserOption() {
    this.currentQuestion['answer_Options'].sort(function(obj1, obj2) {
      return obj2['id'] - obj1['id'];
    });
  }
}
