import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor() {}

  exercises = [];
  sets = [];

  addExercise(name: string) {
    this.exercises.push({
      exerciseName: name,
      exerciseNumber: this.exercises.length
    });
  }

  addSet() {
    this.sets.push({
      setNumber: this.sets.length
    });
  }


}
