import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header-info-user',
  templateUrl: './header-info-user.component.html',
  styleUrls: ['./header-info-user.component.scss'],
})
export class HeaderInfoUserComponent {
  @Output() logoutEvent = new EventEmitter();
  @Output() closeHeaderInfo = new EventEmitter();
  constructor() {}

  logout(): void {
    this.logoutEvent.emit();
  }

  onCloseHeaderInfo(): void {
    this.closeHeaderInfo.emit();
  }
}
