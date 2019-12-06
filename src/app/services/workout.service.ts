import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor() { }

  exercises = [];
  sets = [];

  addExercise(name: string) {
    this.exercises.push({
      exerciseName: name,
      exerciseNumber: this.exercises.length + 1
    });
  }

  addSet() {
    this.sets.push({
      setNumber: this.sets.length
    });
  }
}
