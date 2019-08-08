import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Constant } from 'src/app/common/constant';
import { Observable } from 'rxjs';
import { Exam } from 'src/app/model/exam/exam';
import { User } from 'src/app/model/user/users';
import { Group } from 'src/app/model/group/group';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  constructor(private http: HttpClient, private _http: Http) {}


  getListQuestionInSubject(idSubject, size) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Object[]>(Constant.API_GET_QUESTION_IN_SUBJECT + '?idSubject=' + idSubject + '&numberQuestion=' + size, {
      headers: head
    });
  }

  getListQuestionInSubject2(idSubject, size) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Object[]>(Constant.API_GET_QUESTION_IN_SUBJECT2 + '?idSubject=' + idSubject + '&numberQuestion=' + size, {
      headers: head
    });
  }
  getListPracticeHomepage() {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Object[]>(Constant.API_GET_PRACTICE_HOMEPAGE, {
      headers: head
    });
  }
  getListPracticeByUser(id: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Object[]>(
      Constant.API_GET_LIST_PRACTICE_BY_USER + '?user_id=' + id,
      {
        headers: head
      }
    );
  }
  getExamsByIDS(id: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Object>(Constant.API_GET_EXAM_BY_IDS + '?id=' + id, {
      headers: head
    });
  }

  getListExam(searchKey: string, type: string) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    let params = new HttpParams();
    params = params.append('searchKey', searchKey);
    params = params.append('type', type);
    head = head.set('TOKEN', 'Token' + tk);

    return this.http.get<Object[]>(Constant.API_LIST_EXAM, {
      headers: head,
      params: params
    });
  }
  createExam(formdata: FormData) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_INSERT_EXAM, formdata, {
      headers: head
    });
  }
  updateExam(formdata: FormData) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_UPDATE_EXAM, formdata, {
      headers: head
    });
  }
  getExamById(id: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Exam>(Constant.API_GET_EXAM_BY_ID + '/' + id, {
      headers: head
    });
  }
  getListExamSetting(idExam) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Object>(
      Constant.API_GET_EXAMSETTING_BY_EXAM + '/' + idExam,
      {
        headers: head
      }
    );
  }
  updateFileExam(formdata: FormData) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_UPDATE_FILE_EXAM, formdata, {
      headers: head
    });
  }
  updateStatusExam(formData: FormData) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_UPDATE_STATUS_EXAM, formData, {
      headers: head
    });
  }
  saveExamDetail(listQuestion, idExam) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post<Object>(
      Constant.API_ADD_EXAMQUESTION +
        '?listQuestion=' +
        listQuestion +
        '&examId=' +
        idExam,
      null,
      {
        headers: head
      }
    );
  }
  updateExamDetail(listQuestion, idExam, createType, listRandom) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post<Object>(
      Constant.API_UPDATE_EXAMQUESTION +
        '?listQuestion=' +
        listQuestion +
        '&examId=' +
        idExam +
        '&creatType=' +
        createType,
      listRandom,
      {
        headers: head
      }
    );
  }
  saveExamDetailRandom(
    idExam,
    idDomain,
    idChapter,
    percentageChapter,
    percentageDomain
  ) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post<Object>(
      Constant.API_ADD_EXAMQUESTIONRANDOM +
        '?examId=' +
        idExam +
        '&idDomain=' +
        idDomain +
        '&idChapter=' +
        idChapter +
        '&percentageChapter=' +
        percentageChapter +
        '&percentageDomain=' +
        percentageDomain,
      null,
      {
        headers: head
      }
    );
  }
  getListUserExam(id: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<User[]>(
      Constant.API_GET_LIST_USER_BY_EXAM_ID + '/' + id,
      {
        headers: head
      }
    );
  }
  getListGroupExam(id: number) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Group[]>(
      Constant.API_GET_LIST_GROUP_BY_EXAM_ID + '/' + id,
      {
        headers: head
      }
    );
  }
  getListQuestionExam(id: number) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Object[]>(
      Constant.API_GET_LIST_QUESTION_EXAM_ID + '/' + id,
      {
        headers: head
      }
    );
  }
  getExam(id: number): Observable<any> {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Exam>(Constant.API_GET_EXAM_BY_ID + '/' + id, {
      headers: head
    });
  }
  getStartExam(formData: FormData) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post<Number>(Constant.API_INSERT_EXAM_RESULT, formData, {
      headers: head
    });
  }
  getEndExam(formData: FormData) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_UPDATE_EXAM_RESULT, formData, {
      headers: head
    });
  }

  insertExamAnswer(formData: FormData) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_INSERT_EXAMANSWER, formData, {
      headers: head
    });
  }
  updateExamAnswer(formData: FormData) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_UPDATE_EXAMANSWER, formData, {
      headers: head
    });
  }
  deleteExamAnswer(formData: FormData) {
    return this.http.post(Constant.API_DELETE_EXAMANSWER, formData);
  }
  getListExamResult(idExam) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Object[]>(Constant.API_GET_LIST_EXAMRESULT + idExam, {
      headers: head
    });
  }
  getExamReSultByExamAndId(idExamResult, idExam) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Object>(
      Constant.API_GET_EXAMRESULT_BY_USER_EXAM +
        '?idExamResult=' +
        idExamResult +
        '&examId=' +
        idExam,
      {
        headers: head
      }
    );
  }
  getListQuestionResult(id: number) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Object[]>(
      Constant.API_LIST_QUESTION_EXAM_BY_RESULT_ID + '/' + id,
      {
        headers: head
      }
    );
  }
  savePractiseExam(formData) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post<Object>(Constant.API_ADD_EXAM_PRACTISE, formData, {
      headers: head
    });
  }

  // MR DUC
  getListExamResultByUserIDExamID(id1: number, id2: number) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Object[]>(
      Constant.API_EXAMRESULT_BY_USER_ID_AND_EXAM_ID +
        '?userId=' +
        id1 +
        '&examId=' +
        id2,
      {
        headers: head
      }
    );
  }
  getListPracticeResultByUserIDPracticeID(id1: number, id2: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Object[]>(
      Constant.API_PRACTICERESULT_BY_USER_ID_AND_PRARICE_ID +
        '?userId=' +
        id1 +
        '&practiceId=' +
        id2,
      {
        headers: head
      }
    );
  }
  updateCompleteExamResult(formData: FormData) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_UPDATE_COMPLETE_RESULT, formData, {
      headers: head
    });
  }
  updateTimeExamResult(formData: FormData) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post(Constant.API_UPDATE_TIME_RESULT, formData, {
      headers: head
    });
  }
  search(formData: FormData) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post<Object[]>(Constant.API_SEARCH_EXAM, formData, {
      headers: head
    });
  }
  getFreeTestResult(formData: FormData) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post<Object[]>(
      Constant.API_GET_FREE_TEST_RESULT,
      formData,
      {
        headers: head
      }
    );
  }
  sumUserTestExam(idExam: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<number>(Constant.API_SUM_USER_TEST + '/' + idExam, {
      headers: head
    });
  }
}
