import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private $messages: any = new BehaviorSubject(
    JSON.parse(sessionStorage.getItem('messages') || '[]'),
  );
  messages = this.$messages.asObservable();

  constructor() {}

  pushMessage(message: any) {
    const msgs = this.$messages.getValue();
    msgs.push(message);
    this.$messages.next(msgs);
    sessionStorage.setItem('messages', JSON.stringify(msgs));
  }

  getMessages() {
    return this.messages;
  }
}
