import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { OpenAIService } from 'src/app/core/services/chatgpt.service';
import { SessionService } from 'src/app/core/services/session.service';

@Component({
  selector: 'app-f10-chat-gpt',
  templateUrl: './f10-chat-gpt.component.html',
  styleUrls: ['./f10-chat-gpt.component.scss'],
})
export class F10ChatGptComponent implements OnInit {
  @Input() isOpenChat = false;
  @Output() closeChat = new EventEmitter<any>();
  @ViewChild('scrollChat') private scrollChat: ElementRef;

  isWaitingGpt = false;
  messages: any[] = [];
  message = '';
  isGetMessages = false;

  constructor(
    private gptService: OpenAIService,
    private sessionService: SessionService,
  ) {}

  ngOnInit(): void {
    this.sessionService.getMessages().subscribe((messages: any) => {
      if (messages && messages.length) {
        this.messages = Object.assign([], messages);
        this.scrollToBottom();
      } else {
        this.isWaitingGpt = true;
        setTimeout(() => {
          const msg = {
            role: 'gpt',
            content: 'Chào bạn! Chúng tôi có thể giúp gì cho bạn?',
          };
          this.messages.push(msg);
          this.sessionService.pushMessage(msg);
          this.isWaitingGpt = false;
        }, 1000);
      }
    });
  }

  scrollToBottom(): void {
    setTimeout(() => {
      if (this.scrollChat) {
        this.scrollChat.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  }

  sendMessage() {
    this.isWaitingGpt = true;
    const msg = {
      role: 'user',
      content: this.message,
    };
    this.messages.push(msg);
    this.sessionService.pushMessage(msg);
    this.scrollToBottom();

    this.gptService.sendMessage(this.message).subscribe((res) => {
      const msg = {
        role: 'gpt',
        content: res.choices[0].message.content,
      };
      this.messages.push(msg);
      this.sessionService.pushMessage(msg);
      this.isWaitingGpt = false;
      this.scrollToBottom();
    });
    this.message = '';
  }

  onScrollMessages(event: any) {
    if (event.target.scrollTop == 0) {
      // this.getMessages();
    }
  }

  onCloseChat() {
    this.closeChat.emit();
  }
}
