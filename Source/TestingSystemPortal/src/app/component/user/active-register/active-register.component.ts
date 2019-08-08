import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/login/user.service';

@Component({
  selector: 'app-active-register',
  templateUrl: './active-register.component.html',
  styleUrls: ['./active-register.component.scss']
})
export class ActiveRegisterComponent implements OnInit {
  email: string;
  access: string;
  url: string;
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.url = window.location.href;
    const getParam = new URL(this.url);
    this.email = getParam.searchParams.get('email');
    this.access = getParam.searchParams.get('base64');
    this.userService
      .checkVerifyEmail(this.email, this.access)
      .subscribe(res => {
        this.router.navigate(['hometotal/login']);
      });
  }
}
