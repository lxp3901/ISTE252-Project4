import { Injectable } from '@angular/core';
import { Observable, Subject, observable, of } from 'rxjs';
import { Exercise } from '../exercise';
import { StorageService } from './storage.service';
import { WorkoutEntry } from '../workoutEntry.model';
import { Set } from '../set.model';
import { WorkoutRecord } from '../workoutRecord.model';
import { IonDatetime } from '@ionic/angular';
import { HistoryService } from './history.service';

@Injectable({
  providedIn: 'root'
})
/**
 * Manages a workout
 */
export class WorkoutService {

  constructor(private storage: StorageService, private workoutRecords: HistoryService) {
    this.workoutActive = false;
  }

  workoutExercises: WorkoutEntry[] = []; // holds exercises that the user logs
  
  workoutActive: boolean;


  toggleWorkoutActive() {
    this.workoutActive = !this.workoutActive;
    console.log("Workout Active:" + this.workoutActive)
    return this.workoutActive;
  }


  /**
   * Adds an exercise to the workout
   * @param exercise the exercise to add
   */
  addExercise(exercise: Exercise) {
    this.workoutExercises.push(new WorkoutEntry(this.workoutExercises.length + 1, exercise));
  }


  /**
   * Adds a set to the workout
   * @param exerciseNumber the exercise number to add a set to
   */
  addSet(exerciseNumber: number): void {
    let entry = this.workoutExercises.find(entry => entry.exerciseNumber === exerciseNumber);
    let setNumber = entry.sets.length + 1;
    entry.addSet(new Set(setNumber, 0, 0));
  }


  /**
   * Removes a set from the exercise
   * @param setIndex the set index
   * @param exerciseNumber the exercise number to remove the set from
   */
  removeSet(setIndex: number, exerciseNumber: number): void {
    this.workoutExercises.find(entry => entry.exerciseNumber === exerciseNumber).sets.splice(setIndex, 1);
  }


  /**
   * Updates the set object with new rep count
   * @param entry the exercise entry to alter
   * @param setNumber the set to alter
   * @param repCount the new rep count value
   */
  updateSetReps(entry: WorkoutEntry, setNumber: number, repCount: string): void {
    entry.updateSetRepCount(setNumber, +repCount);
  }


    /**
   * Updates the set object with new weight
   * @param entry the exercise entry to alter
   * @param setNumber the set to alter
   * @param repCount the new weight value
   */
  updateSetWeight(entry: WorkoutEntry, setNumber: number, weight): void {
    entry.updateSetWeight(setNumber, +weight);
  }


  /**
   * Logs the workout to storage and ends the workout
   */
  logIt() {
    const now = new Date();
    let workout = new WorkoutRecord(now.toISOString());
    this.workoutExercises.forEach(exercise => {
      workout.addEntry(exercise);
    });
    this.workoutExercises = [];
    this.storage.addItems("workouts", workout).then(res => this.workoutRecords.loadRecords());
  }
}
