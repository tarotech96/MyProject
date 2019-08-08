import { Component, OnInit } from '@angular/core';
import { subject } from 'src/app/model/subject/subject';
import { chapter } from 'src/app/model/chapter/chapter';
import { domain } from 'src/app/model/domain/domain';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ChapterService } from 'src/app/service/chapter/chapter.service';
import { SubjectService } from 'src/app/service/subject/subject.service';
import { DomainService } from 'src/app/service/domain/domain.service';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {
  subjects: subject[] = [];
  chapters: Object[] = [];
  domains: Object[] = [];
  // exams: Exam[] = [];
  subject: subject;
  chapter: chapter;
  domain: domain;
  insertForm: FormGroup;
  errorPermission = '';
  showTable: Boolean = true;
  showInsertForm: Boolean = false;
  showUpdateForm: Boolean = false;
  constructor(
    private subjectService: SubjectService,
    private chapterService: ChapterService,
    private domainService: DomainService,
    // private examService: ExamService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.subjectService
      .getListSubject()
      .subscribe(res => (this.subjects = res));
    this.chapterService
      .getListChapter()
      .subscribe(res => (this.chapters = res));
    this.domainService.getListDomain().subscribe(res => (this.domains = res));

    this.insertForm = this.fb.group({
      nameofquestion: ['', [Validators.required]],
      numofquestion: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      chapter: ['', [Validators.required]],
      domain: ['', [Validators.required]],
      chapterper: ['', [Validators.required]],
      domainper: ['', [Validators.required]]
    });
  }

  onSubmitInsert() {
    // const { valid, value } = this.insertForm;
    // if (valid) {
    //   const permission = value;
    //   const formData = new FormData();
    //   formData.append('chapterper', JSON.stringify(permission));
    //   this.examService
    //     .insertPermission(formData)
    //     .pipe(concatMap(_ => this.examService.getListPermission()))
    //     .subscribe(
    //       res => {
    //         this.exams = res;
    //         this.insertForm.reset();
    //       },
    //       err => {
    //         this.errorPermission = 'Controller và action đã tồn tại!';
    //       }
    //     );
  }
}
