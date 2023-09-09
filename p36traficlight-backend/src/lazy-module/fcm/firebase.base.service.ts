import * as admin from 'firebase-admin';

import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';
import FcmService from './fcm.service';

@Injectable()
export default class FirebaseBaseService {
  private db: admin.firestore.CollectionReference<admin.firestore.DocumentData>;

  constructor(collectionName: string, private firebaseService: FcmService) {
    this.db = this.firebaseService.getCollection(collectionName);
  }

  /**
   * Set data
   *
   * @param id
   * @param data
   * @returns
   */
  async create(data: any) {
    const id = uuidv4();

    return this.db.doc(id).set(data);
  }

  /**
   * Get all
   *
   * @returns
   */
  async getAll() {
    const snapshot = await this.db.get();

    if (snapshot.empty) throw new NotFoundException('No matching documents.');

    const result: any[] = [];

    // Loop and get data
    snapshot.forEach((doc) => {
      const data = doc.data();
      result.push({ id: doc.id, ...data });
    });

    return result;
  }

  /**
   * Get by id
   *
   * @returns
   */
  async getById(id: string) {
    const snap = await this.db.doc(id).get();

    if (snap.exists) return { ...snap.data(), id: snap.id };

    throw new NotFoundException('No such document.');
  }

  /**
   * Update by id
   *
   * @returns
   */
  async updateById(id: string, data: any) {
    return this.db.doc(id).update(data);
  }

  /**
   * Delete by id
   *
   * @returns
   */
  async deleteById(id: string) {
    return this.db.doc(id).delete();
  }

  /**
   * Make id
   *
   * @param length
   * @returns
   */
  makeID(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    const charactersLength = characters.length;

    let counter = 0;

    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }

    return result;
  }
}
