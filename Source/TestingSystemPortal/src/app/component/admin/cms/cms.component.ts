import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from 'src/app/service/login/user.service';
import { Title } from '@angular/platform-browser';
import { UserserviceService } from 'src/app/service/user-service/userservice.service';
import { MenuService } from 'src/app/service/menu/menu.service';
import { Constant } from 'src/app/common/constant';

@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.scss']
})
@HostListener('window:resize', ['$event'])
export class CmsComponent implements OnInit {
  route: string;
  divTraiWidth = '200px';
  adminButtonSmall = 'none';
  menuMobile = false;
  showProfilePannel = 'none';
  checkStatusShowProfilePanel = false;
  checkStatusSidebar = false;
  checkStatusSidebarMobile = false;
  examDashboardIndicate = '';
  roleIndicate = '';
  userIndicate = '';
  permissionIndicate = '';
  menuIndicate = '';
  roleMenuIndicate = '';
  newsListIndicate = '';
  viewNewsListIndicate = '';
  slidebarIndicate = '';
  mediaIndicate = '';
  userRoleIndicate = '';
  subjectIndicate = '';
  chapterIndicate = '';
  domainIndicate = '';
  groupIndicate = '';
  listQuestionIndicate = '';
  examIndicate = '';
  menuUserLineIndicate = '';
  menuNewsLineIndicate = '';
  menuPortalLineIndicate = '';
  menuTestonlineIndicate = '';
  tabName = '';
  innerWidth: number;
  adminName = '';
  temp = '';
  img = '';
  role: boolean;
  roleArray: string[] = [];
  checkStatusMenuTestonline = true;
  checkStatusMenuTitleUser = false;
  checkStatusMenuTitleNews = false;
  hide = false;
  menuUser: Object[];
  mapShow = new Map();
  menuOne = false;
  nameOne = '';
  baseUrl = '';
  constructor(
    private router: Router,
    location: Location,
    public userService: UserService,
    public us: UserService,
    private titleService: Title,
    private menuService: MenuService,
    public userserviceService: UserserviceService
  ) {
    router.events.subscribe(val => {
      if (location.path() !== '') {
        this.route = location.path();
        if (
          this.route === '/cms/usertestdashboard' ||
          this.route === '/cms/subject' ||
          this.route === '/cms/chapter' ||
          this.route === '/cms/domain' ||
          this.route === '/cms/exam' ||
          this.route === '/cms/dashboard' ||
          this.route === '/cms/listquestion'
        ) {
          this.nameOne = 'Testonline Config';
        } else if (
          this.route === '/cms/viewnewslist' ||
          this.route === '/cms/slidebar' ||
          this.route === '/cms/createnew' ||
          this.route === '/cms/updatenew' ||
          this.route === 'cms/customer'
        ) {
          this.nameOne = 'Website Content';
        } else if (
          this.route === '/cms/usersrole' ||
          this.route === '/cms/role' ||
          this.route === '/cms/user' ||
          this.route === '/cms/permission' ||
          this.route === '/cms/menu' ||
          this.route === '/cms/rolemenu' ||
          this.route === '/cms/rolepermission' ||
          this.route === '/cms/group'
        ) {
          this.nameOne = 'Website Config';
        } else {
          this.nameOne = '';
        }
      }
    });
  }
  ngOnInit() {
    this.baseUrl = Constant.BASE_URL;
    if (localStorage.getItem('role') !== null) {
      const arrayRole = localStorage.getItem('role').split(',');
      for (let index = 0; index < arrayRole.length; index++) {
        if (
          arrayRole.indexOf(arrayRole[index]) !== -1 &&
          arrayRole[index] !== 'User'.toLowerCase()
        ) {
          this.userService.role = true;
        }
      }
    }
    this.titleService.setTitle('Testonline System - CMS');
    this.us.userLogin.fullname = JSON.parse(
      localStorage.getItem('item')
    ).fullname;
    this.us.userLogin.img = JSON.parse(localStorage.getItem('item')).img;
    // check be rong cua so borrowser
    if (innerWidth < 750) {
      this.divTraiWidth = '0px';
      this.adminButtonSmall = 'block';
    } else {
      this.divTraiWidth = '200px';
      this.adminButtonSmall = 'none';
    }
    if (innerWidth > 750 && innerWidth < 1500) {
      this.divTraiWidth = '70px';
      this.adminButtonSmall = 'none';
      this.menuMobile = false;
      this.checkStatusSidebar = true;
    }
    // Kiểm tra role/ Load lai thong tin khi F5
    // Kiểm tra user đã login logout chưa load lai thong tin khi F5
    if (localStorage.getItem('item') != null) {
      this.us.userLogin.id = JSON.parse(localStorage.getItem('item')).id;
      this.us.userLogin.fullname = JSON.parse(
        localStorage.getItem('item')
      ).fullname;
      this.us.userLogin.img = JSON.parse(localStorage.getItem('item')).img;
      this.us.userLogin.email = JSON.parse(localStorage.getItem('item')).email;
      const formData = new FormData();
      const data = {
        email: this.us.userLogin.email
      };
      formData.append('data', JSON.stringify(data));
      this.menuService.getListMenuUser(formData).subscribe(res => {
        this.menuUser = res;
        res.forEach(element => {
          this.mapShow.set(element['parent']['id'], true);
        });
      });
    }
  }
  // Giao dien thay doi theo event reSize borrower
  onResize(event) {
    const innerWidth = event.target.innerWidth;
    if (innerWidth < 750 && this.hide === false) {
      this.divTraiWidth = '0px';
      this.adminButtonSmall = 'block';
    }
    if (innerWidth > 750 && innerWidth < 1500 && this.hide === false) {
      this.divTraiWidth = '70px';
      this.temp = '70px';
      this.adminButtonSmall = 'none';
      this.menuMobile = false;
      this.checkStatusSidebar = true;
    }
    if (innerWidth > 1500 && this.hide === false) {
      this.divTraiWidth = '200px';
      this.temp = '200px';
      this.adminButtonSmall = 'none';
      this.menuMobile = false;
      this.checkStatusSidebar = false;
    }
  }

