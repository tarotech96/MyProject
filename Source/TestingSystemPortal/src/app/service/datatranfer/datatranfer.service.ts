import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Viewnewslist } from '../../model/viewnewslist/viewnewslist';
import { Newpost } from 'src/app/model/Newpost/Newpost';

@Injectable({
  providedIn: 'root'
})
export class DatatranferService {
  private messageSource = new BehaviorSubject(null);
  currentMessage = this.messageSource.asObservable();
  constructor() {}
  changeMessage(news: Viewnewslist) {
    this.messageSource.next(news);
  }
  changeMessage2(newpost: Newpost) {
    this.messageSource.next(newpost);
  }
}
