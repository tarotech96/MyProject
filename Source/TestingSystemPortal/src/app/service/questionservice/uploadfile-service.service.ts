import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Question } from 'src/app/model/question_model/question';
import { Constant } from 'src/app/common/constant';

@Injectable({
  providedIn: 'root'
})
export class UploadfileServiceService {
  listquestion = [];
  constructor(private http: HttpClient) {
    this.getAllQuestion();
  }
  uploadFile(formData: FormData) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post<string>(
      Constant.BASE_URL + '/question/addQuestion',
      formData,
      {
        headers: head
      }
    );
  }
  downloadFile() {
    return this.http.get<Object>(Constant.API_DOWNLOADFILE);
  }
  getListQuestion2(formdata: FormData) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post<Question[]>(
      Constant.BASE_URL + '/question/importExcel',
      formdata,
      {
        headers: head
      }
    );
  }
  updateQuestion(formData: FormData) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post<string>(
      Constant.BASE_URL + '/question/updateQuestion',
      formData,
      {
        headers: head
      }
    );
  }
  getAllQuestion() {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http
      .get<Question[]>(Constant.API_GET_QUESTION_LIST, {
        headers: head
      })
      .subscribe(res => {
        this.listquestion = res;

        for (let index = 0; index < this.listquestion.length; index++) {
          this.listquestion[index]['chapterName'] = this.listquestion[index][
            'chapter'
          ] != null ?
           this.listquestion[index][
            'chapter'
          ]['name'] : '';
          this.listquestion[index]['domainName'] = this.listquestion[index][
            'domain'
          ] != null ?
          this.listquestion[index][
            'domain'
          ]['name'] : '';
          this.listquestion[index]['subjectName'] = this.listquestion[index][
            'subject'
          ] != null ? this.listquestion[index][
            'subject'
          ]['name'] : '';
        }
      });
  }
  getQuestion(id) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Object>(
      Constant.BASE_URL + '/question/getQuestion' + '/' + id,
      {
        headers: head
      }
    );
  }
  deleteQuestion(id) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.post<string>(
      Constant.BASE_URL + '/question/deleteQuestion/' + id,
      null,
      {
        headers: head
      }
    );
  }
  getQuestionOfSubject(idSubject: number, listSelected) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Question[]>(
      Constant.BASE_URL +
        '/question/getListQuestionOfSubject?idSubject=' +
        idSubject +
        '&listSelected=' +
        listSelected,
      {
        headers: head
      }
    );
  }
  getQuestionOfChapter(idChapter: number, idSubject) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Question[]>(
      Constant.BASE_URL +
        '/question/getListQuestionOfChapter/' +
        idChapter +
        '&idSubject=' +
        idSubject,
      {
        headers: head
      }
    );
  }
  getQuestionOfDomain(idDoamin: number, idSubject) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Question[]>(
      Constant.BASE_URL +
        '/question/getListQuestionOfDomain/' +
        idDoamin +
        '&idSubject=' +
        idSubject,
      {
        headers: head
      }
    );
  }
  getQuestionOfExam(idExam: number) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Question[]>(
      Constant.BASE_URL + '/question/getQuestionByExamId/' + idExam,
      {
        headers: head
      }
    );
  }
  getListRestQuestion(
    idChapter: number,
    idDomain: number,
    listSelected,
    key,
    idSubject
  ) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Question[]>(
      // tslint:disable-next-line:max-line-length
      Constant.BASE_URL +
        '/question/getListRestQuestion?idChapter=' +
        idChapter +
        '&idDomain=' +
        idDomain +
        '&listSelected=' +
        listSelected +
        '&key=' +
        key +
        '&idSubject=' +
        idSubject,
      {
        headers: head
      }
    );
  }
  getListgetListMiniumQuestionChapter(
    idChapter: number,
    numberOfChapter,
    listSelected,
    idSubject
  ) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<string[]>(
      // tslint:disable-next-line:max-line-length
      Constant.BASE_URL +
        '/question/getListMiniumQuestionChapter?idChapter=' +
        idChapter +
        '&numberOfChapter=' +
        numberOfChapter +
        '&listSelected=' +
        listSelected +
        '&idSubject=' +
        idSubject,
      {
        headers: head
      }
    );
  }
  getLisgetListMiniumQuestionDomain(
    idDomain: number,
    numberOfDomain,
    listSelected,
    idSubject
  ) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<string[]>(
      // tslint:disable-next-line:max-line-length
      Constant.BASE_URL +
        '/question/getListMiniumQuestionDomain?idDomain=' +
        idDomain +
        '&numberOfDomain=' +
        numberOfDomain +
        '&listSelected=' +
        listSelected +
        '&idSubject=' +
        idSubject,
      {
        headers: head
      }
    );
  }
  getLisgetListRestQuestionRandom(
    numbeRestQuestion: number,
    listSelected,
    idSubject
  ) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Question[]>(
      // tslint:disable-next-line:max-line-length
      Constant.BASE_URL +
        '/question/getListRestQuestionRandom?numbeRestQuestion=' +
        numbeRestQuestion +
        '&listSelected=' +
        listSelected +
        '&idSubject=' +
        idSubject,
      {
        headers: head
      }
    );
  }
  getListQuestionRandomByChapTerAndDomain(
    subjectId,
    domainName,
    chapterName,
    numberOfQuestion
  ) {
    const tk = localStorage.getItem('access_token');

    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Object[]>(
      Constant.BASE_URL +
        '/question/getListQuestionRandomByChapTerAndDomain?subjectId=' +
        subjectId +
        '&domainName=' +
        domainName +
        '&chapterName=' +
        chapterName +
        '&numberOfQuestion=' +
        numberOfQuestion,
      {
        headers: head
      }
    );
  }
  getNumberQuestionOfChapterAndDomain(subjectId) {
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http.get<Object[]>(
      Constant.BASE_URL +
        '/question/getNumberQuestionOfChapterAndDomain?subjectId=' +
        subjectId,
      {
        headers: head
      }
    );
  }
  search(formData: FormData) {
    this.listquestion = [];
    formData.append('data', JSON.stringify(formData));
    const tk = localStorage.getItem('access_token');
    let head = new HttpHeaders();
    head = head.set('TOKEN', 'Token' + tk);
    return this.http
      .post<Question[]>(Constant.API_SEARCH_QUESTION, formData, {
        headers: head
      })
      .subscribe(res => {
        this.listquestion = res;
        for (let index = 0; index < this.listquestion.length; index++) {
          // this.listquestion[index]['created_at'] = new Date(
          //   this.listquestion[index].created_at
          // ).toLocaleString();
          // this.listquestion[index]['updated_at'] = new Date(
          //   this.listquestion[index].updated_at
          // ).toLocaleString();
          this.listquestion[index]['chapterName'] = this.listquestion[
            index
          ].chapter['name'];
          this.listquestion[index]['domainName'] = this.listquestion[
            index
          ].domain['name'];
          this.listquestion[index]['subjectName'] = this.listquestion[
            index
          ].subject['name'];
        }

      });
  }
}
