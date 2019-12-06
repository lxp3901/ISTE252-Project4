import { Component } from '@angular/core';
import { WorkoutService } from '../services/workout.service';
import { AlertController, NavController } from '@ionic/angular';
import {Router} from "@angular/router";


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private alertController: AlertController,
              private router: Router,
              private workout: WorkoutService) {}

  
  loadExerciseTab() {
    // navigate to exercise list tab so the user can select an exercise
    // ../tab2/tab2.page.html
    this.router.navigateByUrl('tabs/tab2');
    console.log('load exercise tab');
  }

  addExercise(name: string) {
    this.workout.addExercise(name);
  }

  addSet() {
    this.workout.addSet();
  }
}
