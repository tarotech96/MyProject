import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comemts } from '../../model/comment/coment';
import { Constant } from '../../common/constant';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private http: HttpClient) {}
  // getAllcomentByid(id: number) {
  //   return this.http.get<Comemts[]>(Constant.URL_COMMENTS + id);
  // }
  // addComment(textCmt: string, idNews: number) {
  //   return this.http.post<Comemts>(
  //     Constant.URL_COMMENTS_ADD + '?content=' + textCmt + '&newsId=' + idNews,
  //     null
  //   );
  // }
  // updateComment(coment: Comemts) {
  //   return this.http.post<Comemts>(Constant.URL_COMMENTS_UPDATE, coment);
  // }
  // deleteComment(idCmt: string) {
  //   return this.http.post<Comemts>(
  //     Constant.URL_COMMENTS_DELETE + '/' + idCmt,
  //     null
  //   );
  // }
}
