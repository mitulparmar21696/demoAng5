import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../../environments/environment';
@Injectable()
export class BookingService {
  readonly rootUrl = environment.WebAPIUrl;
  readonly rootUrl2 = environment.WebAPIUrl2
  constructor(private http: HttpClient) { }
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
  getBookingList() {
    const body = {
      "OprationType":"listing"
    }
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl2 + 'WebTourBooking', body, { headers: reqHeader })
    // .map((response: Response) => response.json())
    .catch(this.handleError);
  }
}
