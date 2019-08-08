import { Component, OnInit } from '@angular/core';
import { Newpost } from 'src/app/model/Newpost/Newpost';
import { Location } from '@angular/common';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  tukhoa = [];
  adminName: string;
  tokens: string;
  tindate = new Date();
  newpost: Newpost = {
    title: '',
    linkimage: '',
    description: '',
    tags: '',
    content: '',
    creator: 1
  };
  constructor(private location: Location) {}

  ngOnInit() {
    if (localStorage.getItem('newsedit')) {
      this.newpost = JSON.parse(localStorage.getItem('newsedit'));
      // this.tukhoa = this.newpost.tags.split(',');
      const tem = JSON.parse(localStorage.getItem('newsedit'));
      if (tem['tags'] instanceof Array) {
        this.tukhoa = tem['tags'];
      } else {
        this.tukhoa = tem['tags'].split(',');
      }
    }
  }
  onback() {
    this.location.back();
  }
}
