import { Component, OnInit, ViewChild } from '@angular/core';
import { contact } from '../../../../model/contact/contact';
import { ContactService } from '../../../../service/contact/contact.service';
import { Router } from '@angular/router';
import { Popup } from 'ng2-opd-popup';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  listCustomer: contact[] = [];
  contact: contact;
  perPage = 5;
  keySearch = '';
  showTable: Boolean = true;
  showInsertForm: Boolean = false;
  showUpdateForm: Boolean = false;
  @ViewChild('popupDelete') popupDelete: Popup;
  @ViewChild('popupApplyFailed') popupApplyFailed: Popup;
  constructor(private cont: ContactService,
    private router: Router) { }

  ngOnInit() {
    this.cont.getListCustomer().subscribe(res => {
      this.listCustomer = res;
      this.perPage = 5;
    });
  }
  onClickDelete(cont: contact) {
    this.contact = cont;
    this.popupDelete.options = {
      header: 'Xóa',
      color: '#C82333',
      confirmBtnClass: 'btn btn-danger',
      confirmBtnContent: 'Xóa',
      cancleBtnClass: 'btn btn-default',
      cancleBtnContent: 'Hủy',
      widthProsentage: 30,
      animation: 'bounceIn'
    };
    this.popupDelete.show(this.popupDelete.options);
  }
  onClickCloseForm() {
    this.showTable = true;
    this.showInsertForm = false;
    this.showUpdateForm = false;
  }
  confirmDeleteClick() {
    this.cont
      .deleteCustomer(this.contact.id)
      .pipe(concatMap(_ => this.cont.getListCustomer()))
      .subscribe(
        res => {
          this.listCustomer = res;
        },
        err => {
          this.router.navigate(['/error']);
        }
      );
    this.popupDelete.hide();
  }
  search(event) {
    this.keySearch = event.target.value.trim();
    if (this.keySearch !== '') {
      const body = {
        key: this.keySearch
      };
      const formData = new FormData();
      formData.append('customer', JSON.stringify(body));
      this.cont
        .searchCustomer(this.keySearch)
        .subscribe(
          res => {
            this.listCustomer = res;
          },
          err => {
            this.router.navigate(['/error']);
          }
        );
    } else {
      this.cont.getListCustomer().subscribe(res => (this.listCustomer = res));
    }
  }
  onChange(event) {
    this.perPage = event.target.value;
  }

  trackByFn(index, item) {
    return item.id;
  }
}
