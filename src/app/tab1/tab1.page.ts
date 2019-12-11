import { Component } from '@angular/core';
import { WorkoutService } from '../services/workout.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
/**
 * The workout page
 */
export class Tab1Page {
  workoutStatus: string;
  buttonsDisabled: boolean;

  constructor(private router: Router, private workout: WorkoutService) {}


  toggleWorkoutActive() {
    if (this.workout.toggleWorkoutActive()) {
      this.workoutStatus = "End Workout";
      this.buttonsDisabled = false;
    }
    else {
      this.workoutStatus = "Start Workout";
      this.buttonsDisabled = true;
    }
  }
  
  /**
   * Navigates to the exercise list so the user can select an exercise.
   */
  loadExerciseTab() {
    this.router.navigateByUrl('tabs/tab2');
    console.log('load exercise tab');
  }
  
  /**
   * Initializes the workout page
   */
  ngOnInit() {
    this.workoutStatus = 'Start Workout'
    this.buttonsDisabled = true;
  }

  /**
   * Ends the current workout then calls the workout service to log it.
   */
  logIt() {
    this.toggleWorkoutActive();
    this.workout.logIt();
  }
}
