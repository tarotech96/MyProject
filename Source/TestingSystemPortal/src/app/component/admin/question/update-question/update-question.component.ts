import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ElementRef
} from '@angular/core';
import { Question } from 'src/app/model/question_model/question';
import { Router, ActivatedRoute } from '@angular/router';
import { UploadfileServiceService } from 'src/app/service/questionservice/uploadfile-service.service';
import {
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
  FormGroup,
  AbstractControl
} from '@angular/forms';
import { concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SubjectService } from 'src/app/service/subject/subject.service';
import { ChapterService } from 'src/app/service/chapter/chapter.service';
import { DomainService } from 'src/app/service/domain/domain.service';
import { Title } from '@angular/platform-browser';
import { Constant } from 'src/app/common/constant';
function validatorEmptyInput(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { whitespace: true };
}
function imageExtensionValidator(whiteListImageExtension: Array<string>) {
  return function(input: FormControl) {
    if (input.value) {
      const arr = input.value.split('.');
      return whiteListImageExtension.includes(arr[arr.length - 1])
        ? null
        : { extension: true };
    }
    return null;
  };
}
@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.scss']
})
export class UpdateQuestionComponent implements OnInit {
  updateForm: FormGroup;
  id: any;
  subject: string;
  temp: number;
  selectedFiles: FileList;
  currentFileUpload: File;
  listContentQuestion = [];
  listIsCorrect = [];
  repsonseAnwer = [];
  mapSubject: { [key: number]: string } = {};
  response: any;
  imageBefore: any;
  baseURL: string;
  showMedia: boolean;
  chapter: string;
  question: Question;
  idQuestion: number;
  code: string;
  imageSrc: any;
  listAnswer: Object[];
  @ViewChild('dynamic', { read: ViewContainerRef })
  viewContainerRef: ViewContainerRef;
  subjects = [];
  chapters = [];
  domains = [];
  disabled = false;
  formSubmitAttempt: boolean;
  haveCorrect: boolean;
  file: any;
  constructor(
    private router: Router,
    private uploadService: UploadfileServiceService,
    private activeroute: ActivatedRoute,
    private fb: FormBuilder,
    private chapterService: ChapterService,
    private domainService: DomainService,
    private subjectService: SubjectService,
    private elem: ElementRef,
    private titleService: Title
  ) {}
  ngOnInit() {
    this.baseURL = Constant.BASE_URL;
    this.haveCorrect = true;
    this.showMedia = true;
    this.formSubmitAttempt = false;
    this.titleService.setTitle('Testonline System - Update question');
    this.idQuestion = this.activeroute.snapshot.params['id'];
    this.updateForm = this.fb.group({
      title: [
        '',
        [Validators.required, Validators.maxLength(250), validatorEmptyInput]
      ],
      content: [
        '',
        [Validators.required, Validators.maxLength(1000), validatorEmptyInput]
      ],
      explain: [
        '',
        [Validators.maxLength(1000)]
      ],
      time: ['', [Validators.required]],
      media: [
        '',
        [imageExtensionValidator(['PNG', 'png', 'jpg', 'mp4', ',mp3'])]
      ],
      media1: [''],
      subjects: ['', [Validators.required]],
      chapters: ['', [Validators.required]],
      domains: ['', [Validators.required]],
      answers: this.fb.array([]),
      Anwer: [''],
      id: ['']
    });
    for (let index = 0; index < this.subjects.length; index++) {
      this.mapSubject[this.subjects[index]['id']] = this.subjects[index][
        'name'
      ];
    }
    const data = this.uploadService.getQuestion(this.idQuestion);
    const exaple = data.pipe(concatMap(val => of(val)));
    exaple.subscribe(res => {
      this.listAnswer = res['answer_Options'];
      this.listAnswer.forEach(item => {
        this.listAnswers.push(this.createItem(item));
      });
    });
    exaple.subscribe(res => {
      this.imageBefore = res['media'];
      this.updateForm.patchValue({
        title: res['title'],
        content: res['content'],
        explain: res['explantion'],
        media1: res['media'],
        code: res['code'],
        time: res['time'],
        subjects: res['subject']['id']
      });
      this.chapterService
        .getLisChapterBySubject(res['subject']['id'])
        .subscribe(rest => (this.chapters = rest));
      this.updateForm.get('chapters').setValue(res['chapter']['id']);
      this.domainService
        .getLisDomainBySubject(res['subject']['id'])
        .subscribe(rest => (this.domains = rest));
      this.updateForm.get('domains').setValue(res['domain']['id']);
    });
    this.subjectService.getListSubject().subscribe(res => {
      this.subjects = res;
      for (let index = 0; index < this.subjects.length; index++) {
        this.mapSubject[this.subjects[index]['id']] = this.subjects[index][
          'name'
        ];
      }
    });
  }
  ondelete(event, index) {
    this.listAnswers.removeAt(index);
  }
  onclick() {
    this.listAnswers.push(this.createItem());
  }
  get listAnswers(): FormArray {
    return <FormArray>this.updateForm.controls.answers;
  }
  selectFile(event) {
    this.showMedia = false;
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => (this.imageSrc = reader.result);
      reader.readAsDataURL(this.file);
    } else {
      this.imageSrc = '';
    }
    this.selectedFiles = event.target.files;
  }
  get answers(): FormArray {
    return <FormArray>this.updateForm.controls.answer;
  }
  get correct(): FormArray {
    return <FormArray>this.updateForm.controls.correctanswer;
  }
  onChange(event) {
    this.subject = event.target.value;
    this.disabled = true;
    this.domainService.getLisDomainBySubject(+this.subject).subscribe(res => {
      this.domains = res;
    });
    this.chapterService.getLisChapterBySubject(+this.subject).subscribe(res => {
      this.chapters = res;
    });
  }
  onUpdate() {
    this.formSubmitAttempt = true;
    this.checkIsHaveCorrect();
    this.repsonseAnwer = [];
    this.listIsCorrect = [];
    this.listContentQuestion = [];
    let subjectName = this.mapSubject[this.subject];
    subjectName += '';
    this.code = subjectName
      .split(' ')
      .map(x => x[0])
      .reduce((a, b) => a + b);
    this.code += Math.floor(Math.random() * 10000 + 1);
    if (this.selectedFiles !== undefined) {
      this.currentFileUpload = this.selectedFiles.item(0);
    }
    for (let i = 0; i < this.listAnswers.length; i++) {
      this.listContentQuestion.push(
        this.listAnswers['controls'][i]['value']['contentanswer']
      );
      this.listIsCorrect.push(
        this.listAnswers['controls'][i]['value']['correctanswer']
      );
    }
    for (let index = 0; index < this.listContentQuestion.length; index++) {
      if (
        this.listIsCorrect[index] !== true &&
        this.listIsCorrect[index] !== false
      ) {
        let cr = true;
        if (this.listIsCorrect[index] === '') {
          cr = false;
        }
        this.repsonseAnwer.push({
          content: this.listContentQuestion[index],
          isCr: cr
        });
      } else {
        this.repsonseAnwer.push({
          content: this.listContentQuestion[index],
          isCr: this.listIsCorrect[index]
        });
      }
    }
    const { valid, value } = this.updateForm;
    this.checkIsHaveCorrect();
    if (valid && this.haveCorrect) {
      this.updateForm.get('Anwer').setValue(this.repsonseAnwer);
      this.updateForm.get('id').setValue(this.idQuestion);
      this.response = this.updateForm.value;
      const data = new FormData();
      data.append('formdata', JSON.stringify(this.updateForm.value));
      if (this.currentFileUpload !== undefined) {
        data.append('file', this.currentFileUpload);
      }
      this.uploadService.updateQuestion(data).subscribe(res => {
        if (res['response'] === 'success') {
          this.router.navigate(['/cms/listquestion']);
        }
      });
    } else {
    }
  }
  onClickCloseForm() {
    this.router.navigate(['/cms/listquestion']);
  }
  createItem(item?: any): FormGroup {
    if (!item) {
      return this.fb.group({
        contentanswer: ['', [Validators.required, Validators.maxLength(1000)]],
        correctanswer: ['']
      });
    } else {
      return this.fb.group({
        contentanswer: [
          item['content'],
          [Validators.required, Validators.maxLength(1000)]
        ],
        correctanswer: [item['correct']]
      });
    }
  }
  checkIsHaveCorrect() {
    let ok = 0;
    for (let i = 0; i < this.listAnswers.length; i++) {
      if (this.listAnswers['controls'][i]['value']['correctanswer'] === true) {
        ok = 1;
      }
    }
    if (!ok) {
      this.haveCorrect = false;
    } else {
      this.haveCorrect = true;
    }
  }
  isValid(field: string, i?: number) {
    if (i != null) {
      const f = this.updateForm
        .get('answers')
        .get(i.toString())
        .get(field);
      return (f.errors && f.touched) || (f.errors && this.formSubmitAttempt);
    }
    if (field === 'correctanswer') {
      this.checkIsHaveCorrect();
      // tslint:disable-next-line:whitespace
      if (this.formSubmitAttempt === true && this.haveCorrect === false) {
        return false;
      } else {
        return true;
      }
    }
  }
}
