import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { PopupModule } from 'ng2-opd-popup';
import { PreviewComponent } from '../preview/preview.component';
import { PreviewcreateComponent } from '../previewcreate/previewcreate.component';
import { ViewnewsComponent } from '../viewnews/viewnews.component';
import { TruncateModule } from 'ng2-truncate';
import { TintucComponent } from '../news/tintuc.component';
import { PagenewsComponent } from './pagenews.component';
import { PageNotFoundComponent } from '../../page-not-found/page-not-found.component';
import { SanitizeHtmlPipe } from '../../../../common/sanitize-html.pipe';
export const pagenewsroutes: Routes = [
  {
    path: 'pagenews',
    component: PagenewsComponent,
    children: [
      {
        path: 'news',
        component: TintucComponent
      },
      {
        path: 'preview',
        component: PreviewComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'previewcreate',
        component: PreviewcreateComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'news/viewnews',
        component: ViewnewsComponent
      },
      {
        path: 'news/viewnews/:id',
        component: ViewnewsComponent
      },
      {
        path: '',
        redirectTo: 'news',
        pathMatch: 'full'
      },
      {
        path: '**',
        component: PageNotFoundComponent
      }
    ]
  }
];
const Routing: ModuleWithProviders = RouterModule.forChild(pagenewsroutes);
@NgModule({
  declarations: [
    TintucComponent,
    PreviewComponent,
    PreviewcreateComponent,
    ViewnewsComponent,
    PagenewsComponent,
    SanitizeHtmlPipe
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    TruncateModule,
    RouterModule.forRoot(pagenewsroutes),
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
    TruncateModule,
    PopupModule.forRoot(),
    Routing
  ],
  providers: [SanitizeHtmlPipe]
})
export class PagenewsModule {}
