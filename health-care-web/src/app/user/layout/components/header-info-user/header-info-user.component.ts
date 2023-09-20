import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header-info-user',
  templateUrl: './header-info-user.component.html',
  styleUrls: ['./header-info-user.component.scss']
})
export class HeaderInfoUserComponent {
  @Output() logoutEvent = new EventEmitter();
  constructor() {
    
  }

  logout(): void {
    console.log('logout')
    this.logoutEvent.emit();
  }
}
