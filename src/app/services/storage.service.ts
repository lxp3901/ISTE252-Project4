import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) {  }

  addItems(key: string, value: string): Promise<any> {
    return this.storage.get(key).then((exercises: String[]) => {
      if (exercises) {
        exercises.push(value);
        return this.storage.set(key, exercises);
      }
      else {
        return this.storage.set(key, [value]);
      }
    });
  }

  getItems(key: string): Promise<string[]> {
    return this.storage.get(key);
  }

  deleteItem(key: string, index: number): Promise<any> {
    return this.storage.get(key).then((exercises: String[]) => {
      exercises.splice(index, 1);
      return this.storage.set(key, exercises);
    });
  }

}
