import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SlideBars } from 'src/app/model/slidebar/slidebar';
import { SlidebarService } from 'src/app/service/slidebar/slidebar.service';
import { UserService } from 'src/app/service/login/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Viewnewslist } from 'src/app/model/viewnewslist/viewnewslist';
import { ViewnewslistService } from 'src/app/service/viewnewslist/viewnewslist.service';
import { Newpost } from 'src/app/model/Newpost/Newpost';
import { DatatranferService } from 'src/app/service/datatranfer/datatranfer.service';
import { ExamService } from 'src/app/service/exam/exam.service';
import { NewpostService } from 'src/app/service/newpost/newpost.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { Constant } from 'src/app/common/constant';
import { Roles } from 'src/app/model/role/Roles';
import { map, tap } from 'rxjs/operators';

export interface PeriodicElement {
  title: string;
  content: string;
  status: string;
  create_date: string;
  confirm_date: string;
  active_status: boolean;
  confirm_person: string;
  pin_news: boolean;
  tags: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // slidebar   // Mảng ảnh + slogan + title của sildeshow
  slideBarActive: SlideBars[] = [];
  // Thông tin user đăng nhập
  adminName: string;
  tokens: string;
  // Biến để ẩn menu mobile - profile
  menuMobile = 'none';
  showProfilePannel = 'none';
  checkStatusShowProfilePanel = false;
  checkStatusSidebarMobile = false;
  route: string;
  perPage1 = 5;
  view2: Viewnewslist[] = [];
  news2: Viewnewslist;
  newpost: Newpost;
  // Lấy list Pinned news
  listPinnedNews: Object[] = [];
  // Lấy practice homepage list
  listPractice: Object[] = [];
  // Param practice
  URL = '';
  arrayURL = [];
  idExam: number;
  examResultID: Number;
  userID: number;
  notificationVisibilityWhenVaoThi = false;
  notificationVisibilityWhenMaxAttemptExcess = false;
  baseURL = '';
  listRole: Roles[] = [];
  temp = 0;
  max_attemp = 0;
  perPage: number;
  checkAvaiableVaoThi = false;
  searchBoolean = true;
  constructor(
    private slidebarService: SlidebarService,
    private userService: UserService,
    private jwt: JwtHelperService,
    private us: UserService,
    private router: Router,
    private viewlistnews: ViewnewslistService,
    private datatranfer: DatatranferService,
    private examService: ExamService,
    private newpostService: NewpostService,
    private titleService: Title,
    config: NgbCarouselConfig
  ) {
    // Config silder show
    // Ẩn hiện các nút
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
    config.interval = 3000;
    config.wrap = true;
    config.keyboard = true;
    config.pauseOnHover = false;
  }

  ngOnInit() {
    this.baseURL = Constant.BASE_URL;
    this.perPage = 10;
    const url = window.location.href;
    this.arrayURL = url.split('/');
    const len = this.arrayURL.length;
    this.URL = this.arrayURL[len - 2] + '/' + this.arrayURL[len - 1];

    if (localStorage.getItem('role')) {
      const arrayRole = localStorage.getItem('role').split(',');
      const lenght = arrayRole.length;
      if (lenght <= 2) {
        if (arrayRole[0].toLowerCase() === 'User'.toLowerCase()) {
          this.userService.role = false;
        } else {
          this.userService.role = true;
        }
      } else {
        this.userService.role = true;
      }
    }
    this.notificationVisibilityWhenVaoThi = false;
    this.notificationVisibilityWhenMaxAttemptExcess = false;
    this.titleService.setTitle('Testonline System - Home');
    // Get listPINNED NEWS
    this.newpostService
      .getListPinnedNews()
      .subscribe(res => (this.listPinnedNews = res));
    // Get practice homepage list
    this.examService.getListPracticeHomepage().subscribe(res => {
      this.listPractice = res;
    });
    // Slidebar
    this.slidebarService.getListSlideBarActive().subscribe(res => {
      this.slideBarActive = res;
    });
    // Lấy thông tin user đã login
    const token = this.jwt.decodeToken(localStorage.getItem('access_token'));
    this.tokens = token;
    if (token != null) {
      this.us.getUserbyEmail(token['username']).subscribe(res => {
        this.adminName = res.fullname;
        // if (this.URL === 'hometotal/home') {
        //   history.pushState(null, null, location.href);
        //   window.addEventListener('popstate', function() {
        //     history.pushState(null, null, location.href);
        //     // this.location.reload();
        //   });
        // }
      });
    } else {
      this.adminName = '';
    }
  }

