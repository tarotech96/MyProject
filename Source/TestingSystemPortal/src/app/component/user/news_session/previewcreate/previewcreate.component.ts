import { Component, OnInit } from '@angular/core';
import { Newpost } from 'src/app/model/Newpost/Newpost';
import { Location } from '@angular/common';
@Component({
  selector: 'app-previewcreate',
  templateUrl: './previewcreate.component.html',
  styleUrls: ['./previewcreate.component.scss']
})
export class PreviewcreateComponent implements OnInit {
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
  constructor(
    private location: Location
  ) { }

  ngOnInit() {
    if (localStorage.getItem('previewcreate')) {
      this.newpost = JSON.parse(localStorage.getItem('previewcreate'));
      this.tukhoa = this.newpost.tags.split(',');
    }
     }
  onback() {
    this.location.back();
  }
}
