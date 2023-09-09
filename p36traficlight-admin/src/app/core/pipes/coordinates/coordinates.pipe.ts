import { Pipe, PipeTransform } from '@angular/core';
import {CommonService} from "src/app/core/services/common.service";

@Pipe({
  name: 'coordinate',
})
export class CoordinatesPipe implements PipeTransform {
  constructor(private readonly commonService: CommonService) {
  }

  transform(coordinate: any): string {
    return this.commonService.convertLatOrLngToDMS(coordinate.lat, 'lat') + ' '
      + this.commonService.convertLatOrLngToDMS(coordinate.lng, 'long');
  }
}
