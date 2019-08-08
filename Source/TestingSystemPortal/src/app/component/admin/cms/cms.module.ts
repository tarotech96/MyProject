import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';
import { PermissionComponent } from '../permission/permission.component';
import { SlidebarComponent } from '../slidebar/slidebar.component';
import { CmsComponent } from './cms.component';
import { Routes, PreloadAllModules } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TruncateModule } from 'ng2-truncate';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatInputModule } from '@angular/material/input';
import {
  MatPaginatorModule,
  MatTableModule,
  MatSortModule
} from '@angular/material';
import { AuthGuardService as AuthGuard } from 'src/app/service/guards/authguards.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { PopupModule } from 'ng2-opd-popup';
import { UserComponent } from '../user/user.component';
import { RoleComponent } from '../role/role.component';
import { ViewnewslistComponent } from '../news/viewnewslist/viewnewslist.component';
import { CreatenewComponent } from '../news/createnew/createnew.component';
import { UpdatenewsComponent } from '../news/updatenews/updatenews.component';
import { MatrixRoleMenuComponent } from '../role_menu/matrix-role-menu.component';
import { MatrixRolePermistionComponent } from '../role_permission/matrix-role-permistion.component';
import { MatrixUsersRoleComponent } from '../role_user/matrix-users-role.component';
import { UserTestDashboardComponent } from '../user-test-dashboard/user-test-dashboard.component';
import { SubjectComponent } from '../subject/subject.component';
import { ChapterComponent } from '../chapter/chapter.component';
import { GroupComponent } from '../group/group.component';
import { DomainComponent } from '../domain/domain.component';
import { CreatequestionComponent } from '../question/create-question/createquestion.component';
import { UpdateQuestionComponent } from '../question/update-question/update-question.component';
import { ExamComponent } from '../exam/exam.component';
import { DatePipe } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CustomerComponent } from '../customer/customer/customer.component';
import { PageNotFoundComponent } from '../../user/page-not-found/page-not-found.component';
import { ChangePasswordComponent } from '../../user/change-password/change-password.component';
import { ExamDetailAdminComponent } from '../exam-detail-admin/exam-detail-admin.component';
import { EditProfileComponent } from '../../user/edit-profile/edit-profile.component';
import { ExamDetailComponent } from '../exam/exam-detail/exam-detail.component';
import { ProfileUserComponent } from '../../user/profile-user/profile-user.component';
import { RoleGuards } from 'src/app/service/guards/roleguards.service';
import { ConfirmationGuard } from 'src/app/service/exam-guard/confirmation/confirmation.guard';
import { ListquestionComponent } from '../question/list-question/listquestion.component';
import { ProfileComponent } from '../profile/profile.component';
import { ListUserGroupComponent } from '../group/list_user_group/list_user_group.component';

const routes: Routes = [
  {
    path: 'cms',
    component: CmsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'slidebar',
        component: SlidebarComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'menu',
        component: MenuComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'permission',
        component: PermissionComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'viewnewslist',
        component: ViewnewslistComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'createnew',
        component: CreatenewComponent,
        canDeactivate: [ConfirmationGuard]
      },
      {
        path: 'updatenew',
        component: UpdatenewsComponent,
        canDeactivate: [ConfirmationGuard]
      },
      {
        path: 'rolemenu',
        component: MatrixRoleMenuComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'rolepermission',
        component: MatrixRolePermistionComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'user',
        component: UserComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'role',
        component: RoleComponent,
        canActivate: [RoleGuards,AuthGuard]
      },
      {
        path: 'examdetail',
        component: ExamDetailComponent
      },
      {
        path: 'examdetail/:p1/:p2',
        component: ExamDetailComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      }, 
      {
        path: 'profile/:email',
        component: ProfileComponent
      },
      {
        path: 'usersrole',
        component: MatrixUsersRoleComponent
      },
      {
        path: 'dashboard',
        component: UserTestDashboardComponent
      },
      {
        path: 'dashboard/:param1/:param2',
        component: UserTestDashboardComponent
      },
      {
        path: 'subject',
        component: SubjectComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'chapter',
        component: ChapterComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'domain',
        component: DomainComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'group',
        component: GroupComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'group/listuser/:id',
        component: ListUserGroupComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'listquestion',
        component: ListquestionComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'createquestion',
        component: CreatequestionComponent
      },
      {
        path: 'updatequestion/:id',
        component: UpdateQuestionComponent
      },
      {
        path: 'exam',
        component: ExamComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'examresult:/idExam',
        component: UserTestDashboardComponent
      },
      {
        path: 'examdetail/:data',
        component: ExamDetailComponent
      },
      {
        path: 'examdetailadmin/:idExam',
        component: ExamDetailAdminComponent
      },
      {
        path: 'group',
        component: GroupComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'customer',
        component: CustomerComponent
      },
      {
        path: 'changepassword',
        component: ChangePasswordComponent
      },
      {
        path: 'edit-profile',
        component: EditProfileComponent
      },
      // {
      //   path: 'hometotal/examresult',
      //   component: ExamHistoryComponent
      // },
      {
        path: '',
        redirectTo: '/cms/dashboard',
        pathMatch: 'full'
      },
      {
        path: '**',
        component: PageNotFoundComponent
      }
    ]
  }
];
@NgModule({
  declarations: [
    MenuComponent,
    PermissionComponent,
    SlidebarComponent,
    CmsComponent,
    UpdatenewsComponent,
    ViewnewslistComponent,
    CreatenewComponent,
    MatrixRolePermistionComponent,
    MatrixRoleMenuComponent,
    RoleComponent,
    UserComponent,
    SubjectComponent,
    DomainComponent,
    ChapterComponent,
    GroupComponent,
    ListquestionComponent,
    CreatequestionComponent,
    UpdateQuestionComponent,
    MatrixRoleMenuComponent,
    MatrixUsersRoleComponent,
    UserTestDashboardComponent,
    ExamComponent,
    ExamDetailComponent,
    CustomerComponent,
    ChangePasswordComponent,
    EditProfileComponent,
    ProfileUserComponent,
    ListquestionComponent,
    ListUserGroupComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    TruncateModule,
    RouterModule.forRoot(routes),
    NgxPaginationModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    AngularEditorModule,
    HttpModule,
    HttpClientModule,
    PopupModule.forRoot(),
    DragDropModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [RoleGuards, DatePipe, ConfirmationGuard]
})
export class CmsModule {}
