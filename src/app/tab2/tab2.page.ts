import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {

  exercises = [];

  constructor(private storage: StorageService, public alertController: AlertController) {}

  ngOnInit(){
    this.loadExercises();
  }

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
              this.addExercise(input.exerciseName);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  addExercise(name: string) {
    this.storage.addItems("exercises", name);
    this.exercises.push(name);
  }

  deleteExercice(index: number) {
    console.log("Delete exercise index: " + index);
    this.storage.deleteItem("exercises", index);
    this.exercises.splice(index, 1);
  }

  loadExercises() {
    this.storage.getItems("exercises").then(savedExercises => {
      this.exercises = savedExercises;
    });
    console.log(this.exercises);
  }

}
