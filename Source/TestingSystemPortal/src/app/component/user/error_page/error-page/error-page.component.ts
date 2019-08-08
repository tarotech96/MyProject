import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/login/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {
  URL = '';
  constructor(private router: Router,
    public jwtHelper: JwtHelperService,
    private us: UserService) { }

  ngOnInit() {
    if (localStorage.getItem('role') != null) {
      const arrayRole = localStorage.getItem('role').split(',');
      const lenght = arrayRole.length;
      if (lenght <= 2) {
        if ( arrayRole[0].toLowerCase() === 'User'.toLowerCase()) {
          this.us.role = false;
        }
        else {
          this.us.role = true;
        }
      }else {
        this.us.role = true;
      }
  }
    const lengh = localStorage.getItem('backURL').split('/').length;
    this.URL = localStorage.getItem('backURL').split('/')[lengh - 1];
  }
  onBack() {
    this.router.navigate(['hometotal/home']);
    localStorage.removeItem('backURL');
  }
}
