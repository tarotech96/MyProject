import { Component, OnInit, ViewChild } from '@angular/core';
import { Group } from 'src/app/model/group/group';
import { Popup } from 'ng2-opd-popup';
import { GroupService } from 'src/app/service/group/group.service';
import { Router, ActivatedRoute } from '@angular/router';
import { concatMap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { CheckRolePermissionOrMenu } from 'src/app/common/checkRolePermissionOrMenu';
import { MenuFilterService } from 'src/app/service/menu_filter/menu-filter.service';
import { switchMap } from 'rxjs/operators';
import { ListUserGroupDTO } from 'src/app/model/group/ListUserGroupDTO';
import { UserService } from 'src/app/service/login/user.service';

@Component({
  selector: 'app-list-user-group',
  templateUrl: './list_user_group.component.html',
  styleUrls: ['./list_user_group.component.scss']
})
export class ListUserGroupComponent implements OnInit {
  groupDTO: ListUserGroupDTO = {
    idGroup: 0,
    nameGroup: '',
    listUser : [],
    listUserRest: [],
  };
  selectedUser = [];
  perPage = 5;
  keySearch = '';
  xyz = '';
  dropdownSettingUser = {};
  removeUserId: number;
  @ViewChild('popupDelete') popupDelete: Popup;
  @ViewChild('popupDeleteChildren') popupDeleteChildren: Popup;
  @ViewChild('popupApplyFailed') popupApplyFailed: Popup;
  constructor(
    private groupService: GroupService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private checkRole: CheckRolePermissionOrMenu,
    private menuFilter: MenuFilterService,
    private userService: UserService
  ) {
  //  this.menuFilter.checkMenu();
  this.dropdownSettingUser = {
    singleSelection: false,
    idField: 'id',
    textField: 'email',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 1,
    searchPlaceholderText: 'Search',
    allowSearchFilter: true,
  };
  }

   ngOnInit() {
    this.titleService.setTitle('Testonline System - List User');
    const idGroup = this.activatedRoute.snapshot.paramMap.get('id');
    this.groupService.listUserGroup(+idGroup,this.keySearch).subscribe(res => {
      this.groupDTO = res;

    });
   // const menuSuccess = await this.menuFilter.checkMenu();
    // if (menuSuccess === 1) {
  }


  onClickDelete(id: number) {
    this.removeUserId = id;
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
    this.xyz = 'Bạn có chắc chắn xóa user khỏi group không';
    this.popupDelete.show(this.popupDelete.options);
  }
  confirmDeleteClick() {
    this.groupService
      .removeUserGroup(this.groupDTO.idGroup.toString(), this.removeUserId.toString(),this.keySearch)
      .subscribe(
        res => {
          this.groupDTO = res;
        },
        error => {
          this.router.navigate(['/error']);
        }
      );
    this.popupDelete.hide();
  }
  search(event) {
    const idGroup = this.activatedRoute.snapshot.paramMap.get('id');
    this.keySearch = event.target.value.trim();
      this.groupService
        .listUserGroup(+idGroup,this.keySearch)
        .subscribe(
          res => {
            this.groupDTO = res;
          },
          error => {
            this.router.navigate(['/error']);
          }
        );
  }


  checkRolePermission(controllerAnAction): boolean {
    return this.checkRole.checkRole(controllerAnAction);
  }

  trackByFn(index, item) {
    return item.id;
  }
  onChange(event) {
    this.perPage = event.target.value;
  }
  onItemSelect(item: any) {}
  onSelectAll(items: any) {}
  onClickAddUser() {
    if (this.selectedUser.length > 0) {
      // tslint:disable-next-line:prefer-const
      let userIdArray = [];
      this.selectedUser.map(user => {
        userIdArray.push(user.id);
      });
      this.groupService.addUserGroup(this.groupDTO.idGroup.toString(), userIdArray.toString(),this.keySearch).subscribe(res => {
      this.groupDTO = res;
      this.selectedUser = [];
      });
    }
  }
}
