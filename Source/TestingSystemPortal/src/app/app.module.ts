import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { PopupModule } from 'ng2-opd-popup';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { Http } from '@angular/http';
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { MatDialogModule } from '@angular/material/dialog';
import {
  MatSelectModule,
  MatFormFieldModule,
  MatInputModule,
  MatSortModule,
  MatTableModule,
  MatPaginatorModule
} from '@angular/material';
import { TOKEN_NAME } from './common/auth.constant';
import { AuthGuardServiceToken } from './service/guards/authguardtoken.service';
import { HometotalModule } from './component/user/hometotal/hometoal.moudule';
import { AuthenticationService } from './service/login/authentication.service';
import { UserService } from './service/login/user.service';
import { AuthGuardService } from './service/guards/authguards.service';
import { AuthGuardServiceTest } from './service/guards/authguards.service';
import { AuthService } from './service/guards/auth.service';
import { DataService } from './service/dataservice/dataservice.service';
import { TruncateModule } from 'ng2-truncate';
import { CheckRolePermissionOrMenu } from './common/checkRolePermissionOrMenu';
import { HometotalComponent } from './component/user/hometotal/hometotal.component';
import { PagenewsModule } from './component/user/news_session/pagenews/pagenews.moudule';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PageNotFoundComponent } from './component/user/page-not-found/page-not-found.component';
import { ContactUsComponent } from './component/user/contact-us/contact-us.component';
import { PracticeComponent } from './component/user/practice/practice.component';
import { UserExamComponent } from './component/user/user-exam/user-exam.component';
import { ExamHistoryComponent } from './component/user/exam-history/exam-history.component';
import { PracticeAddComponent } from './component/user/practice/practice-add/practice-add.component';
import { ExamDetailAdminComponent } from './component/admin/exam-detail-admin/exam-detail-admin.component';
import { ActiveForgotComponent } from './component/user/active-forgot/active-forgot.component';
import { TestresultComponent } from './component/user/testresult/testresult.component';
import { PopupComponent } from './component/admin/question/list-question/popup/popup.component';
import { SharedModule } from './common/shared.module';
import { RoleGuards } from './service/guards/roleguards.service';
import { TooltipModule } from 'ngx-bootstrap';
import { ProfileComponent } from './component/admin/profile/profile.component';
import { CmsModule } from './component/admin/cms/cms.module';
import { LoginComponent } from './component/user/login/login.component';
import { ErrorPageComponent } from './component/user/error_page/error-page/error-page.component';
import { TreeGroupComponent } from './component/admin/group/tree-group/tree-group.component';
export function authHttpServiceFactory(http: Http) {
  return new AuthHttp(
    new AuthConfig({
      headerPrefix: 'Bearer',
      tokenName: TOKEN_NAME,
      globalHeaders: [{ 'Content-Type': 'application/json' }],
      noJwtError: false,
      noTokenScheme: true,
      tokenGetter: () => localStorage.getItem(TOKEN_NAME)
    }),
    http
  );
}
export function tokenGetter() {
  return localStorage.getItem('access_token');
}
const routes: Routes = [
  {
    path: 'hometotal',
    component: HometotalComponent
  },
  {
path: 'error',
component: ErrorPageComponent
  },
  {
    path: '',
    redirectTo: '/hometotal/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: LoginComponent
  }
];
@NgModule({
  entryComponents: [PopupComponent],
  declarations: [
    AppComponent,
    HometotalComponent,
    PageNotFoundComponent,
    ContactUsComponent,
    PracticeComponent,
    UserExamComponent,
    ExamHistoryComponent,
    PracticeAddComponent,
    ExamDetailAdminComponent,
    ActiveForgotComponent,
    TestresultComponent,
    PopupComponent,
    ProfileComponent,
    ErrorPageComponent,
    TreeGroupComponent
  ],
  imports: [
    BrowserModule,
    CmsModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    TooltipModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['example.com'],
        blacklistedRoutes: ['example.com/examplebadroute/']
      }
    }),
    NgxPaginationModule,
    PopupModule,
    MatPaginatorModule,
    MatTableModule,
    DragDropModule,
    MatSortModule,
    NgMultiSelectDropDownModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    TruncateModule,
    HometotalModule,
    PagenewsModule,
    MatDialogModule,
    SharedModule.forRoot()
  ],
  providers: [
    { provide: AuthHttp, useFactory: authHttpServiceFactory, deps: [Http] },
    AuthenticationService,
    UserService,
    JwtHelperService,
    AuthGuardService,
    AuthGuardServiceTest,
    AuthGuardServiceToken,
    AuthService,
    DataService,
    RoleGuards,
    CheckRolePermissionOrMenu
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