  showHideProfilePannel() {
    this.checkStatusShowProfilePanel = !this.checkStatusShowProfilePanel;
    if (this.checkStatusShowProfilePanel) {
      this.showProfilePannel = 'block';
    } else {
      this.showProfilePannel = 'none';
    }
  }
  showHideMenuMobile() {
    this.checkStatusSidebarMobile = !this.checkStatusSidebarMobile;
    if (!this.checkStatusSidebarMobile) {
      this.menuMobile = false;
    } else {
      this.menuMobile = true;
    }
  }
  showHideSidebarMenu() {
    this.checkStatusSidebar = !this.checkStatusSidebar;
    if (this.checkStatusSidebar) {
      this.divTraiWidth = '70px';
      this.temp = '70px';
    } else {
      this.divTraiWidth = '200px';
      this.temp = '200px';
    }
  }
  logout() {
    this.userService.logout();
    this.navigateLogout();
  }
  navigateLogout() {
    this.router.navigate(['/hometotal/home']);
  }
  showHideMenuTestonline() {
    this.checkStatusMenuTestonline = !this.checkStatusMenuTestonline;
  }
  showHideMenuUser() {
    this.checkStatusMenuTitleUser = !this.checkStatusMenuTitleUser;
  }
  showHideMenuNews() {
    this.checkStatusMenuTitleNews = !this.checkStatusMenuTitleNews;
  }

  showHideSidebar(e) {
    this.hide = !this.hide;

    if (this.hide) {
      this.divTraiWidth = '0px';
      this.adminButtonSmall = 'block';
    } else {
      if (this.temp !== '200px') {
        this.divTraiWidth = '70px';
        this.checkStatusSidebar = true;
        this.adminButtonSmall = 'none';
        this.menuMobile = false;
        this.checkStatusSidebarMobile = false;
      }
      if (this.temp !== '70px') {
        this.divTraiWidth = '200px';
        this.checkStatusSidebar = false;
        this.adminButtonSmall = 'none';
        this.menuMobile = false;
        this.checkStatusSidebarMobile = false;
      }
    }
  }
  showHideMenu(id: number) {
    this.mapShow.set(id, !this.mapShow.get(id));
  }

  clickedInside($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();
  }
  @HostListener('document:click', ['$event']) clickedOutside($event) {
    if (this.menuMobile === true) {
      this.menuMobile = false;
      this.checkStatusSidebarMobile = false;
    }
  }
}
