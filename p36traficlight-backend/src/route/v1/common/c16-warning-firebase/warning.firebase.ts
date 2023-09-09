import { Injectable } from '@nestjs/common';
import FirebaseBaseService from '@lazy-module/fcm/firebase.base.service';
import FcmService from '@lazy-module/fcm/fcm.service';

@Injectable()
export class WarningFirebaseService extends FirebaseBaseService {
  constructor(firebaseService: FcmService) {
    const COLLECTION_NAME = 'warnings';

    super(COLLECTION_NAME, firebaseService);
  }
}
