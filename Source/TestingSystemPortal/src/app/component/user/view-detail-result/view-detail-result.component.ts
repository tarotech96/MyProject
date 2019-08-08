import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamService } from 'src/app/service/exam/exam.service';
import { UploadfileServiceService } from 'src/app/service/questionservice/uploadfile-service.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Location } from '@angular/common';
import { Constant } from 'src/app/common/constant';

@Component({
  selector: 'app-view-detail-result',
  templateUrl: './view-detail-result.component.html',
  styleUrls: ['./view-detail-result.component.scss']
})
export class ViewDetailResultComponent implements OnInit {
  private timerId: any;
  examResultID: number;
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
  showModal: boolean;
  position: number;
  len: number;
  name: string;
  fileExtension: string;
  baseUrl: string;
  widthQuestion: string;
  heightQuestion: string;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private examService: ExamService,
    private quesTionService: UploadfileServiceService,
    private jwt: JwtHelperService,
    private location: Location
  ) {
    this.activatedRoute.params.forEach(urlParams => {
      this.idExam = urlParams['param1'];
      this.examResultID = urlParams['param2'];
      this.name = urlParams['param3'];
    });
    this.baseUrl = Constant.BASE_URL;
  }

  ngOnInit() {
    this.examService.getListQuestionExam(this.idExam).subscribe(res => {
      this.listQuestion = res;
      this.len = this.listQuestion.length;
      this.listQuestion.forEach(element => {
        this.mapQuesTion.set(element['id'], element);
        this.mapCheckQuestion.set(element['id'], 'white');
      });
      if (this.len > 0) {
        this.currentQuestion = res[0];
        this.checkFile();
        this.sortAnwserOption();
        this.examService
          .getListQuestionResult(this.examResultID)
          .subscribe(res1 => {
            if (res1.length > 0) {
              this.listAnswer = res1;
              this.listAnswer.forEach(element => {
                this.mapAnswer.set(element[0], element[1]);
                this.mapCheckQuestion.set(
                  element[0],
                  this.checkCorrect(
                    element[1],
                    this.mapQuesTion.get(element[0])
                  )
                );
              });
            }
            this.splitAnswer(this.mapAnswer.get(this.currentQuestion['id']));
          });
      }
    });
    this.setValueABC(this.mapABC);
    this.position = 1;
    this.showModal = false;
    // tslint:disable-next-line:prefer-const
    let context = this;
    window.addEventListener('beforeunload', function(e) {
      window.confirm('Bạn có muốn thoát không?');
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
    this.position = i + 1;
    this.checkFile();
    this.splitAnswer(this.mapAnswer.get(this.currentQuestion['id']));
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
      this.splitAnswer(this.mapAnswer.get(this.currentQuestion['id']));
      this.sortAnwserOption();
    }
  }
  clickPrev() {
    if (this.position > 1) {
      this.position--;
      this.currentQuestion = this.listQuestion[this.position - 1];
      this.checkFile();
      this.splitAnswer(this.mapAnswer.get(this.currentQuestion['id']));
      this.sortAnwserOption();
    }
  }
  clickMark(id: number) {
    this.mapMark.set(id, !this.mapMark.get(id));
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
  splitAnswer(answer: String) {
    if (typeof answer !== 'undefined' || answer === '') {
      let tem = answer.split('[');
      tem = tem[1].split(']');
      tem = tem[0].split(',');
      tem.forEach(element => {
        this.answerArray.push(+element);
      });
      this.checkAnswer();
    }
  }
  checkCorrect(answer: string, question: Object) {
    const arrayCorrect: number[] = [];
    question['answer_Options'].forEach(element => {
      if (element['correct']) {
        arrayCorrect.push(element['id']);
      }
    });
    if (typeof answer !== 'undefined' || answer === '') {
      const arrayAnser: number[] = [];
      let tem = answer.split('[');
      tem = tem[1].split(']');
      tem = tem[0].split(',');
      tem.forEach(element => {
        arrayAnser.push(+element);
      });
      if (arrayAnser.length !== arrayCorrect.length) {
        return '#F05228';
      }
      const missing = arrayAnser.filter(function(item) {
        return arrayCorrect.indexOf(item) < 0;
      });
      if (missing.length === 0) {
        return '#6AC259';
      } else {
        return '#F05228';
      }
    } else {
      return 'white';
    }
  }
  backPage() {
    this.location.back();
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
  sortAnwserOption() {
    this.currentQuestion['answer_Options'].sort(function(obj1, obj2) {
      return obj2['id'] - obj1['id'];
    });
  }
}
