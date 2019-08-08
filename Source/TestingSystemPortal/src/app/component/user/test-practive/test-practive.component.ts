import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from 'src/app/service/exam/exam.service';
import { Exam } from 'src/app/model/exam/exam';
import { Observable, Subscription, interval } from 'rxjs';
import { CanComponentDeactive } from 'src/app/service/exam-guard/confirmation/confirmation.guard';
import { Constant } from 'src/app/common/constant';

export interface QuestionAnswer {
  question_id: number;
  answer: number[];
}

@Component({
  selector: 'app-test-practive',
  templateUrl: './test-practive.component.html',
  styleUrls: ['./test-practive.component.scss']
})
export class TestPractiveComponent
  implements OnInit, OnDestroy, CanComponentDeactive {
  private timerId: any;
  isOver: boolean;
  isDirty: boolean;
  examResultID: number;
  mapAnswer = new Map();
  mapCheckedAnser = new Map();
  mapMark = new Map();
  mapABC = new Map();
  idExam: number;
  exam: Exam;
  result: Object;
  listQuestion: Object[] = [];
  listAnswer: Object[] = [];
  displayTime: string;
  currentQuestion: Object = {
    id: 0,
    content: '',
    answer_Options: [] = []
  };
  answerArray: Array<number> = [];
  showModal: boolean;
  position: number;
  len: number;
  answerArrayBefore: Array<number> = [];
  defaultChoice: number;
  tenBaiThi: string;
  chuDeBaiThi: string;
  fileExtension: string;
  audio: any;
  notificationVisibilityWhenDelete = false;
  notinaiyo: string;
  baseUrl = '';
  completedExam: number;
  sub: Subscription;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private examService: ExamService
  ) {
    this.activatedRoute.params.forEach(urlParams => {
      this.idExam = urlParams['param1'];
      this.examResultID = urlParams['param2'];
      this.tenBaiThi = urlParams['param3'];
      this.chuDeBaiThi = urlParams['param4'];
    });
  }

  ngOnInit() {
    this.baseUrl = Constant.BASE_URL;
    this.notificationVisibilityWhenDelete = false;
    this.isOver = false;
    this.isDirty = false;
    this.displayTime = '';
    this.examService.getExam(this.idExam).subscribe(res2 => {
      this.exam = res2;
      this.playAudio();
    });
    this.examService
      .getExamReSultByExamAndId(this.examResultID, this.idExam)
      .subscribe(res => {
        if (res['completed'] === 1) {
          this.isOver = true;
          this.router.navigate([
            '/hometotal/testresult',
            { param1: this.idExam, param2: this.examResultID }
          ]);
        }
        const timeArray = res['time'].split(':');
        const minute = +timeArray[0];
        const second = +timeArray[1];
        this.countup(minute, second, this.timerId);
      });
    this.examService.getListQuestionExam(this.idExam).subscribe(res => {
      // danh sách câu hỏi của exam
      this.listQuestion = res;
      this.len = this.listQuestion.length;
      //
      if (this.len > 0) {
        this.currentQuestion = res[0];
        this.checkFile();
        this.sortAnwserOption();
        this.listQuestion.forEach(element => {
          // tslint:disable-next-line:prefer-const
          let array: Object[] = [];
          this.mapAnswer.set(element['id'], array);
        });
        this.examService
          .getListQuestionResult(this.examResultID)
          .subscribe(res1 => {
            if (res1.length > 0) {
              // danh sách câu trả lời của  các câu hỏi
              this.listAnswer = res1;
              this.listAnswer.forEach(element => {
                this.mapAnswer.set(element[0], this.splitAnswer(element[1]));
              });
            }
            this.answerArray = this.mapAnswer.get(this.currentQuestion['id']);
            this.answerArray.forEach(element => {
              this.answerArrayBefore.push(element);
            });
            this.checkAnswer();
            //   this.splitAnswer(this.mapAnswer.get(this.currentQuestion['id']));
          });
      }
    });
    this.setValueABC(this.mapABC);
    this.position = 1;
    this.showModal = false;
    this.completedExam = 0;
    // tslint:disable-next-line:prefer-const
    // let context = this;
    // window.addEventListener('beforeunload', function(e) {
    //   window.confirm('Bạn có muốn thoát không?');
    // });
  }
  ngOnDestroy() {
    this.turnOffAudio();
    this.sub.unsubscribe();
    // this.crudAnswerExam(this.answerArrayBefore, this.answerArray);
    // this.updateTime();
  }
  countup(min: number, seconds: number, timerId: any) {
    let displayMin = '';
    let displaySecond = '';
    this.sub = interval(1000).subscribe(res => {
      if (min <= 9) {
        displayMin = '0' + min;
      } else {
        displayMin = min.toString();
      }
      if (seconds <= 9) {
        displaySecond = '0' + seconds;
      } else {
        displaySecond = seconds.toString();
      }
      this.displayTime = displayMin + ':' + displaySecond;
      if (seconds === 59) {
        seconds = 0;
        min++;
      } else {
        seconds++;
      }
    });
  }
  setValueABC(map: Map<number, string>) {
    map.set(0, '   A');
    map.set(1, '   B');
    map.set(2, '   C');
    map.set(3, '   D');
    map.set(4, '   E');
    map.set(5, '   F');
    map.set(6, '   G');
    map.set(7, '   H');
    map.set(8, '   I');
  }
  onClickQuestion(q: Object, i: number) {
    this.crudAnswerExam(this.answerArrayBefore, this.answerArray);
    this.currentQuestion = q;
    this.checkFile();
    this.position = i + 1;
    this.answerArray = this.mapAnswer.get(q['id']);
    this.checkAnswer();
    this.sortAnwserOption();
  }
  // onSelectionChange(id: number) {
  //   this.mapAnswer.set(this.currentQuestion['id'] , id);
  // }
  clickNext() {
    if (this.position < this.len) {
      this.crudAnswerExam(this.answerArrayBefore, this.answerArray);
      const data = {
        result_id: 0,
        quesion_id: 0,
        answer: []
      };
      if (this.answerArray.length !== 0) {
        if (this.answerArrayBefore.length === 0) {
        }
      }
      this.currentQuestion = this.listQuestion[this.position];
      this.checkFile();
      this.position++;
      this.answerArray = this.mapAnswer.get(this.currentQuestion['id']);
      this.answerArrayBefore = [];
      this.answerArray.forEach(element => {
        this.answerArrayBefore.push(element);
      });
      this.checkAnswer();
      this.sortAnwserOption();
    } else {
      this.clickScoreExam();
    }
  }
  clickPrev() {
    if (this.position > 1) {
      this.crudAnswerExam(this.answerArrayBefore, this.answerArray);
      this.position--;
      this.currentQuestion = this.listQuestion[this.position - 1];
      this.checkFile();
      this.answerArray = this.mapAnswer.get(this.currentQuestion['id']);
      this.answerArrayBefore = [];
      this.answerArray.forEach(element => {
        this.answerArrayBefore.push(element);
      });
      this.checkAnswer();
      this.sortAnwserOption();
    }
  }
  clickMark(id: number) {
    this.mapMark.set(id, !this.mapMark.get(id));
  }
  clickScoreExam() {
    let lenAnswered = 0;
    this.mapAnswer.forEach((value: number[], key: number) => {
      if (this.mapAnswer.get(key).length !== 0) {
        lenAnswered++;
      }
    });
    if (lenAnswered < this.len) {
      this.notinaiyo =
        'Bạn đã làm ' +
        lenAnswered +
        '/' +
        this.len +
        ' câu hỏi! Bạn có muốn nộp bài không ?';
    } else {
      this.notinaiyo = 'Bạn có muốn nộp bài không ?';
    }
    this.notificationVisibilityWhenDelete = true;
  }
  oncg(event: boolean) {
    if (event) {
      this.isOver = true;
      this.scoreExam();
      this.notificationVisibilityWhenDelete = event;
    } else {
      this.notificationVisibilityWhenDelete = event;
    }
  }
  scoreExam() {
    this.completedExam = 1;
    this.crudAnswerExam(this.answerArrayBefore, this.answerArray);
  }
  onChange(id: number, isChecked: boolean) {
    if (isChecked) {
      this.answerArray.push(id);
    } else {
      // tslint:disable-next-line:prefer-const
      let index = this.answerArray.indexOf(id);
      this.answerArray.splice(index, 1);
    }
    this.mapAnswer.set(this.currentQuestion['id'], this.answerArray);
  }
  checkAnswer() {
    this.mapCheckedAnser = new Map();
    this.answerArray.forEach(element => {
      this.mapCheckedAnser.set(element, true);
    });
  }
  crudAnswerExam(before: number[], now: number[]) {
    const data = {
      result_id: this.examResultID,
      complete: this.completedExam,
      question_id: 0,
      answer: [],
      time: this.displayTime
    };
    data.question_id = this.currentQuestion['id'];
    const formData = new FormData();
    if (now.length !== 0) {
      data.answer = this.answerArray;
      formData.append('data', JSON.stringify(data));
      if (before.length === 0) {
        this.examService.insertExamAnswer(formData).subscribe(res => {
          this.checkRedidectResult();
        });
      } else {
        this.examService.updateExamAnswer(formData).subscribe(res => {
          this.checkRedidectResult();
        });
      }
    } else {
      if (before.length !== 0) {
        formData.append('data', JSON.stringify(data));
        this.examService.deleteExamAnswer(formData).subscribe(res => {
          this.checkRedidectResult();
        });
      } else {
        this.updateTime();
      }
    }
  }
  splitAnswer(answer: String) {
    // tslint:disable-next-line:prefer-const
    let output: Array<number> = [];
    if (answer != null) {
      let tem = answer.split('[');
      tem = tem[1].split(']');
      tem = tem[0].split(',');
      tem.forEach(element => {
        output.push(+element);
      });
      return output;
      // this.answerArrayBefore = this.answerArray;
      // this.checkAnswer();
    }
  }
  updateTime() {
    const data = {
      result_id: this.examResultID,
      time: this.displayTime,
      complete: this.completedExam
    };
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    this.examService.updateTimeExamResult(formData).subscribe(res => {
      this.checkRedidectResult();
    });
  }
  @HostListener('window:beforeunload', ['$event'])
  canDeactivate(): Observable<boolean> | boolean {
    if (this.isOver) {
      return true;
    }
    const confirm = window.confirm('Bạn có chắc muốn thoát không?');
    if (confirm) {
      this.crudAnswerExam(this.answerArrayBefore, this.answerArray);
      // this.updateTime();
      this.isDirty = true;
    } else {
      this.isDirty = false;
    }
    return this.isDirty;
  }
  @HostListener('window:unload', ['$event'])
  unloadHandler(event) {
    this.crudAnswerExam(this.answerArrayBefore, this.answerArray);
    // this.updateTime();
  }
  checkFile() {
    this.fileExtension = '';
    if (
      this.currentQuestion['media'] != null &&
      this.currentQuestion['media'] !== ''
    ) {
      const array = this.currentQuestion['media'].split('.');
      const len = array.length;
      if (array[len - 1] === 'mp4') {
        this.fileExtension = 'mp4';
      } else if (array[len - 1] === 'mp3') {
        this.fileExtension = 'mp3';
      } else if (array[len - 1] === 'png' || array[len - 1] === 'jpg') {
        this.fileExtension = 'img';
      }
    }
  }
  playAudio() {
    if (this.exam.media !== '' && this.exam.media != null) {
      this.audio = new Audio();
      this.audio.src =
        Constant.BASE_URL + '/resources/images/exam/' + this.exam.media;
      this.audio.load();
      // auto-start
      this.audio.play();
    }
  }
  turnOffAudio() {
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
  }
  playClick() {
    this.audio.pause();
  }
  pauseClick() {
    this.audio.play();
  }
  checkRedidectResult() {
    if (this.completedExam === 1) {
      this.router.navigate([
        '/hometotal/testresult',
        { param1: this.idExam, param2: this.examResultID }
      ]);
    }
  }
  sortAnwserOption() {
    this.currentQuestion['answer_Options'].sort(function(obj1, obj2) {
      return obj2['id'] - obj1['id'];
    });
  }
}
