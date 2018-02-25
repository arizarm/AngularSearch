import {EventEmitter, Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { stringify } from 'querystring';

@Injectable()
export class ResultService {
    
    searchEvent = new EventEmitter<object>();

  constructor(private http: HttpClient) {}

  getSearchQuery(search: string): Promise<any> {

    let qs = new HttpParams()
      .set('q', search);
      //.set('offset', ((searchpage-1)*25).toString());

    //Returns an observable
    return (
      this.http.get('https://api.giphy.com/v1/gifs/search?api_key=wspaQOXRZxpOUrnHM6RZKoPmVJz9e8GB&offset=0&rating=G&lang=en', {params: qs})
          .take(1) //from observable take 1 from the stream
          .toPromise()
        .then((result) => {
          return (result);
        }))      
  }
}
