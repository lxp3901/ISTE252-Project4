import { Component } from '@angular/core';
import { WorkoutService } from '../services/workout.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ExerciseDetailComponent } from './exercise-detail/exercise-detail.component';
import { Exercise } from '../exercise';
import { ExerciseCollectionService } from '../services/exercise-collection.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
/**
 * The controller for the exercise collection list page
 */
export class Tab2Page {

  constructor(private alertController: AlertController, 
              private workout: WorkoutService, 
              private router: Router, 
              private exerciseCollection: ExerciseCollectionService) {
    this.exerciseCollection.loadExerciseCollection();
  }


  /**
   * Presents an exercise addition popup for adding an exercise.
   */
  async presentAddExerciseAlert() {
    const alert = await this.alertController.create({
      header: 'Add Exercise',
      inputs: [
        {
          name: 'exerciseName',
          type: 'text',
          placeholder: 'ex. Benchpress'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Add',
          handler: (input) => {
            if (input) {
              this.exerciseCollection.addExercise(input.exerciseName);
            }
          }
        }
      ]
    });
    await alert.present();
  }


  /**
   * Selects an exercise to either go to detail page or go back to workout if its active.
   * @param exercise the exercise to select
   */
  selectExercise(exercise: Exercise): void {
    if (this.workout.workoutActive) {
      this.workout.addExercise(exercise);
      this.router.navigate(['tabs', 'tab1']);
    }
    else {
      this.router.navigate(["exercise-detail", exercise.id]);
    }
  }
  
}
