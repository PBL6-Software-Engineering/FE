import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-show-error',
  templateUrl: './show-error.component.html',
  styleUrls: ['./show-error.component.scss'],
})
export class ShowErrorComponent {
  validates = [
    { type: 'required', message: 'Trường này bắt buộc.' },
    { type: 'passwordNotMatch', message: 'Mật khẩu không trùng khớp.' },
    { type: 'pattern', message: 'Thông tin không đúng định dạng.' },
    { type: 'minlength', message: 'Thông tin quá ít kí tự' },
    { type: 'maxlength', message: 'Thông tin quá nhiều kí tự' },
    { type: 'email', message: 'Email không hợp lệ' },
  ];
  @Input() control: any = {};

  @Input() set validatesInput(items: any[]) {
    if (items && items.length) {
      items.forEach((item) => {
        const index = this.validates.findIndex(validate => validate.type === item.type);
        if (index === -1) {
          this.validates.push(item);
        } else {
          this.validates[index] = item;
        }
      });
    }
  }

  constructor() {}
}
