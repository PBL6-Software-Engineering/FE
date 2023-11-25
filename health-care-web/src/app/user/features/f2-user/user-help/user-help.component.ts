import { Component, ElementRef, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-help',
  templateUrl: './user-help.component.html',
  styleUrls: ['./user-help.component.scss'],
})
export class UserHelpComponent implements OnInit {
  helps: any[] = [];

  constructor(
    private eleRef: ElementRef,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.userService.getHelps().subscribe((helps) => {
      this.helps = helps;
    });
  }
}
