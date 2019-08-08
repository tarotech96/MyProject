import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comemts } from 'src/app/model/comment/coment';
import { Viewnewslist } from 'src/app/model/viewnewslist/viewnewslist';
import { ViewnewslistService } from 'src/app/service/viewnewslist/viewnewslist.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-viewnews',
  templateUrl: './viewnews.component.html',
  styleUrls: ['./viewnews.component.scss']
})
export class ViewnewsComponent implements OnInit {
  tukhoa = [];
  adminName: string;
  tokens: string;
  checkBlur = 0;
  checkcCmt = 0;
  editMode = false;
  idCmt: string;
  textCmt: string;
  contentCmt: string;
  idNew: number;
  cmt: Comemts = {
    id: '',
    content: '',
    news: ''
  };
  newpost: Viewnewslist = {
    confirmDate: new Date(),
    pinned: '',
    creator: '',
    activeStatus: '',
    description: '',
    id: '',
    upStatus: '',
    title: '',
    content: '',
    createDate: new Date(),
    confirmLeader: '',
    linkimage: '',
    tags: '',
    editStatus: '',
    deleteStatus: ''
  };
  comen: Comemts[] = [];
  constructor(
    private route: ActivatedRoute,
    private service: ViewnewslistService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    const idNews = this.route.snapshot.params['id'];
    this.idNew = idNews;
    this.service.getViewnNewsbyId(idNews).subscribe(
      res => {
        this.newpost = res;
        this.tukhoa = this.newpost.tags.split(',');
      },
      err => {
        this.router.navigate(['pagenews/tintuc']);
      }
    );
  }
  // Su kien an nut back
  onback() {
    this.location.back();
  }
}
