import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../model/user/users';

@Injectable({
  providedIn: 'root'
})
export class UserdatatranferService {
  private messageSource = new BehaviorSubject(null);
  currentMessage = this.messageSource.asObservable();
  constructor() {}
  changeMessage(users: User) {
    this.messageSource.next(users);
  }
}
