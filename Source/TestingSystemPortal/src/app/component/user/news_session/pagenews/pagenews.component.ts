import { Component, OnInit } from '@angular/core';
import { Viewnewslist } from 'src/app/model/viewnewslist/viewnewslist';
import { ViewnewslistService } from 'src/app/service/viewnewslist/viewnewslist.service';
import { UserService } from 'src/app/service/login/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatatranferService } from 'src/app/service/datatranfer/datatranfer.service';
import { NewpostService } from 'src/app/service/newpost/newpost.service';
import { Newpost } from 'src/app/model/Newpost/Newpost';
import { Title } from '@angular/platform-browser';

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
  selector: 'app-pagenews',
  templateUrl: './pagenews.component.html',
  styleUrls: ['./pagenews.component.scss']
})
export class PagenewsComponent implements OnInit {
  route: string;
  tokens: string;
  keySearch = '';
  perPage1 = 5;
  view2: Viewnewslist[] = [];
  news2: Viewnewslist;
  showProfilePannel = 'none';
  checkStatusShowProfilePanel = false;
  menuMobile = 'none';
  checkStatusSidebarMobile = false;
  newpost: Newpost;
  listPinnedNews: Object[] = [];
  constructor(
    private viewlistnews: ViewnewslistService,
    private userService: UserService,
    private router: Router,
    private datatranfer: DatatranferService,
    public activatedRouteService: ActivatedRoute,
    private newpostService: NewpostService,
    private titleService: Title
  ) { }
  ngOnInit() {
    this.titleService.setTitle('Testonline System - News');
    // Get listPINNED NEWS
    this.newpostService
      .getListPinnedNews()
      .subscribe(res => (this.listPinnedNews = res));
    this.viewlistnews.getViewnNewsList().subscribe(res => {
      this.view2 = res;
    });
  }

  onSearch(event) {
    const key = event.target.value.trim();
    this.viewlistnews.searchNews(key).subscribe(res => {
      this.view2 = res;
    });
  }
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
  logout() {
    this.userService.logout();
    this.router.navigate(['/pagenews/tintuc']);
    location.reload();
  }
  trackByFn1(index, item) {
    return item.id;
  }
  onChange1(event) {
    this.perPage1 = event.target.value;
  }
  xoaSearch() {
    this.keySearch = '';
  }
}
