import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { AlertController, NavController } from '@ionic/angular';
import {Router} from "@angular/router";


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private storage: StorageService, 
              public alertController: AlertController,
              private navController: NavController,
              private router: Router) {}

  exercises = [];
  sets = [];

  loadExerciseTab() {
    // navigate to exercise list tab so the user can select an exercise
    // ../tab2/tab2.page.html
    this.router.navigateByUrl('tabs/tab2');
    console.log('load exercise tab');
  }

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
