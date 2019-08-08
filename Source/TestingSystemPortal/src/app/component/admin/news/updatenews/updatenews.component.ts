import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {
  FormBuilder,
  Validators,
  FormGroup,
  AbstractControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { Viewnewslist } from 'src/app/model/viewnewslist/viewnewslist';
import { Tag } from 'src/app/model/Tag/Tag';
import { TagService } from 'src/app/service/tag/tag.service';
import { ViewnewslistService } from 'src/app/service/viewnewslist/viewnewslist.service';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/service/login/user.service';

export function validatorEmptyInput(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { whitespace: true };
}
@Component({
  selector: 'app-updatenews',
  templateUrl: './updatenews.component.html',
  styleUrls: ['./updatenews.component.scss']
})
export class UpdatenewsComponent implements OnInit {
  public url = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  news: Viewnewslist;
  idnews: number;
  tags: Tag[] = [];
  tags1: Tag[] = [];
  insertnew: FormGroup;
  insertnewchange: FormGroup;
  title = 'Editor';
  noti = '';
  sh = '';
  hd = 'hidden';
  hdd = 'hidden';
  t1h = 'none';
  t2h = 'flex';
  t3h = 'visible';
  t4h = 'hidden';
  ss = false;
  bientam: boolean;
  route: string;
  tagsss: Tag[] = [];
  titless = '';
  dessss = '';
  con = '';
  imgss = '';
  dulieu: any;
  isDirty: boolean;
  constructor(
    private fb: FormBuilder,
    private tagservice: TagService,
    private router: Router,
    private viewlistnews: ViewnewslistService,
    private titleService: Title,
    public us: UserService
  ) {}

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '36rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    customClasses: [
      {
        name: 'quote',
        class: 'quote'
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1'
      }
    ]
  };

  ngOnInit(): void {
    this.isDirty = false;
    this.bientam = false;
    this.titleService.setTitle('Testonline System - Update news');
    this.insertnew = this.fb.group({
      title: [
        '',
        [
          validatorEmptyInput,
          Validators.required,
          Validators.maxLength(200),
          Validators.minLength(50)
        ]
      ],
      linkimage: ['', [Validators.required, Validators.pattern(this.url)]],
      description: [
        '',
        [
          validatorEmptyInput,
          Validators.required,
          Validators.maxLength(555),
          Validators.minLength(100)
        ]
      ],
      tags: ['', Validators.required],
      content: [
        '',
        [
          validatorEmptyInput,
          Validators.required,
          Validators.maxLength(10000),
          Validators.minLength(3000)
        ]
      ],
      creator: [''],
      upStatus: ['pending'],
      activeStatus: ['1'],
      pinned: ['false']
    });
    this.tagservice.getTags().subscribe(res => (this.tags = res));
    if (localStorage.getItem('newsedit')) {
      this.dulieu = JSON.parse(localStorage.getItem('newsedit'));
      const tem = JSON.parse(localStorage.getItem('newsedit'));
      if (tem['tags'] instanceof Array) {
        this.dulieu.tags = tem['tags'];
      } else {
        this.dulieu.tags = tem['tags'].split(',');
      }
      this.titless = this.dulieu.title;
      this.dessss = this.dulieu.description;
      this.con = this.dulieu.content;
      this.imgss = this.dulieu.linkimage;
      this.idnews = +this.dulieu.id;
      this.insertnew.patchValue(this.dulieu);
    }
  }
  getContent() {
    return this.insertnew.get('content').value;
  }
  onUpdateNews() {
    const { valid, value } = this.insertnew;
    if (valid) {
      this.bientam = true;
      value.tags = value.tags.toString();
      value.creator = this.us.userLogin.id;
      value.upStatus = 'pending';
      value.pinned = 'false';
      this.viewlistnews.updateViewnNewsList(this.idnews, value).subscribe(
        () => {
          this.noti = 'Cập nhật thành công !!!';
          this.hd = 'visible';
          this.sh = 'show';
          setTimeout(() => {
            this.hd = 'hidden';
            this.noti = '';
            this.router.navigate(['cms/viewnewslist']);
          }, 1000);
          localStorage.removeItem('preview');
          this.insertnew.reset();
          this.bientam = true;
        },
        err => {
          this.noti = 'Cập nhật thất bại, hãy kiểm tra lại các ô dữ liệu !!!';
          this.hd = 'visible';
          this.sh = 'show';
          setTimeout(() => {
            this.hd = 'hidden';
            this.noti = '';
          }, 1000);
        }
      );
    } else {
      this.noti = 'Không thành công, hãy kiểm tra valid !!!';
      this.hd = 'visible';
      this.sh = 'show';
      setTimeout(() => {
        this.hd = 'hidden';
        this.noti = '';
      }, 2000);
    }
  }
  onPreview() {
    const { valid, value } = this.insertnew;
    if (valid) {
      this.bientam = true;
      value.tags = value.tags.toString();
      localStorage.setItem('newsedit', JSON.stringify(this.news));
      this.router.navigate(['/hometotal/pagenews/preview']);
    } else {
      this.noti = 'Không thành công, hãy kiểm tra valid !!!';
      this.hd = 'visible';
      this.sh = 'show';
      setTimeout(() => {
        this.hd = 'hidden';
        this.noti = '';
      }, 2000);
    }
  }
  onCancel() {
    localStorage.removeItem('preview');
    // this.insertnew.reset();
    this.router.navigate(['cms/viewnewslist']);
  }

  checkSpaceTitle(event) {
    const val = event.target.value;
    this.insertnew.get('title').setValue(val.replace(/\s\s+/g, ' '));
    this.titless = val.replace(/\s\s+/g, ' ');
    this.dulieu.title = this.titless;
  }
  checkSpaceImg(event) {
    const val = event.target.value;
    this.imgss = val;
    this.dulieu.linkimage = this.imgss;
  }
  checkSpaceDes(event) {
    const val = event.target.value;
    this.insertnew.get('description').setValue(val.replace(/\s\s+/g, ' '));
    this.dessss = val.replace(/\s\s+/g, ' ');
    this.dulieu.description = this.dessss;
  }
  checkSpaceContent(event) {
    // this.insertnew.get('content').setValue(event.replace(/\s\s+/g, ' '));
    this.con = event.replace(/\s\s+/g, ' ');
    this.dulieu.content = this.con;
  }
  tagdathaydoi() {
    this.dulieu.tags = this.insertnew.value.tags;
    this.news.tags = this.dulieu.tags.toString();
    localStorage.setItem('newsedit', JSON.stringify(this.news));
    this.insertnew.patchValue(this.dulieu);
  }
  @HostListener('window:beforeunload', ['$event'])
  canDeactivate(): Observable<boolean> | boolean {
    if (this.bientam) {
      localStorage.setItem('newsedit', JSON.stringify(this.dulieu));
      this.insertnew.patchValue(this.dulieu);
      return true;
    }
    const confirm = window.confirm('Data will be lost');
    if (confirm) {
      localStorage.setItem('newsedit', JSON.stringify(this.dulieu));
      this.insertnew.patchValue(this.dulieu);
      this.isDirty = true;
    } else {
      localStorage.setItem('newsedit', JSON.stringify(this.dulieu));
      this.insertnew.patchValue(this.dulieu);
      this.isDirty = false;
    }
    localStorage.setItem('newsedit', JSON.stringify(this.dulieu));
    this.insertnew.patchValue(this.dulieu);
    return this.isDirty;
  }
}
