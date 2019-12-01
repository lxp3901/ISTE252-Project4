import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


const ITEMS_KEY = "exercises";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) {  }

  addItems(value: string): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((exercises: String[]) => {
      if (exercises) {
        exercises.push(value);
        return this.storage.set(ITEMS_KEY, exercises);
      }
      else {
        return this.storage.set(ITEMS_KEY, [value]);
      }
    });
  }

  getItems(): Promise<string[]> {
    return this.storage.get(ITEMS_KEY);
  }

  deleteItem(index: number): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((exercises: String[]) => {
      exercises.splice(index, 1);
      return this.storage.set(ITEMS_KEY, exercises);
    });
  }

}
