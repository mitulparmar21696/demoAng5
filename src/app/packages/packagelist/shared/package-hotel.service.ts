import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { PackageHotel } from './package-hotel.model';
import { environment } from '../../../../environments/environment';


@Injectable()
export class PackageHotelService {

  readonly rootUrl = environment.WebAPIUrl;

  constructor(private http: HttpClient) { }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  GetPackageHotel(packageId: number){
    const body = {
      PackageID: packageId
    };
    var reqHeader = new HttpHeaders({      
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'PackageHotel', JSON.stringify(body), { headers: reqHeader });
  }

  ViewPackageHotelList(packageId: number) {
    var fd = new FormData();
    var url = this.rootUrl + 'AddPackageHotel/' + packageId + '/view';
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.http.post(url, fd, { headers: reqHeader });
  }

  InsertPackageHotel(hotelData : any, packageId : number, operationType : string) {
    var fd = new FormData();
    fd.append("JsonData", JSON.stringify(hotelData));
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.http.post(this.rootUrl + 'AddPackageHotel/' + packageId + '/' + operationType, fd, { headers: reqHeader });
  }

  GetCityWiseHotels(cityId : number){
    const body = {
      CityID: cityId
    };
    var reqHeader = new HttpHeaders({      
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'CityWiseHotelList', JSON.stringify(body), { headers: reqHeader });
  }

}