  // Hàm click các thẻ tin sẽ chuyển đến viewnews
  onViews(event) {
    this.viewlistnews.getViewnNewsbyId(event).subscribe(res => {
      this.newpost = {
        title: res['title'],
        linkimage: res['linkimage'],
        description: res['description'],
        tags: res['tags'],
        content: res['content'],
        creator: 1
      };
      this.datatranfer.changeMessage2(this.newpost);
      this.router.navigate(['hometotal/pagenews/news/viewnews/' + event]);
    });
    if (!(typeof this.newpost === 'undefined')) {
      this.router.navigate(['hometotal/pagenews/news/']);
    }
  }
  // Xem chi tiet
  clickXemChiTiet(id) {
    this.router.navigate([
      '/hometotal/practicedetail',
      { paramId: id, paramQuahan: false, paramQualuot: false }
    ]);
  }

  // Xử lý sự kiến click vào thi POP UP xuất hiện để confirm
  clickVaoThi(id: number) {
    this.idExam = id;
    if (localStorage.getItem('access_token') === null) {
      this.notificationVisibilityWhenVaoThi = true;
    } else {
      this.checkNumberofResult();
    }
  }

  oncgNotLogin() {
    this.notificationVisibilityWhenMaxAttemptExcess = false;
  }
  oncg(event: boolean) {
    if (event) {
      const token = this.jwt.decodeToken(localStorage.getItem('access_token'));
      if (token != null) {
        const examResult = {
          email: token['username'],
          exam_id: this.idExam
        };
        const formData = new FormData();
        formData.append('examResult', JSON.stringify(examResult));
        this.examService.getStartExam(formData).subscribe(
          res => {
            this.examResultID = res;
            this.router.navigate([
              '/hometotal/testpractice',
              { param1: this.idExam, param2: this.examResultID }
            ]);
          },
          error => {

          }
        );
      } else {
        this.router.navigate([
          '/hometotal/testfreedom',
          { param1: this.idExam }
        ]);
      }
    } else {
      this.notificationVisibilityWhenVaoThi = false;
    }
  }

  // Ham check user login đã làm quá số lượt chưa?
  checkNumberofResult() {
    let temp = 0;
    let max_attemp = 0;
    this.examService
      .getListPracticeResultByUserIDPracticeID(
        this.us.userLogin.id,
        this.idExam
      )
      .subscribe(res => {
        temp = res.length;
        if (res.length !== 0) {
          max_attemp = res[0]['exam']['max_attempt'];
        }
        if (temp === 0) {
          this.notificationVisibilityWhenVaoThi = true;
        } else if (temp < max_attemp) {
          this.notificationVisibilityWhenVaoThi = true;
        } else if (temp === max_attemp) {
          this.notificationVisibilityWhenMaxAttemptExcess = true;
        } else if (temp > max_attemp) {
          this.notificationVisibilityWhenMaxAttemptExcess = true;
        }
      });
  }
  // Phan trang
  trackByFn(index, item) {
    return item.id;
  }
  onChange(event) {
    this.perPage = event.target.value;
  }
  sapXep(param) {
    if (param === 0) {
      this.searchBoolean = !this.searchBoolean;
      if (this.searchBoolean) {
        this.listPractice.sort((obj1, obj2) => obj1[1].localeCompare(obj2[1]));
      } else {
        this.listPractice.sort((obj1, obj2) => obj2[1].localeCompare(obj1[1]));
      }
    } else if (param === 1) {
      this.searchBoolean = !this.searchBoolean;
      if (this.searchBoolean) {
        this.listPractice.sort((obj1, obj2) => obj1[5].localeCompare(obj2[5]));
      } else {
        this.listPractice.sort((obj1, obj2) => obj2[5].localeCompare(obj1[5]));
      }
    }
  }
}
