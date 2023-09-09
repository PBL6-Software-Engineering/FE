import { Injectable } from '@nestjs/common';
import FcmService from '@lazy-module/fcm/fcm.service';
import ReferenceBaseService from '@lazy-module/fcm/reference.base.service';

@Injectable()
export class WarningFirebaseRefService extends ReferenceBaseService {
  constructor(firebaseService: FcmService) {
    const path = '/warnings';

    super(path, firebaseService);
  }
}
