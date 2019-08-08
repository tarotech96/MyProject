import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { concatMap } from 'rxjs/operators';
import { Viewnewslist } from 'src/app/model/viewnewslist/viewnewslist';
import { ViewnewslistService } from 'src/app/service/viewnewslist/viewnewslist.service';
import { Title } from '@angular/platform-browser';
import { CheckRolePermissionOrMenu } from 'src/app/common/checkRolePermissionOrMenu';

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
  selector: 'app-viewnewslist',
  templateUrl: './viewnewslist.component.html',
  styleUrls: ['./viewnewslist.component.scss']
})
export class ViewnewslistComponent implements OnInit {
  fix: number;
  keySearch = '';
  perPage: number;
  notification = '';
  notificationVisibility = false;
  notificationVisibilityWhenDelete = false;
  viewNewsList: Viewnewslist[] = [];
  news: Viewnewslist;
  news1: Viewnewslist;
  oldnews: Viewnewslist[] = [];
  typeSort = 0;
  chu: string;
  selectedAction = 'action';
  roleAdmin = false;
  roleMod = false;
  roleContentLeader = false;
  roleContentMember = false;
  constructor(
    private viewlistnews: ViewnewslistService,
    private router: Router,
    private titleService: Title,
    private checkRole: CheckRolePermissionOrMenu
  ) { }
  ngOnInit() {
    this.checkRoles();
    this.notificationVisibility = false;
    this.notificationVisibilityWhenDelete = false;
    this.selectedAction = 'action';
    this.perPage = 15;
    this.titleService.setTitle('Testonline System - List news');
    this.viewlistnews.getViewnNewsList().subscribe(res => {
      this.viewNewsList = res;
    });
  }
  onSearch(event) {
    const key = event.target.value.trim();
    this.viewlistnews.searchNewsCMS(key).subscribe(res => {
      this.viewNewsList = res;
    });
  }
  onSort(index: string) {
    this.typeSort++;
    this.typeSort = this.typeSort % 2;
    const indexProperty = +index;
    this.viewlistnews
      .sortByProperty(indexProperty, this.typeSort, this.keySearch)
      .subscribe(res => {
        this.viewNewsList = res;
      });
  }
  onViews(id) {
    this.router.navigate(['/hometotal/pagenews/news/viewnews/' + id]);
  }
  updateNews(news: Viewnewslist) {
    localStorage.setItem('newsedit', JSON.stringify(news));
    this.router.navigate(['cms/updatenew']);
  }
  onPin(id: string) {
    const active = id.split(',');
    if (active[1] === 'pending') {
      this.notification = 'Bài đăng chưa được duyệt !!!';
      this.notificationVisibility = true;
      setTimeout(() => {
        this.notification = '';
        this.notificationVisibility = false;
      }, 3000);
    } else {
      this.viewlistnews.getViewnNewsList().subscribe(res => {
        this.oldnews = res;
        this.notification = 'Ghim/Gỡ ghim thành công !!!';
        this.notificationVisibility = true;
        setTimeout(() => {
          this.notificationVisibility = false;
          this.notification = '';
        }, 3000);
      });
      this.viewlistnews
        .pinNews(+active[0])
        .pipe(concatMap(_ => this.viewlistnews.getViewnNewsList()))
        .subscribe(res => {
          this.viewNewsList = res;
        });
    }
  }
  trackByFn(index, item) {
    return item.id;
  }
  onChange(event) {
    this.perPage = event.target.value;
  }
  deleteNews(news: Viewnewslist) {
    this.news1 = news;
    if (this.news1.activeStatus === 'false') {
      this.chu = 'Bạn có chắc muốn Active tin này không?';
    } else if (this.news1.activeStatus === 'true') {
      this.chu = 'Bạn có chắc muốn Inactive tin này không?';
    }
    this.notificationVisibilityWhenDelete = true;
  }
  oncg(event: boolean) {
    if (event) {
      if (this.news1.activeStatus === 'false') {
        this.news1.activeStatus = 'true';
        this.news1.pinned = 'false';
      } else if (this.news1.activeStatus === 'true') {
        this.chu = 'Bạn có chắc muốn Inactive không?';
        this.news1.activeStatus = 'false';
        this.news1.pinned = 'false';
        this.news1.upStatus = 'pending';
      }
      this.viewlistnews
        .updateViewnNewsList(+this.news1.id, this.news1)
        .subscribe(res => {
          this.notificationVisibilityWhenDelete = false;
          this.notification = 'Bài đăng đã được xóa/khôi phục !!!';
          this.notificationVisibility = true;
          setTimeout(() => {
            this.notificationVisibility = false;
            this.notification = '';
          }, 3000);
        });
    } else {
      this.notificationVisibilityWhenDelete = false;
    }
  }
  onApprove(news: Viewnewslist) {
    this.news1 = news;
    this.news1.upStatus = 'approve';
    this.viewlistnews
      .updateViewnNewsList(+this.news1.id, this.news1)
      .subscribe(res => {
        this.notificationVisibilityWhenDelete = false;
        this.notification = 'Bài đăng đã được duyệt !!!';
        this.notificationVisibility = true;
        setTimeout(() => {
          this.notificationVisibility = false;
          this.notification = '';
        }, 3000);
      });
  }
  onReject(news: Viewnewslist) {
    this.news1 = news;
    this.news1.upStatus = 'reject';
    this.news1.pinned = 'false';
    this.viewlistnews
      .updateViewnNewsList(+this.news1.id, this.news1)
      .subscribe(res => {
        this.notificationVisibilityWhenDelete = false;
        this.notification = 'Bài đăng đã được reject !!!';
        this.notificationVisibility = true;
        setTimeout(() => {
          this.notificationVisibility = false;
          this.notification = '';
        }, 3000);
      });
  }
  onChangeAction(event, news: Viewnewslist) {
    this.selectedAction = '1';
    const type = event.target.value;
    if (type === 'view') {
      this.onViews(news.id);
    } else if (type === 'edit') {
      this.updateNews(news);
    } else if (type === 'pin') {
      this.onPin(news.id);
    } else if (type === 'approve') {
      this.onApprove(news);
    } else if (type === 'reject') {
      this.onReject(news);
    } else if (type === 'delete') {
      this.deleteNews(news);
    }
  }
  focusOutFunction() {
    this.selectedAction = 'action';
  }

  // Check role
  checkRoles() {
    const listRole = localStorage.getItem('role').split(',');
    for (let i = 0; i < listRole.length; i++) {
      if (listRole[i].toLowerCase().replace(/\s\s+/g, ' ') === 'admin') {
        return (this.roleAdmin = true);
      } else if (
        listRole[i].toLowerCase().replace(/\s\s+/g, ' ') === 'contentleader'
      ) {
        return (this.roleContentLeader = true);
      } else if (
        listRole[i].toLowerCase().replace(/\s\s+/g, ' ') === 'contentmember'
      ) {
        return (this.roleContentMember = true);
      } else if (listRole[i].toLowerCase().replace(/\s\s+/g, ' ') === 'mod') {
        return (this.roleMod = true);
      }
    }
  }
  checkRolePerMission(controllerAnAction): boolean {
    return this.checkRole.checkRole(controllerAnAction);
  }
  xoaSearch() {
    this.keySearch = '';
    this.viewlistnews.getViewnNewsList().subscribe(res => {
      this.viewNewsList = res;
    });
  }
}
