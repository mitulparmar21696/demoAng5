import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { PackageIntinerary } from './package-intinerary.model';
import { environment } from '../../../../environments/environment';

@Injectable()
export class PackageItineraryService {

  readonly rootUrl = environment.WebAPIUrl2;
  private packageItinerary = new PackageIntinerary();

  setter(p: PackageIntinerary) {
    this.packageItinerary = p;
  }

  getter() {
    return this.packageItinerary;
  }

  constructor(private http: HttpClient) { }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  GetpackageCityList(packageId: number) {
    const body = {
      PackageID: packageId
    }
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'GetCityByPackage/' + packageId, JSON.stringify(body), { headers: reqHeader });
  }

  GetItineraryList(packageId: number) {
    var fd = new FormData();
    var url = this.rootUrl + 'AdminPackageItinerary/' + packageId + '/listing';
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.http.post(url, fd, { headers: reqHeader });
  }

  InsertUpdateItinerary(packageId: number, operationType: string, itineraryData: any) {
    var fd = new FormData();
    fd.append("JsonData", JSON.stringify(itineraryData));
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.http.post(this.rootUrl + 'AdminPackageItinerary/' + packageId + '/' + operationType, fd, { headers: reqHeader });
  }


}
