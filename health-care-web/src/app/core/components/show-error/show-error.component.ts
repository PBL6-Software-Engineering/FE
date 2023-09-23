import { Component, Input } from '@angular/core';
import _ from 'lodash';

@Component({
  selector: 'app-show-error',
  templateUrl: './show-error.component.html',
  styleUrls: ['./show-error.component.scss']
})
export class ShowErrorComponent {
  validates = [
    { type: 'required', message: 'Trường này bắt buộc.' },
    { type: 'passwordNotMatch', message: 'Mật khẩu không trùng khớp.' },
    { type: 'pattern', message: 'Thông tin không đúng định dạng.' },
    { type: 'minlength', message: 'Thông tin quá ít kí tự' },
    { type: 'maxlength', message: 'Thông tin quá nhiều kí tự' },
  ];
  @Input() control: any = {};

  @Input() set validatesInput(items: any[]) {
    if (_.isArray(items)) {
      _.forEach(items, item => {
        const index = _.findIndex(this.validates, { type: item.type });
        if (index === -1) {
          this.validates.push(item);
        } else {
          this.validates[index] = item;
        }
      }); 
    }
  }

  constructor() {

  }
}