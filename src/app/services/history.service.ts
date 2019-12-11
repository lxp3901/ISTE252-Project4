import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { WorkoutRecord } from '../workoutRecord.model';

@Injectable({
  providedIn: 'root'
})
/**
 * Manages the records of workouts
 */
export class HistoryService {

  records: WorkoutRecord[];
  hasRecords: boolean = false;

  constructor(private storage: StorageService) {}

  /**
   * Deletes a workout from the log
   * @param index the index to delete from the workout log
   */
  deleteWorkout(index: number) {
    this.records.splice(index, 1);
    this.storage.deleteItem("workouts", index).then(() => {
      this.evaluateHasRecords();
    });
  }

  /**
   * Loads the records from local storage
   */
  loadRecords() {
    this.storage.getItems("workouts").then(savedWorkouts => {
      this.records = savedWorkouts;
    }).then(() => {
     this.evaluateHasRecords();
    });
  }

  /**
   * Determines if there are any records or not
   */
  evaluateHasRecords() {
    if (this.records != null) {
      this.hasRecords = this.records.length > 0;
    }
  }

}
