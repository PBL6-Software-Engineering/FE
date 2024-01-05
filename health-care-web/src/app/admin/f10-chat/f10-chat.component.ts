import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChatService } from 'src/app/core/services/chat.service';

@Component({
  selector: 'app-f10-chat',
  templateUrl: './f10-chat.component.html',
  styleUrls: ['./f10-chat.component.scss'],
})
export class F10ChatComponent implements OnInit, AfterViewInit {
  @ViewChild('scrollChat') private scrollChat: ElementRef;

  admin: any;
  message = '';

  conversation: any = {
    conversationId: '',
    user: {},
    admin: {},
    createdAt: '',
  };
  conversations: any[] = [];
  messages: any[] = [];
  totalMessage = 1;

  isGetMessages = false;

  constructor(
    private chatService: ChatService,
    private spinnerService: NgxSpinnerService,
  ) {}

  ngOnInit(): void {
    this.admin = JSON.parse(localStorage.getItem('user') || '{}');
    if (this.admin && this.admin.id) {
      this.chatService.getMessageSocket().subscribe((msg: any) => {
        if (msg.adminId == this.admin?.id && msg.isUserSend) {
          this.messages.push(msg);
          this.conversation.updatedAt = msg.createdAt;
          this.conversation.lastMessage = msg.message;
          this.totalMessage++;
          this.scrollToBottom();
        }
      });

      this.chatService
        .getConversations(this.admin.id, 'admin')
        .subscribe(({ data }) => {
          this.conversations = data;
          if (this.conversations && this.conversations.length) {
            this.conversation = data[0];
            this.getMessages();
          }
        });

      this.chatService
        .getConversationSocket()
        .subscribe((conversation: any) => {
          const index = this.conversations.findIndex(
            (el) => el.conversationId == conversation.conversationId,
          );
          if (index === -1) {
            this.conversations.unshift(conversation);
          }
        });
    }
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  getMessages() {
    if (this.messages.length < this.totalMessage) {
      this.isGetMessages = true;
      this.spinnerService.show();
      this.chatService
        .getMessages(this.conversation.conversationId, this.messages.length, 20)
        .subscribe(({ data }) => {
          this.messages = data.messages.concat(this.messages);
          this.totalMessage = data.totalMessage;
          this.isGetMessages = false;
          this.spinnerService.hide();
        });
    }
  }

  sendMessage() {
    if (this.message && this.message.trim()) {
      const msg = {
        user: this.conversation.user,
        admin: this.conversation.admin,
        conversationId: this.conversation.conversationId,
        message: this.message,
        isAdminSend: true,
      };

      this.conversation.updatedAt = new Date();
      this.conversation.lastMessage = msg.message;

      this.messages.push(msg);
      this.message = '';
      this.chatService.sendMessage(msg);
      this.scrollToBottom();
    } else {
      this.message = '';
    }
  }

  scrollToBottom(): void {
    setTimeout(() => {
      if (this.scrollChat) {
        this.scrollChat.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  }

  selectConversation(conversation: any) {
    this.conversation = conversation;
    this.messages = [];
    this.totalMessage = 1;
    this.getMessages();
  }

  onScrollMessages(event: any) {
    if (event.target.scrollTop == 0) {
      this.getMessages();
    }
  }
}
