import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-info-patient',
  templateUrl: './view-info-patient.component.html',
  styleUrls: ['./view-info-patient.component.css'],
})
export class ViewInfoPatientComponent implements OnInit {
  @Input() selectedItem: any;
  @Output() onLoadData = new EventEmitter<any>();

  constructor(
    private router: Router,
  ) {
    this.selectedItem =
      this.router.getCurrentNavigation()?.extras.state?.['data'];

    if (!this.selectedItem) {
      this.router.navigateByUrl('/admin/appointment/doctor');
    }
  }

  ngOnInit(): void {
  }
}
