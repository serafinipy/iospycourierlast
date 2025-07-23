import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storageReady: Promise<void>;

  constructor(private storage: Storage) {
    this.storageReady = this.init();
  }

  async init() {
    await this.storage.create();
  }

  async setItem(key: string, value: any): Promise<void> {
    await this.storageReady;
    await this.storage.set(key, value);
  }

  async getItem(key: string): Promise<any> {
    await this.storageReady;
    return this.storage.get(key);
  }

  async removeItem(key: string): Promise<void> {
    await this.storageReady;
    await this.storage.remove(key);
  }
}
