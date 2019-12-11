import { Component, OnInit, Input } from '@angular/core';
import { Exercise } from '../../exercise';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ExerciseCollectionService } from 'src/app/services/exercise-collection.service';
import { YoutubeApiService } from 'src/app/services/youtube-api.service';
import { GiphyHandlerService } from 'src/app/services/giphy-handler.service';
import { Observable } from 'rxjs';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-exercise-detail',
  templateUrl: './exercise-detail.component.html',
  styleUrls: ['./exercise-detail.component.scss'],
})
/**
 * Defines the detail page for exercises. Shows a youtube video and a related gif.
 */
export class ExerciseDetailComponent implements OnInit {

  @Input() exercise: Exercise;

  videos: Observable<any[]>; // the videos returned by the api
  private videoPlayer;       // holds the video player object
  gifSrc: string;


  constructor(
    private route: ActivatedRoute,
    private exerciseCollection: ExerciseCollectionService,
    private location: Location,
    public youtube: YoutubeApiService,
    private platform: Platform,
    private giphy: GiphyHandlerService,
  ) {
    this.videoPlayer = YoutubeVideoPlayer;
  }


  /**
   * Initializes the detail controller
   */
  ngOnInit(): void {
    this.getExercise();
    this.videos = this.youtube.searchYoutube("how to " + this.exercise.name);
    this.videos.subscribe(data => {
      console.log('videos: ', data);
    })
    this.giphy.searchGiphy("how to " + this.exercise.name).subscribe(data => {
      data.forEach(gif => {
        this.gifSrc = gif.images.original.url;
      });
    });
  }


  /**
   * Opens the youtube video in the devices youtube player, or in a new tab if on browser
   * @param videoID the youtube video id to open
   */
  openVideo(videoID: string): void {
    console.log(videoID);
    if (this.platform.is('ios') || this.platform.is('android')) {
      this.videoPlayer.openVideo(videoID);
    } 
    else {
      window.open('https://www.youtube.com/watch?v=' + videoID);
    }
  }



  getExercise(): void {
    const id = +this.route.snapshot.paramMap.get('id'); // get the id and convert to a number
    console.log("Fetched id. " + id);
    this.exerciseCollection.getExercise(id).subscribe(exercise => this.exercise = exercise);
    console.log("Exercise " + JSON.stringify(this.exercise));
  }

  goBack(): void {
    this.location.back();
  }

}
