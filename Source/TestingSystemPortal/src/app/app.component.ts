import { Component, OnInit } from '@angular/core';
import { DataService } from './service/dataservice/dataservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Mockproject1Frontend';
  rememberMe: string;
  constructor(private dataService: DataService, private router: Router) {}
  ngOnInit() {
    this.dataService.currentMessage1.subscribe(rememberMe => {
      this.rememberMe = rememberMe;
    });
    const selef = this;
    window.addEventListener('beforeunload', function(e) {
      if (selef.rememberMe === 'false' || selef.rememberMe === 'undefined') {
        this.localStorage.removeItem('access_token');
      }
    });
    const page = window.location.pathname.split('/')[1];
    const checkPath =
      page === 'login' ||
      page === 'register' ||
      page === 'activeregister' ||
      page === 'forgotpass' ||
      page === 'activeforgot';

    const token = window.localStorage.getItem('access_token');
    const item = window.localStorage.getItem('item');
    const role = window.localStorage.getItem('role');
    const permission = window.localStorage.getItem('rolePermissionOrMenu');
    const checklocalStorage =
      token != null || item != null || role != null || permission != null;

    if (checkPath && checklocalStorage) {
      this.router.navigate(['hometotal/home']);
    } else if (checklocalStorage === false) {
      // this.router.navigate(['hometotal/home']); stop here
    }
  }
}
