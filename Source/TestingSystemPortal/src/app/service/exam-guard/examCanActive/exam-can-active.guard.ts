import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ExamService } from '../../exam/exam.service';

@Injectable({
  providedIn: 'root'
})
export class ExamCanActiveGuard implements CanActivate {
  examId: number;
  resultId: number;
  result: Object;
 examService: any;
  constructor(private http: HttpClient, examService: ExamService, private router: Router,
    private activatedRoute: ActivatedRoute) {
      this.activatedRoute.params.forEach(urlParams => {
        this.examId = urlParams['param1'];
        this.resultId = urlParams['param2'];
      });
    this.examService = examService;
}
  canActivate() {
    return  this.examService.getExamReSultByExamAndId(this.resultId, this.examId).subscribe(res => {res = this.result;
      if ( this.result['completed'] === 1) {
        this.router.navigate([
          '/hometotal/testresult',
          { param1: this.examId, param2: this.resultId }
        ]);
       return true;
}
  return  true;
});
}
}

