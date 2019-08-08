import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../service/login/user.service';
import { UploadfileServiceService } from '../service/questionservice/uploadfile-service.service';
import { UserserviceService } from '../service/user-service/userservice.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: []
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [UserService, UploadfileServiceService, UserserviceService]
    };
  }
}
