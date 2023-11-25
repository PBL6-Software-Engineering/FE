import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ChatService } from 'src/app/core/services/chat.service';

@Component({
  selector: 'app-f9-chat',
  templateUrl: './f9-chat.component.html',
  styleUrls: ['./f9-chat.component.scss'],
})
export class F9ChatComponent implements OnInit, AfterViewInit {
  @ViewChild('scrollChat') private scrollChat: ElementRef;

  user: any;
  isOpenChat = false;
  message = '';
  conversation: any = {
    conversationId: '',
    user: {},
    admin: {},
    createdAt: '',
  };

  messages: any[] = [];
  totalMessage = 1;
  isGetMessages = false;
  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.messages = [];
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.chatService.getMessageSocket().subscribe((msg: any) => {
      if (msg?.userId == this.user?.id && msg.isAdminSend) {
        this.messages.push(msg);
        this.totalMessage++;
        this.scrollToBottom();
      }
    });

    this.chatService.getConversation().subscribe((conversation: any) => {
      if (conversation.conversationId) {
        this.conversation = conversation;
        this.isOpenChat = true;
        this.scrollToBottom();
        this.getMessages();
      } else {
        this.isOpenChat = false;
      }
    });
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  closeChat() {
    this.chatService.setConversation({});
  }

  sendMessage() {
    if (this.message && this.message.trim()) {
      const msg = {
        admin: this.conversation.admin,
        user: this.conversation.user,
        conversationId: this.conversation.conversationId,
        message: this.message,
        isUserSend: true,
      };
      this.message = '';
      this.messages.push(msg);
      this.scrollToBottom();

      this.chatService.sendMessage(msg);
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

  getMessages() {
    if (this.messages.length < this.totalMessage) {
      this.chatService
        .getMessages(this.conversation.conversationId, this.messages.length, 20)
        .subscribe(({ data }) => {
          this.messages = data.messages.concat(this.messages);
          this.totalMessage = data.totalMessage;
        });
    }
  }

  onScrollMessages(event: any) {
    if (event.target.scrollTop == 0) {
      this.getMessages();
    }
  }
}
