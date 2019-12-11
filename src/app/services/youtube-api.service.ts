import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
/**
 * Manages the youtube api calls
 */
export class YoutubeApiService {

  apiKey: string = "AIzaSyA4frXTB-OqsvC_GB9aSHnP-CXXcnxOosw";
  url: string = "https://www.googleapis.com/youtube/v3/search?key=";


  constructor(private http: HttpClient) {}

  searchYoutube(searchTerm: string) {
    let formattedTerm = searchTerm.split(' ').join('%20');
    return this.http.get(`${this.url}${this.apiKey}&q=${formattedTerm}&part=snippet&type=video&order=relevance&safeSearch=moderate&maxResults=1`)
    .pipe(map((res) => {
      return res['items'];
    }))
  }  
}

