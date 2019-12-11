// Set object
export class Set {
    setNumber: number; // the set number
    weight: number;    // the weight weight used for the set
    repCount: number;  // the amount of reps done for the set
    
    constructor(setNumber: number, weight: number, repCount: number) {
        this.setNumber = setNumber;
        this.weight = weight;
        this.repCount = repCount;
    }
}