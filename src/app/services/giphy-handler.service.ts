import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * Handles fetching gifs using the giphy api
 */
export class GiphyHandlerService {

  apiKey: string = "sF1P7wBCukwFhTMNUw6YTdHkkmvcMDAp";
  url: string = "https://api.giphy.com/v1/gifs/search?api_key=";

  constructor(private http: HttpClient) {}

  // searches giphy api given a search term
  searchGiphy(searchTerm: string): Observable<any[]> {
    let formattedTerm = searchTerm.split(' ').join('%20');
    let url = `${this.url}${this.apiKey}&q=${formattedTerm}&limit=1&rating=pg`;
    return this.http.get(url).pipe(map(res => {
      return res['data'];
    }))
  }
}
