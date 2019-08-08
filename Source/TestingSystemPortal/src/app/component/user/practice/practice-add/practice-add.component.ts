import { Component, OnInit } from '@angular/core';
import { subject } from 'src/app/model/subject/subject';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  AbstractControl
} from '@angular/forms';
import { SubjectService } from 'src/app/service/subject/subject.service';
import { ChapterService } from 'src/app/service/chapter/chapter.service';
import { DomainService } from 'src/app/service/domain/domain.service';
import { Location } from '@angular/common';
import { forkJoin } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'src/app/service/login/user.service';
import { ExamService } from 'src/app/service/exam/exam.service';
import { UploadfileServiceService } from 'src/app/service/questionservice/uploadfile-service.service';
import { tap, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
export class DTO {
  chapter: string;
  domain: string;
  number: number;
  tooltip: string;
  constructor(chapter, domain, number, tooltip) {
    this.chapter = chapter;
    this.domain = domain;
    this.number = number;
    this.tooltip = tooltip;
  }
}
function validatorEmptyInput(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { whitespace: true };
}
// function minLengthArray(min: number) {
//   return (c: AbstractControl): { [key: string]: any } => {
//     if (c.value.length >= min) {
//       return null;
//     }
//     return { minLengthArray: { valid: false } };
//   };
// }
@Component({
  selector: 'app-practice-add',
  templateUrl: './practice-add.component.html',
  styleUrls: ['./practice-add.component.scss']
})
export class PracticeAddComponent implements OnInit {
  subjects: subject[] = [];
  chapters = [];
  showWarning :boolean;
  domains = [];
  mapSubject: Map<number, string>;
  addDetail: FormGroup;
  crChapter: string;
  crDomain: string;
  listOpSelect = [];
  listOpSelectCp = [];
  mapNumberQuestion: Map<string, number>;
  isDisable: boolean;
  listNumberQuestionOfDomainAndChapter = [];
  listDataRandom = [];
  isExceedDomainChapter: boolean;
  listRequest = [];
  listIdInit: number[];
  listQuestionOfChapterAndDomain = [];
  error: string;
  isShow: boolean;
  defaultCt: string;
  defaultDm: string;
  ////////////
  subject: subject;
  tempList: number[];
  idsubject: string;
  idChapter: string;
  idDomain: string;
  insertFormPractise: FormGroup;
  errorPermission = '';
  showTable: Boolean = true;
  showInsertForm: Boolean = false;
  showUpdateForm: Boolean = false;
  chapterPercen: '';
  domainPercen: '';
  numberQuestion: '';
  tokens: any;
  code: string;
  creator_id: any;
  practiseType: 1;
  title: string;
  numberOfChapter: number;
  numberOfDomain: number;
  restquestion: number;
  listSelectedRadom = [];
  listQuestionOfSubject: Object[];
  output1: string[];
  output2: string[];
  idExam: Object;
  isExceedTotalQuestion: boolean;
  numberQuestionOfExam: any;
  constructor(
    private subjectService: SubjectService,
    private chapterService: ChapterService,
    private domainService: DomainService,
    private jwt: JwtHelperService,
    private questionService: UploadfileServiceService,
    private examService: ExamService,
    private fb: FormBuilder,
    private us: UserService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    // this.tempList.push(0);
    this.error = '';
    this.showWarning = false;
    this.isShow = true;
    this.isExceedDomainChapter = false;
    this.isExceedTotalQuestion = false;
    this.mapNumberQuestion = new Map();
    this.mapSubject = new Map();
    this.isDisable = false;
    const token = this.jwt.decodeToken(localStorage.getItem('access_token'));
    this.tokens = token;
    if (token != null) {
      this.us.getUserbyEmail(token['username']).subscribe(res => {
        this.creator_id = res['id'];
      });
    }
    this.addDetail = this.fb.group({
      nameofpractise: [
        '',
        [
          Validators.required,
          Validators.maxLength(100),
          Validators.minLength(10),
          validatorEmptyInput
        ]
      ],
      numofquestion: [
        '',
        [Validators.required, Validators.max(100), Validators.min(10)]
      ],
      subject: ['', [Validators.required]],
      code: [''],
      creator_id: [''],
      numberQuestion: [''],
      selectChapter: [''],
      selectDomain: [''],
      detailSelect: this.fb.array([])
    });
    this.subjectService.getListSubject().subscribe(res => {
      this.subjects = res;
      res.map(x => {
        this.mapSubject.set(x['id'], x['name']);
      });
    });
  }
  get getdetailSelect(): FormArray {
    return <FormArray>this.addDetail.controls.detailSelect;
  }
  selectChapter(event) {
    this.crChapter = event.target.value;
    if (this.listOpSelectCp.length !== 0) {
      if (!this.checkExistDomainChapter(this.crChapter, this.crDomain)) {
        if (
          (this.crChapter !== '' || this.crChapter !== undefined) &&
          (this.crDomain !== '' || this.crDomain !== undefined)
        ) {
          if (
            this.mapNumberQuestion.get(this.crChapter + '' + this.crDomain) !==
            undefined
          ) {
            this.isDisable = true;
          } else {
            this.isDisable = false;
          }
        }
      } else {
        this.isDisable = false;
      }
    } else {
      if (
        (this.crChapter !== '' || this.crChapter !== undefined) &&
        (this.crDomain !== '' || this.crDomain !== undefined)
      ) {
        if (
          this.mapNumberQuestion.get(this.crChapter + '' + this.crDomain) !==
          undefined
        ) {
          this.isDisable = true;
        } else {
          this.isDisable = false;
        }
      }
    }
  }
  selectDomain(event) {
    this.crDomain = event.target.value;
    if (this.listOpSelectCp.length !== 0) {
      if (!this.checkExistDomainChapter(this.crChapter, this.crDomain)) {
        if (
          (this.crChapter !== '' || this.crChapter !== undefined) &&
          (this.crDomain !== '' || this.crDomain !== undefined)
        ) {
          if (
            this.mapNumberQuestion.get(this.crChapter + '' + this.crDomain) !==
            undefined
          ) {
            this.isDisable = true;
          }
        }
      } else {
        this.isDisable = false;
      }
    } else {
      if (
        (this.crChapter !== '' || this.crChapter !== undefined) &&
        (this.crDomain !== '' || this.crDomain !== undefined)
      ) {
        if (
          this.mapNumberQuestion.get(this.crChapter + '' + this.crDomain) !==
          undefined
        ) {
          this.isDisable = true;
        } else {
          this.isDisable = false;
        }
      }
    }
  }
  checkExistDomainChapter(chapter, domain): boolean {
    for (let i = 0; i < this.listOpSelectCp.length; i++) {
      if (
        this.listOpSelectCp[i]['chapter'] +
          '' +
          this.listOpSelectCp[i]['domain'] ===
        chapter + '' + domain
      ) {
        return true;
      }
    }
    return false;
  }
  onAdd(control) {
    if (
      this.mapNumberQuestion.get(this.crChapter + this.crDomain) !== undefined
    ) {
      if (
        +this.mapNumberQuestion.get(this.crChapter + this.crDomain) <
        this.addDetail.get('numberQuestion').value
      ) {
        this.isDisable = false;
      }
    } else {
      this.isDisable = false;
    }
    this.listOpSelect.push({
      chapter: this.crChapter,
      domain: this.crDomain,
      number: this.addDetail.get('numberQuestion').value,
      tooltip: this.mapNumberQuestion
        .get(this.crChapter + '' + this.crDomain)
        .toString()
    });
    this.listOpSelectCp = [];
    for (let i = 0; i < this.listOpSelect.length; i++) {
      const temp = new DTO(
        this.listOpSelect[i]['chapter'],
        this.listOpSelect[i]['domain'],
        this.listOpSelect[i]['number'],
        this.listOpSelect[i]['tooltip']
      );
      this.listOpSelectCp[i] = temp;
    }
    this.addDetail.get('numberQuestion').patchValue('');
    this.addDetail.get('selectChapter').patchValue('');
    this.addDetail.get('selectDomain').patchValue('');
    this.getdetailSelect.controls = [];
    this.listOpSelect.forEach(x => {
      this.getdetailSelect.push(
        this.fb.group({
          chapter: x['chapter'],
          domain: x['domain'],
          number: x['number'],
          tooltip: x['tooltip']
        })
      );
    });
  }
  validateMax(value) {
    if (
      this.mapNumberQuestion.get(this.crChapter + this.crDomain) !== undefined
    ) {
      if (
        +this.mapNumberQuestion.get(this.crChapter + this.crDomain) < +value ||
        +this.addDetail.get('numofquestion').value < +value
      ) {
        this.isDisable = false;
        this.showWarning = true;
      } else if (this.checkExistDomainChapter(this.crChapter, this.crDomain)) {
        this.isDisable = false;
        this.showWarning = false;
      } else {
        this.isDisable = true;
        this.showWarning = false;
      }
    }
  }
  generateQuestion(idExam) {
    const check = 0;
    let numberquestionselect = 0;
    this.listDataRandom = [];
    for (let i = 0; i < this.addDetail.value['detailSelect'].length; i++) {
      const object = {};
      object['stt'] = i;
      object['slcauhoi'] = this.addDetail.value['detailSelect'][i]['number'];
      if (this.isValid(i)) {
        this.isExceedDomainChapter = true;
        return;
      }
      numberquestionselect += +this.addDetail.value['detailSelect'][i][
        'number'
      ];
      object['chapter'] = this.addDetail.value['detailSelect'][i]['chapter'];
      object['domain'] = this.addDetail.value['detailSelect'][i]['domain'];
      this.listDataRandom.push(object);
    }
    if (
      +this.addDetail.get('numofquestion').value >= numberquestionselect &&
      check === 0
    ) {
      this.listRequest = [];
      for (let i = 0; i < this.listDataRandom.length; i++) {
        // tslint:disable-next-line:max-line-length
        const val = this.listDataRandom[i];
        if (val['slcauhoi'] === undefined) {
          val['slcauhoi'] = 0;
        }
        const request = this.questionService.getListQuestionRandomByChapTerAndDomain(
          this.idsubject,
          +val['domain'],
          +val['chapter'],
          +val['slcauhoi']
        );
        this.listRequest.push(request);
      }
      this.listIdInit = [];
      forkJoin(this.listRequest)
        .pipe(
          tap(output => {
            let ok = 0;
            output = [].concat.apply([], output);
            this.listQuestionOfChapterAndDomain = [];
            this.listQuestionOfChapterAndDomain = [].concat.apply([], output);
            this.restquestion =
              +this.addDetail.get('numofquestion').value -
              this.listQuestionOfChapterAndDomain.length;
            if (this.listQuestionOfChapterAndDomain.length === 0) {
              ok = 1;
              this.listQuestionOfChapterAndDomain.push({ id: 0 });
            }
            this.listIdInit = [];
            this.listIdInit = this.listQuestionOfChapterAndDomain.map(
              x => x['id']
            );
            if (ok === 1) {
              this.listQuestionOfChapterAndDomain = [];
            }
          }),
          switchMap(output =>
            this.questionService.getLisgetListRestQuestionRandom(
              this.restquestion,
              this.listIdInit,
              this.idsubject
            )
          ),
          tap(output2 => {
            this.listQuestionOfChapterAndDomain = this.listQuestionOfChapterAndDomain.concat(
              output2
            );
            this.listIdInit = this.listQuestionOfChapterAndDomain.map(
              x => x['id']
            );
          }),
          switchMap(output3 =>
            this.examService.updateExamDetail(this.listIdInit, idExam, -1, null)
          )
        )
        .subscribe(res => {
          if (res['response'] === 'success') {
            this.router.navigate(['/hometotal/practice']);
          }
        });
    } else {
      this.isExceedTotalQuestion = true;
    }
  }
  onSubmitInsert() {
    const { valid, value } = this.addDetail;
    console.log(valid);
    if (valid && this.listOpSelect.length !== 0) {
      let subjectName = this.mapSubject.get(+this.idsubject);
      subjectName += '';
      this.code = subjectName
        .split(' ')
        .map(x => x[0])
        .reduce((a, b) => a + b);
      this.code += Math.floor(Math.random() * 10000 + 1);
      this.addDetail.get('creator_id').setValue(this.creator_id);
      this.addDetail.get('code').setValue(this.code);
      const data = new FormData();
      data.append('formdata', JSON.stringify(this.addDetail.value));
      this.addDetail.value.detailSelect.map(data => {
          if ( data.number > data.tooltip) {
            this.isExceedDomainChapter = true;
          }
      });
      let sum =  this.addDetail.value.detailSelect.reduce((acc, val) => {
        return acc + val.number;
      }, 0);
      if(sum > this.addDetail.value.numofquestion) {
        this.isExceedTotalQuestion = true;
      }
      if(!this.isExceedDomainChapter && !this.isExceedTotalQuestion) {
      this.examService.savePractiseExam(data).subscribe(
        res => {
          this.idExam = res;
          this.generateQuestion(this.idExam);
        },
        err => {
          this.error = err.error.message;
        }
      );
     }
    } else if (valid) {
      let idsubject = +this.addDetail.value.subject;
      let size = +this.addDetail.value.numofquestion;
      this.examService.getListQuestionInSubject(idsubject, size).subscribe(
        data => {
           this.listIdInit = data.map(a => {
             return Number(a);
           });
           let subjectName = this.mapSubject.get(+this.idsubject);
           subjectName += '';
           this.code = subjectName
             .split(' ')
             .map(x => x[0])
             .reduce((a, b) => a + b);
           this.code += Math.floor(Math.random() * 10000 + 1);
           this.addDetail.get('creator_id').setValue(this.creator_id);
           this.addDetail.get('code').setValue(this.code);
           const infoPr = new FormData();
           infoPr.append('formdata', JSON.stringify(this.addDetail.value));
           this.examService.savePractiseExam(infoPr).subscribe(
            res => {
              this.examService.updateExamDetail(this.listIdInit, res, -1, null).subscribe(res1 => {
                if (res1['response'] === 'success') {
                  this.router.navigate(['/hometotal/practice']);
                }
              });
            });
      },
      err => {
        this.error = err.error.message;
      });
    } else {
      this.isShow = true;
    }
}
  deleteOption(event, i) {
    // tslint:disable-next-line:no-unused-expression
    const temp = +this.addDetail.value['detailSelect'][i]['number'];
    const chapter = this.addDetail.value['detailSelect'][i]['chapter'];
    const domain = this.addDetail.value['detailSelect'][i]['domain'];
    this.listOpSelect.splice(i, 1);
    this.listOpSelect.splice(i, 1);
    this.listOpSelectCp.splice(i, 1);
    event.removeAt(i);
  }
  onBack() {
    this.location.back();
  }
  onChange(event) {
    this.listNumberQuestionOfDomainAndChapter = [];
    this.idsubject = event.target.value;
    this.defaultDm = '';
    this.defaultCt = '';
    this.domains = [];
    this.chapters = [];
    const arr = <FormArray>this.addDetail.controls.detailSelect;
    arr.controls = [];
    this.listOpSelectCp = [];
    this.listOpSelect = [];
    this.questionService
      .getNumberQuestionOfChapterAndDomain(this.idsubject)
      .subscribe(res => {
        this.listNumberQuestionOfDomainAndChapter = res;
        this.listNumberQuestionOfDomainAndChapter.map(x => {
          this.mapNumberQuestion.set(x[1] + '' + x[2], x[0]);
        });
      });
    this.domainService.getLisDomainBySubject(+this.idsubject).subscribe(res => {
      this.domains = res;
    });
    this.chapterService
      .getLisChapterBySubjectAndParent(+this.idsubject)
      .subscribe(res => {
        this.chapters = res;
      });
  }
  isValid(i: number): boolean {
    if (i != null) {
      if (this.addDetail.value['detailSelect'][i]['number'] >  +this.addDetail.value['detailSelect'][i]['tooltip']
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
  selectArray(event, index) {
    this.isExceedDomainChapter = false;
    this.isExceedTotalQuestion = false;
    const chapter = this.addDetail.get('detailSelect')['controls'][index][
      'controls'
    ]['chapter']['value'];
    const domain = this.addDetail.get('detailSelect')['controls'][index][
      'controls'
    ]['domain']['value'];
    if (!this.checkExistDomainChapter(chapter, domain)) {
      this.listOpSelectCp[index]['chapter'] = chapter;
      this.listOpSelectCp[index]['domain'] = domain;
      if (this.mapNumberQuestion.get(chapter + '' + domain) === undefined) {
        this.addDetail
          .get('detailSelect')
          ['controls'][index]['controls']['number'].patchValue(0);
        this.addDetail
          .get('detailSelect')
          ['controls'][index]['controls']['tooltip'].patchValue(0);
      } else {
        this.addDetail
          .get('detailSelect')
          ['controls'][index]['controls']['tooltip'].patchValue(
            this.mapNumberQuestion.get(chapter + '' + domain)
          );
      }
    } else {
      this.addDetail
        .get('detailSelect')
        ['controls'][index]['controls']['chapter'].patchValue(
          this.listOpSelect[index]['chapter']
        );
      this.addDetail
        .get('detailSelect')
        ['controls'][index]['controls']['domain'].patchValue(
          this.listOpSelect[index]['domain']
        );
      this.addDetail
        .get('detailSelect')
        ['controls'][index]['controls']['tooltip'].patchValue(
          this.listOpSelect[index]['tooltip']
        );
    }
  }
  hideWarning() {
    this.isExceedDomainChapter =  false;
    this.isExceedTotalQuestion = false;
  }
  checkSpaceName(event) {
    const val = event.target.value;
    this.addDetail.get('nameofpractise').setValue(val.replace(/\s\s+/g, ' '));
  }
}
