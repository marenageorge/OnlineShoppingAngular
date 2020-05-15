import { Injectable } from '@angular/core';
import {Subject } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  constructor() { }

  subject = new Subject();
  sendMsg(user)
  {
    this.subject.next(user)  //triger 
  }


  getMsg()
  {
    return this.subject.asObservable();  //listner 
  }


}
