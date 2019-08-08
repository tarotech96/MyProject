import {
  Component,
  OnInit,
  HostListener,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/login/user.service';
import { Location } from '@angular/common';
import { UserserviceService } from 'src/app/service/user-service/userservice.service';
import { Constant } from 'src/app/common/constant';

@Component({
  selector: 'app-hometotal',
  templateUrl: './hometotal.component.html',
  styleUrls: ['./hometotal.component.scss']
})
export class HometotalComponent implements OnInit {
  @Output()
  public clickOutside = new EventEmitter();
  // Thông tin user đăng nhập
  adminName: string;
  email: string;
  tokens: string;
  // Biến để ẩn menu mobile - profile
  menuMobile = 'none';
  showProfilePannel = 'none';
  checkStatusShowProfilePanel = false;
  checkStatusSidebarMobile = false;
  // Biến để ẩn menu mobile - profile
  trangChu = '';
  baiThi = '';
  thucHanh = '';
  lichSu = '';
  lienHe = '';
  tinTuc = '';
  profileUserIndicate = '';
  route: string;
  listExam: Object[] = [];
  listExamAssign: Object[] = [];
  role: boolean;
  roleArray: string[] = [];
  sizeExamAssign = 0;
  img = '';
  userID: number;
  arrowdowns = true;
  navbarbg = 'rgba(0, 0, 0, 0.2)';
  baseURL = '';
  constructor(
    public userService: UserService,
    public us: UserService,
    private router: Router,
    location: Location,
    public userserviceService: UserserviceService
  ) {
    // Bắt sự kiện router đánh dấu nổi bật
    router.events.subscribe(val => {
      if (location.path() !== '') {
        this.route = location.path();
        if (this.route === '/hometotal/home') {
          this.trangChu = '#0984e3';
          this.arrowdowns = true;
        } else {
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
          this.trangChu = 'white';
          this.arrowdowns = false;
        }
        if (this.route === '/hometotal/userexam') {
          this.baiThi = '#0984e3';
        } else {
          this.baiThi = 'white';
        }
        if (this.route === '/hometotal/practice') {
          this.thucHanh = '#0984e3';
        } else {
          this.thucHanh = 'white';
        }
        if (this.route === '/hometotal/examhistory') {
          this.lichSu = '#0984e3';
        } else {
          this.lichSu = 'white';
        }
        if (this.route === '/hometotal/contactus') {
          this.lienHe = '#0984e3';
        } else {
          this.lienHe = 'white';
        }
        if (this.route === '/hometotal/profile-user') {
          this.profileUserIndicate = '#0984e3';
        } else {
          this.profileUserIndicate = 'white';
        }
        const active = this.route.split('/news');
        if (active[0] === '/hometotal/pagenews') {
          this.tinTuc = '#0984e3';
        } else {
          this.tinTuc = 'white';
        }
      }
    });
  }

  ngOnInit() {
    this.baseURL = Constant.BASE_URL;
    if (localStorage.getItem('role') != null) {
      const arrayRole = localStorage.getItem('role').split(',');
      const lenght = arrayRole.length;
      if (lenght <= 2) {
        if (arrayRole[0].toLowerCase() === 'User'.toLowerCase()) {
          this.us.role = false;
        } else {
          this.us.role = true;
        }
      } else {
        this.us.role = true;
      }
    }

    if (this.route === '/hometotal/home') {
      this.arrowdowns = true;
    } else {
      this.arrowdowns = false;
    }
    // Kiểm tra role/ Load lai thong tin khi F5
    // if (localStorage.getItem('role') != null) {
    //   const arrayRole = localStorage.getItem('role').split(',');
    //   for (let index = 0; index < arrayRole.length; index++) {
    //     if (arrayRole[index].toLowerCase() === 'admin') {
    //       this.userService.role = true;
    //       break;
    //     }
    //   }
    // }
    // Kiểm tra user đã login logout chưa load lai thong tin khi F5
    if (localStorage.getItem('item') != null) {
      this.us.userLogin.id = JSON.parse(localStorage.getItem('item')).id;
      this.us.userLogin.fullname = JSON.parse(
        localStorage.getItem('item')
      ).fullname;
      this.us.userLogin.img = JSON.parse(localStorage.getItem('item')).img;
      this.us.userLogin.email = JSON.parse(localStorage.getItem('item')).email;
    }
    // Load lai so bai thi cua User khi F5
    this.userserviceService
      .getListExamOfUserASCBYEndDate(this.us.userLogin.id)
      .subscribe(ress => {
        this.userserviceService.listExamASC = ress;
        this.userserviceService.sizeExamAssign = ress.length;
      });
  }
  // Bắt sự kiện thay đổi kích thước trình duyệt => fixed lỗi ẩn hiện menu moblie và profile
  onResize(event) {
    this.menuMobile = 'none';
    this.checkStatusSidebarMobile = false;
    if (innerWidth < 1200 && this.checkStatusShowProfilePanel === true) {
      this.checkStatusShowProfilePanel = false;
      this.checkStatusSidebarMobile = false;
    }

    if (innerWidth > 1200) {
      if (
        this.checkStatusShowProfilePanel === false &&
        this.checkStatusSidebarMobile === false
      ) {
        this.checkStatusShowProfilePanel = true;
        this.checkStatusSidebarMobile = true;
      }
    }
  }
  // Bắt sự kiện thay đổi kích thước trình duyệt => fixed lỗi ẩn hiện menu moblie và profile

  // Xử lý sự kiện logout
  logout() {
    this.userService.logout();
    this.router.navigate(['/hometotal/home']);
  }

  // Hàm click ẩn hiện menu profile
  showHideProfilePannel() {
    this.checkStatusShowProfilePanel = !this.checkStatusShowProfilePanel;
    if (this.checkStatusShowProfilePanel) {
      this.showProfilePannel = 'block';
    } else {
      this.showProfilePannel = 'none';
    }
  }

  // Hàm click ẩn hiện menu mobile
  showHideMenuMobile() {
    this.checkStatusSidebarMobile = !this.checkStatusSidebarMobile;
    if (!this.checkStatusSidebarMobile) {
      this.menuMobile = 'none';
    } else {
      this.menuMobile = 'block';
    }
  }

  // Click scroll xuống thi thử
  clickScrollToThiThu() {
    window.scrollBy(0, 600);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    if (this.route === '/hometotal/home') {
      if (
        document.body.scrollTop > 200 ||
        document.documentElement.scrollTop > 200
      ) {
        this.arrowdowns = false;
      } else {
        this.arrowdowns = true;
      }
    } else {
      this.arrowdowns = false;
    }
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      this.navbarbg = '#36393d';
    } else {
      this.navbarbg = 'rgba(0, 0, 0, 0.2)';
    }
  }

  clickedInside($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();
  }
  @HostListener('document:click', ['$event']) clickedOutside($event) {
    if (this.menuMobile === 'block') {
      this.menuMobile = 'none';
      this.checkStatusSidebarMobile = false;
    }
  }
}
