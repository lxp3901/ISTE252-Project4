import { Injectable } from '@angular/core';
import { Exercise } from '../exercise';
import { StorageService } from './storage.service';
import { of, Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
// Stores a collection of exercises
export class ExerciseCollectionService {

  exerciseCollection: Exercise[] = [];
  hasExercises: boolean = false;

  constructor(private storage: StorageService) {}

  // load the entire exercise collection to an array of Exercise objects
  loadExerciseCollection() {
    this.exerciseCollection = [];
    this.storage.getItems("exercises").then(savedExercises => {
      savedExercises.forEach(element => {
        this.recreateExerciseObjects(element);
      });
    }).then(() => {
      this.evaluateHasRecords();
    })
  }


  // creates new exercise objects to use on startup
  recreateExerciseObjects(obj: any) {
    let exercise = new Exercise(obj.id, obj.name);
    console.log(exercise);
    this.exerciseCollection.push(exercise);
  }


  // gets an exercise from the collection
  getExercise(id: number): Observable<Exercise> {
    console.log(this.exerciseCollection);
    return of(this.exerciseCollection.find(exercise => exercise.id === id));
  }


  // adds an exercise to the collection
  addExercise(exerciseName: string) {
    let exercise: Exercise;
    if (this.exerciseCollection == null || this.exerciseCollection.length == 0) {
       exercise = new Exercise(1, exerciseName);
    }
    else {
      exercise = new Exercise(this.exerciseCollection[this.exerciseCollection.length - 1].id + 1, exerciseName);
    }
    this.storage.addItems("exercises", exercise).then(() => {
      this.evaluateHasRecords();
    })
    this.exerciseCollection.push(exercise);
  }


  /**
   * Deletes an exercise
   * @param index the index of the collection to delete from
   */
  deleteExercice(index: number) {
    console.log("Delete exercise, index = " + index);
    this.storage.deleteItem("exercises", index).then(() => {
      this.evaluateHasRecords();
    })
    this.exerciseCollection.splice(index, 1);
  }

  /**
   * Determines if there are any records.
   */
  evaluateHasRecords() {
    if (this.exerciseCollection != null) {
      this.hasExercises = this.exerciseCollection.length > 0;
    }
  }

}
