import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from 'src/app/service/exam/exam.service';
import { Exam } from 'src/app/model/exam/exam';
import { Observable, iif, of, Subscription, interval } from 'rxjs';
import { CanComponentDeactive } from 'src/app/service/exam-guard/confirmation/confirmation.guard';
import { UserserviceService } from 'src/app/service/user-service/userservice.service';
import { UserService } from 'src/app/service/login/user.service';
import { Constant } from 'src/app/common/constant';
import { tap, concatMap } from 'rxjs/operators';

export interface QuestionAnswer {
  question_id: number;
  answer: number[];
}
@Component({
  selector: 'app-test-process',
  templateUrl: './test-process.component.html',
  styleUrls: ['./test-process.component.scss']
})
export class TestProcessComponent
  implements OnInit, OnDestroy, CanComponentDeactive {
  isDirty: boolean;
  isOver: boolean;
  private timerId: any;
  examResultID: Number;
  mapAnswer = new Map();
  mapCheckedAnser = new Map();
  mapMark = new Map();
  mapABC = new Map();
  idExam: number;
  exam: Exam;
  result: Object;
  listQuestion: Object[] = [];
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
  defaultChoice: number;
  tenBaiThi: string;
  chuDeBaiThi: string;
  fileExtension: string;
  audio: any;
  notificationVisibilityWhenDelete = false;
  notinaiyo: string;
  baseUrl = '';
  sub: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private examService: ExamService,
    private userserviceService: UserserviceService,
    public us: UserService
  ) {
    this.activatedRoute.params.forEach(urlParams => {
      this.idExam = urlParams['param1'];
      this.examResultID = urlParams['param2'];
      this.tenBaiThi = urlParams['param3'];
      this.chuDeBaiThi = urlParams['param4'];
    });
    this.baseUrl = Constant.BASE_URL;
  }
  ngOnInit() {
    this.notificationVisibilityWhenDelete = false;
    this.isDirty = false;
    this.isOver = false;
    this.displayTime = '';

    this.examService
      .getExamReSultByExamAndId(this.examResultID, this.idExam)
      .pipe(
        tap(res => {
          if (
            res['users']['email'] !==
            JSON.parse(localStorage.getItem('item')).email
          ) {
            this.isOver = true;
            this.router.navigate(['/error']);
          }
          if (res['completed'] === 1) {

            this.isOver = true;
            this.router.navigate([
              '/hometotal/testresult',
              { param1: this.idExam, param2: this.examResultID }
            ]);
          }
        }),
        concatMap(_ => this.examService.getExam(this.idExam))
      )
      .subscribe(res2 => {
        if (!this.isOver) {
        this.us.setUserTest(JSON.parse(localStorage.getItem('item')).email).subscribe();
        }
        this.exam = res2;
        this.playAudio();
        this.countdown(this.exam.time);
      });
    this.examService.getListQuestionExam(this.idExam).subscribe(res => {
      this.listQuestion = this.randomQuestion(res);
      this.len = this.listQuestion.length;
      if (this.listQuestion.length > 0) {
        this.currentQuestion = res[0];
        this.checkFile();
        this.sortAnwserOption();
        this.listQuestion.forEach(element => {
          // tslint:disable-next-line:prefer-const
          let array: Object[] = [];
          this.mapAnswer.set(element['id'], array);
        });
      }
    });
    this.setValueABC(this.mapABC);
    this.position = 1;
    this.showModal = false;
    // tslint:disable-next-line:prefer-const
  }
  ngOnDestroy() {
    this.turnOffAudio();
    if (this.sub != null) {
      this.sub.unsubscribe();
    }
  }
  countdown(min: number) {
    let seconds = 0;
    let displayMin = '';
    let displaySecond = '';
    this.sub = interval(1000).subscribe(res => {
      if (min === 0 && seconds === 0) {
        this.isOver = true;
        this.scoreExam();
      }
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
      if (min > -1) {
        if (seconds === 0) {
          min--;
          seconds = 59;
        } else {
          seconds--;
        }
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
      this.currentQuestion = this.listQuestion[this.position];
      this.checkFile();
      this.position++;
      this.answerArray = this.mapAnswer.get(this.currentQuestion['id']);
      this.checkAnswer();
      this.sortAnwserOption();
    } else {
      this.clickScoreExam();
    }
  }
  clickPrev() {
    if (this.position > 1) {
      this.position--;
      this.currentQuestion = this.listQuestion[this.position - 1];
      this.checkFile();
      this.answerArray = this.mapAnswer.get(this.currentQuestion['id']);
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
  scoreExam(): void {
    // tslint:disable-next-line:prefer-const
    let result: QuestionAnswer[] = [];
    this.mapAnswer.forEach((value: number[], key: number) => {
      // tslint:disable-next-line:prefer-const
      let qa: QuestionAnswer = {
        question_id: 0,
        answer: []
      };
      qa.question_id = key;
      qa.answer = value;
      result.push(qa);
    });
    const data = {
      listQuestion: result,
      result_id: this.examResultID
    };
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    this.examService.getEndExam(formData).subscribe(_ => {
      // MR DUC thêm ngày 7/1/2019 *** START
      this.userserviceService
        .getListExamOfUserASCBYEndDate(this.us.userLogin.id)
        .subscribe(res => {
          this.userserviceService.sizeExamAssign = res.length;
        });
      // MR DUC thêm ngày 7/1/2019 *** END
      this.router.navigate([
        '/hometotal/testresult',
        { param1: this.idExam, param2: this.examResultID }
      ]);
    });
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
  @HostListener('window:beforeunload', ['$event'])
  canDeactivate(): Observable<boolean> | boolean {
    if (localStorage.getItem('item') != null) {
      if (this.isOver) {
        this.turnOffAudio();
        return true;
      }
      const confirm = window.confirm('Bạn muốn nộp bài không?');
      if (confirm) {
        this.scoreExam();
        this.isDirty = true;
      } else {
        this.isDirty = false;
      }
      return this.isDirty;
    } else {
      return true;
    }
  }
  @HostListener('window:unload', ['$event'])
  unloadHandler(event) {

    this.scoreExam();
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
  randomQuestion(input: Object[]) {
    const len = input.length;
    if (len > 0) {
      for (let i = input.length - 1; i >= 0; i--) {
        // tslint:disable-next-line:prefer-const
        let randomIndex = Math.floor(Math.random() * (i + 1));
        // tslint:disable-next-line:prefer-const
        let itemAtIndex = input[randomIndex];
        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
      }
    }
    return input;
  }
  sortAnwserOption() {
    this.currentQuestion['answer_Options'].sort(function(obj1, obj2) {
      return obj2['id'] - obj1['id'];
    });
  }
}
