import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewpostService } from 'src/app/service/newpost/newpost.service';
@Component({
  selector: 'app-tintuc',
  templateUrl: './tintuc.component.html',
  styleUrls: ['./tintuc.component.scss']
})
export class TintucComponent implements OnInit {
  perPage = 5;
  listPagenewsNews: Object[] = [];
  ex: Object;
  constructor(
    private router: Router,
    private newpostService: NewpostService,
  ) { }
  ngOnInit() {
    // Get list pagenews news
    this.newpostService.getListPageNewsNews().subscribe(res => {
      this.listPagenewsNews = res;
    });
  }
  onViews(e) {
    this.router.navigate(['hometotal/pagenews/news/viewnews/' + e]);
  }
  trackByFn(index, item) {
    return item.id;
  }
  onChange(event) {
    this.perPage = event.target.value;
  }
}
