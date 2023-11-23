import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender',
})
export class GenderPipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    if (value == 0) {
      return 'Nam';
    } else if (value == 1) {
      return 'Nữ';
    } else if (value == 2) {
      return 'Khác';
    } else {
      return 'Không có dữ liệu';
    }
  }
}
