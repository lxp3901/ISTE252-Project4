import { Exercise } from './exercise';
import { Set } from './set.model';

// defines a workout entry object
export class WorkoutEntry {
    exerciseNumber: number; // the exercise number
    exercise: Exercise;     // the exercise being logged
    sets: Set[];            // the collection of sets in one exercise performed

    constructor(exerciseNumber: number, exercise: Exercise) {
        this.exercise = exercise;
        this.sets = [];
        this.exerciseNumber = exerciseNumber;
    }

    /**
     * Adds a set to a workout entry
     * @param set the set to add
     */
    addSet(set: Set): void {
        this.sets.push(set);
        console.log("SETS", this.sets);
    }

    
    /**
     * Updates the rep count for a set
     * @param setNumber the set number to alter
     * @param repCount the rep count to change
     */
    updateSetRepCount(setNumber: number, repCount: number): void {
        this.sets[setNumber].repCount = repCount;
    }


    /**
     * Updates the weight for a set
     * @param setNumber the set to alter
     * @param weight the weight value to update the set with
     */
    updateSetWeight(setNumber: number, weight: number): void {
        this.sets[setNumber].weight = weight;
    }
  }