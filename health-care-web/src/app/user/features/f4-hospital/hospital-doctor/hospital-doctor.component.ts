import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hospital-doctor',
  templateUrl: './hospital-doctor.component.html',
  styleUrls: ['./hospital-doctor.component.scss'],
})
export class HospitalDoctorComponent {
  @Input() hospital: any;
  @Input() doctors: any[];
  // @Output() confirmBook = new EventEmitter<any>();

  constructor() {}

  // onConfirmBook(): void {
  //   this.confirmBook.emit();
  // }
}
