import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Hotel } from './hotel.model';
import { environment } from '../../../../environments/environment';

@Injectable()
export class HotelService {

  readonly rootUrl = environment.WebAPIUrl;
  private hotel = new Hotel();

  setter(h: Hotel) {
    this.hotel = h;
  }

  getter() {
    return this.hotel;
  }

  constructor(private http: HttpClient) { }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  GetHotelListByCountry(countryIds) {
    const body = {
      CountryID : countryIds
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'DestinaationHotelSearch', JSON.stringify(body), { headers: reqHeader });
  }

  GetHotelListByCity(cityIds) {
    const body = {
      CityID : cityIds
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'CityWiseHotelList', JSON.stringify(body), { headers: reqHeader });
  }

}
