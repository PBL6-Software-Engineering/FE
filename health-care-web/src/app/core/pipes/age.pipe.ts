import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'age',
})
export class AgePipe implements PipeTransform {
  transform(value: any): string {
    let today = moment();
    let birthdate = moment(value);
    return birthdate.isValid()
      ? today.diff(birthdate, 'years').toString()
      : '0';
  }
}
