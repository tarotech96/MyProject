import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {
    private messageSource = new BehaviorSubject('default message');
    private messageSource1 = new BehaviorSubject('default message');
    currentMessage = this.messageSource.asObservable();
    currentMessage1 = this.messageSource1.asObservable();
    constructor() { }
    changeMessage(message: string) {
        this.messageSource1.next(message);
    }
    changeRoleAndMenu(permissionAndMenu: string) {
        this.messageSource.next(permissionAndMenu);
    }
}
