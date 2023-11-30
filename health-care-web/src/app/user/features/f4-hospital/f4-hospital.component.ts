import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/core/services/chat.service';
import { HospitalService } from '../../services/hospital.service';

@Component({
  selector: 'app-f4-hospital',
  templateUrl: './f4-hospital.component.html',
  styleUrls: ['./f4-hospital.component.scss'],
})
export class F4HospitalComponent implements OnInit {
  id: any;
  user: any;
  hospital: any;
  tab = 'info';
  services: any[] = [];
  doctors: any[] = [];
  constructor(
    private hospitalService: HospitalService,
    private route: ActivatedRoute,
    private chatService: ChatService,
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.id = params['id'];
        this.hospitalService
          .viewProfileHospital(this.id)
          .subscribe(({ data }) => {
            this.hospital = data;
          });

        this.hospitalService
          .getHospitalService(this.id)
          .subscribe(({ data }) => {
            this.services = data;
          });

        this.hospitalService
          .getDoctorsOfHospital(this.id)
          .subscribe(({ data }) => {
            this.doctors = data;
          });
      }
    });

    this.user = JSON.parse(localStorage.getItem('user') || '{id: guest}');
  }

  chooseTab(tab: string): void {}

  openChatbox(): void {
    if (this.user && this.hospital) {
      this.chatService.setConversation({
        conversationId: `conversationId_${this.user.id}_${this.id}`,
        user: this.user,
        admin: this.hospital,
      });
    }
  }
}
