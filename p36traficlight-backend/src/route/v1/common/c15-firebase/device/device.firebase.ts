import { Injectable } from '@nestjs/common';
import FirebaseBaseService from '@lazy-module/fcm/firebase.base.service';
import FcmService from '@lazy-module/fcm/fcm.service';

@Injectable()
export class DeviceFirebaseService extends FirebaseBaseService {
  constructor(firebaseService: FcmService) {
    const COLLECTION_NAME = 'devices';

    super(COLLECTION_NAME, firebaseService);
  }
}
