import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChatService } from 'src/app/core/services/chat.service';

@Component({
  selector: 'app-f8-conversations',
  templateUrl: './f8-conversations.component.html',
  styleUrls: ['./f8-conversations.component.scss'],
})
export class F8ConversationsComponent implements OnInit {
  @Output() close = new EventEmitter();

  isLoadConversation = false;

  conversations: any[] = [];
  user: any;

  constructor(
    private chatService: ChatService,
    private spinnerService: NgxSpinnerService,
  ) {}
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{id: guest}');
    if (this.user && this.user.id) {
      this.isLoadConversation = true;
      this.spinnerService.show();
      this.chatService
        .getConversations(
          this.user.id,
          localStorage.getItem('role') === 'user' ? 'user' : 'admin',
        )
        .subscribe(({ data }) => {
          this.conversations = data;
          this.isLoadConversation = false;
          this.spinnerService.hide();
        });
    }

    this.chatService.getConversationSocket().subscribe((conversation: any) => {
      const index = this.conversations.findIndex(
        (el) => el.conversationId == conversation.conversationId,
      );
      if (index === -1) {
        this.conversations.unshift(conversation);
      }
    });
  }

  onClose(): void {
    this.close.emit();
  }

  setConversation(item: any) {
    this.chatService.setConversation(item);
    this.onClose();
  }
}
