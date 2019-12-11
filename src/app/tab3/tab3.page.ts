import { Component } from '@angular/core';
import { HistoryService } from '../services/history.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
/**
 * Loads the workouts 
 */
export class Tab3Page {

  hasLogs: boolean = false;

  constructor(public workoutRecords: HistoryService) {
    workoutRecords.loadRecords();
  }


}
