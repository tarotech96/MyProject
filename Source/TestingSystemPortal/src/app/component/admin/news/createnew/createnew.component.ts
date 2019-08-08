import { Component, OnInit, HostListener } from '@angular/core';
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
import { NewpostService } from 'src/app/service/newpost/newpost.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'src/app/service/login/user.service';
import { Title } from '@angular/platform-browser';
import { CanComponentDeactive } from 'src/app/service/exam-guard/confirmation/confirmation.guard';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { CheckRolePermissionOrMenu } from 'src/app/common/checkRolePermissionOrMenu';

export function validatorEmptyInput(
  control: AbstractControl
): { [key: string]: boolean } | null {
  // control.get('title').setValue(control.value.trim());
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { whitespace: true };
}
@Component({
  selector: 'app-createnew',
  templateUrl: './createnew.component.html',
  styleUrls: ['./createnew.component.scss']
})
export class CreatenewComponent implements OnInit, CanComponentDeactive {
  news: Viewnewslist;
  tags: Tag[] = [];
  insertnew: FormGroup;
  title = 'Editor';
  htmlContent = '';
  public url = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  noti = '';
  sh = '';
  hd = 'hidden';
  adminName = '';
  userID: number;
  notinaiyo = '';
  route: string;
  bientam: boolean;
  notificationVisibilityWhenDelete = '';
  isDirty: boolean;
  constructor(
    private fb: FormBuilder,
    private tagservice: TagService,
    private newpost: NewpostService,
    private router: Router,
    private jwt: JwtHelperService,
    private us: UserService,
    private titleService: Title,
    private checkRole: CheckRolePermissionOrMenu
  ) {}

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '36rem',
    minHeight: '5rem',
    placeholder: 'Enter content here...',
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
    this.notificationVisibilityWhenDelete = 'none';
    this.bientam = false;
    this.titleService.setTitle('Testonline System - Create news');
    // lay thong tin user da dang nhap
    const token = this.jwt.decodeToken(localStorage.getItem('access_token'));
    this.us.getUserbyEmail(token['username']).subscribe(res => {
      this.adminName = res.fullname;
      this.userID = res.id;
    });
    this.tagservice.getTags().subscribe(res => (this.tags = res));
    this.insertnew = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.maxLength(200),
          Validators.minLength(50),
          validatorEmptyInput
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
          Validators.required,
          Validators.maxLength(10000),
          Validators.minLength(3000)
        ]
      ],
      creator: ['']
    });
    if (localStorage.getItem('previewcreate')) {
      const dulieu = JSON.parse(localStorage.getItem('previewcreate'));
      dulieu.tags = dulieu.tags.split(',');
      this.insertnew.patchValue(dulieu);
    }
  }
  onSubmit() {
    const { valid, value } = this.insertnew;
    if (valid) {
      value.tags = value.tags.toString();
      value.creator = this.userID;
      this.newpost.addNewpost(value).subscribe(
        () => {
          this.noti = 'Tạo bài viết thành công !!!';
          this.hd = 'visible';
          this.sh = 'show';
          setTimeout(() => {
            this.hd = 'hidden';
            this.noti = '';
            this.router.navigate(['/cms/viewnewslist']);
          }, 1000);
          localStorage.removeItem('previewcreate');
          this.insertnew.reset();
          this.bientam = true;
        },
        err => {
          this.noti = 'Không thành công, hãy kiểm tra lại validate các ô !!!';
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
      value.tags = value.tags.toString();
      localStorage.setItem('previewcreate', JSON.stringify(value));
      this.router.navigate(['/hometotal/pagenews/previewcreate']);
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

  checkRolePermission(controllerAnAction): boolean {
    return this.checkRole.checkRole(controllerAnAction);
  }
  onCancel() {
    localStorage.removeItem('previewcreate');
    // this.insertnew.reset();
    this.router.navigate(['/cms/viewnewslist']);
  }
  checkSpaceTitle(event) {
    const val = event.target.value;
    this.insertnew.get('title').setValue(val.replace(/\s\s+/g, ' '));
  }
  checkSpaceDes(event) {
    const val = event.target.value;
    this.insertnew.get('description').setValue(val.replace(/\s\s+/g, ' '));
  }
  getContent() {
    return this.insertnew.get('content').value;
  }

  @HostListener('window:beforeunload', ['$event'])
  canDeactivate(): Observable<boolean> | boolean {
    if (this.insertnew.valid) {
      return true;
    }
    if (this.bientam) {
      return true;
    }
    const confirm = window.confirm('Data will be lost');
    if (confirm) {
      this.isDirty = true;
    } else {
      this.isDirty = false;
    }
    return this.isDirty;
  }
  oncg(event: boolean) {
    if (event) {
      this.router.navigate(['/cms/createnews']);
    } else {
      this.notificationVisibilityWhenDelete = 'none';
    }
  }
}
