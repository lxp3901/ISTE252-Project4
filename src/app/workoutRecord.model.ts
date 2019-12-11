import { WorkoutEntry } from './workoutEntry.model';

/**
 * Defines an object that holds a record for one entire workout
 */
export class WorkoutRecord {
    date: string; // the date of the workout
    exerciseEntries: WorkoutEntry[]; // the exercises performed and their values

    constructor(date: string) {
        this.date = date;
        this.exerciseEntries = [];
    }


    /**
     * Adds entries to a workout record
     * @param entry the entry to add to a workout record
     */
    addEntry(entry: WorkoutEntry) {
        this.exerciseEntries.push(entry);
    }
}