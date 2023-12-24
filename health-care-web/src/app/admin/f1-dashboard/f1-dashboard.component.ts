import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/base/auth/services/token_storage.service';

@Component({
  selector: 'app-f1-dashboard',
  templateUrl: './f1-dashboard.component.html',
  styleUrls: ['./f1-dashboard.component.scss'],
})
export class F1DashboardComponent implements OnInit {
  role: any;

  constructor(private tokenService: TokenStorageService) {}

  ngOnInit(): void {
    this.role = this.tokenService.getRole();
  }
}
