import { Component, OnInit } from '@angular/core';
import { contact } from '../../../model/contact/contact';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from '../../../service/contact/contact.service';
import { concatMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/service/login/user.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  list: contact[] = [];
  insertForm: FormGroup;
  contact: contact = {
    id: 0,
    name:'',
    email: '',
    phone: '',
    subject: '',
    message: '',
    created_at: new Date
  };
  showTable: Boolean = true;
  showInsertForm: Boolean = false;
  successMesage = '';
  emailUser = '';
  nameUser = '';
  phoneUser = '';
  constructor(
    private cont: ContactService,
    private router: Router,
    private titleService: Title,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Testonline System - Contact us');
    this.insertForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(6),
          Validators.maxLength(30)
        ]
      ],
      phone: [
        '',
        [Validators.required, Validators.minLength(9), Validators.maxLength(12)]
      ],
      subject: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(50)]
      ],
      message: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(255)
        ]
      ]
    });
    const emailLogin = localStorage.getItem('email');
    this.userService.getUserbyEmail(emailLogin).subscribe(res => {
      this.insertForm.get('name').setValue(res.fullname);
      this.insertForm.get('phone').setValue(res.phone);
      this.insertForm.get('email').setValue(emailLogin);
      this.emailUser = emailLogin;
      this.nameUser = res.fullname;
      this.phoneUser = res.phone;
    });
  }
  onSubmitInsert() {
    const { valid, value } = this.insertForm;
    if (valid) {
    if (localStorage.getItem('access_token') !== null ) {
      this.contact.email = this.emailUser;
      this.contact.name = this.nameUser;
      this.contact.phone = this.phoneUser;
      this.contact.subject = this.insertForm.get('subject').value;
      this.contact.message = this.insertForm.get('message').value;
      const formdata = new FormData();
      formdata.append('customer', JSON.stringify(this.contact));
      this.cont.createCustomer(formdata).pipe(concatMap(_ => this.cont.getListCustomer()))
      .subscribe(res => {
        this.successMesage = 'Gửi yêu cầu thành công';
        setTimeout(() => {
          this.router.navigate(['hometotal/home']);
        }, 1000);
      },
      error => {
        this.successMesage = 'Gửi yêu cầu thất bại vui lòng kiểm tra lại!';
      });
    } else {

      const data = value;
      const formData = new FormData();
      formData.append('customer', JSON.stringify(data));
      this.cont
        .createCustomer(formData)
        .pipe(concatMap(_ => this.cont.getListCustomer()))
        .subscribe(
          res => {
            this.successMesage =
              'Gửi yêu cầu thành công';
            setTimeout(() => {
              this.router.navigate(['hometotal/home']);
            }, 1000);
          },
          error => {
            this.successMesage = 'Gửi yêu cầu thất bại vui lòng kiểm tra lại!';
          }
        );
  }
}
}
}
