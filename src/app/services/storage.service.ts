import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
/**
 * Manages storing data to the device using cordova local storage plugin
 */
export class StorageService {

  constructor(private storage: Storage) {  }

  /**
   * Add data to storage
   * @param key the key of the dictionary
   * @param value the list of elements to store
   */
  async addItems(key: string, value: any): Promise<any> {
    return this.storage.get(key).then((values: any[]) => {
      if (values) {
        values.push(value);
        return this.storage.set(key, values);
      }
      else {
        return this.storage.set(key, [value]);
      }
    });
  }

  /**
   * Gets items from storage given the key
   * @param key the key to get the list of elements
   */
  getItems(key: string): Promise<any[]> {
    return this.storage.get(key);
  }


  /**
   * Deletes item from storage
   * @param key the key to use to get the list to delete from
   * @param index the index of the item to delete
   */
  async deleteItem(key: string, index: number): Promise<any> {
    return this.storage.get(key).then((values: any[]) => {
      values.splice(index, 1);
      return this.storage.set(key, values);
    });
  }

}
