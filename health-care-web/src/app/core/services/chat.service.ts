import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { linkApi, linkApiChat } from '../constants/api.constant';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private $conversation = new BehaviorSubject({});
  conversation = this.$conversation.asObservable();
  constructor(
    private socket: Socket,
    private http: HttpClient,
  ) {}

  getConversations(id: any, type: any): Observable<any> {
    return this.http.get<any>(
      `${linkApiChat}/conversations?id=${id}&type=${type}`,
    );
  }

  getMessages(conversationId: any, skip = 0, limit = 20): Observable<any> {
    return this.http.get<any>(
      `${linkApiChat}/messages?conversationId=${conversationId}&skip=${skip}&limit=${limit}`,
    );
  }

sendMessage(msg: any) {
    this.socket.emit('message', msg);
  }

  getMessageSocket() {
    return this.socket.fromEvent<any>('message').pipe(map((data) => data));
  }

  getConversationSocket() {
    return this.socket.fromEvent<any>('conversation').pipe(map((data) => data));
  }

  setConversation(conversation: any) {
    this.$conversation.next(conversation);
  }

  getConversation() {
    return this.conversation;
  }
}
