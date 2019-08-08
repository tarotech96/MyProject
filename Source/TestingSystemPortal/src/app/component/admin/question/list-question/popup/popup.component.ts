import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { UploadfileServiceService } from 'src/app/service/questionservice/uploadfile-service.service';
import { concatMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  file: any;
  fileExist: number;
  listquestion = [];
  questionNumber: string;
  // myInputVariable: ElementRef;
  constructor(
    private router: Router,
    private uploadService: UploadfileServiceService
  ) {}

  ngOnInit() {}
  onAddExcel(event) {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      this.fileExist = 1;
    } else {
      this.fileExist = 0;
    }
  }
  getListQuestion() {
    if (this.fileExist === 1) {
      const formData = new FormData();
      formData.append('file', this.file);
      this.uploadService.getListQuestion2(formData).subscribe(output => {
        // tslint:disable-next-line:forin
        for (const index in output) {
          this.questionNumber = index;
        }
        this.uploadService.getAllQuestion();
        if (parseInt(this.questionNumber, 10) > 0) {
          alert('Import thành công ' + this.questionNumber + 'câu hỏi !!!');
        } else {
          alert('Chưa có câu hỏi nào được import!');
        }
      },
        err => {
          alert(err.error.message);
        }
        );
    }
  }
  // reset() {
  //   this.myInputVariable.nativeElement.value = '';
  // }
}
