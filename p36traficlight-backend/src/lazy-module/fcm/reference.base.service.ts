import * as admin from 'firebase-admin';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';
import FcmService from './fcm.service';

@Injectable()
export default class ReferenceBaseService {
  private dbRef: any;

  constructor(path: string, private firebaseService: FcmService) {
    this.dbRef = this.firebaseService.getDatabaseRef(path);
  }

  /**
   * Get values
   *
   * @param id
   * @returns
   */
  async getValues() {
    return new Promise((resolve, reject) => {
      // Once value
      this.dbRef.once('value', (snapshot: any) => {
        const results: any[] = [];
        snapshot.forEach((childSnapshot: any) => {
          const { key } = childSnapshot;
          const data = childSnapshot.val();

          results.push({ key, ...data });
        });

        resolve(results);
      });
    });
  }

  /**
   * Get value by id
   *
   * @param id
   * @returns
   */
  async getValueById(id: string) {
    return new Promise((resolve, reject) => {
      // Once value
      this.dbRef.child(id).once('value', (snapshot: any) => {
        const { key } = snapshot;
        const data = snapshot.val();

        resolve({ key, ...data });
      });
    });
  }

  /**
   * Update value by id
   *
   * @param id
   * @returns
   */
  async updateById(id: string, data: any) {
    return this.dbRef.child(id).update(data);
  }

  /**
   * Update value by id
   *
   * @param id
   * @returns
   */
  async updateBy(id: string, data: any) {
    return this.dbRef.child(id).update(data);
  }

  /**
   * Remove value by id
   *
   * @param id
   * @returns
   */
  async removeById(id: string) {
    return this.dbRef.child(id).remove();
  }

  /**
   * Delete entire list
   *
   * @param id
   * @returns
   */
  async deleteEntireList() {
    return this.dbRef.remove();
  }

  /**
   * Listening db change
   *
   * @returns
   */
  async on(key: 'child_added' | 'child_changed' | 'child_removed') {
    return new Promise((resolve, reject) => this.dbRef.on(key, resolve));
  }

  /**
   * Create
   *
   * @returns
   */
  async create(id: string, data: any) {
    return this.dbRef.child(id).set(data);
  }
}
