import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { FlightClass } from './flight-class.model';
import { environment } from '../../../../environments/environment';


const reqHeader = new HttpHeaders({
  'Content-Type': 'application/json'
});


@Injectable()
export class FlightClassService {
  readonly rootUrl = environment.WebAPIUrl;
  private flightClass = new FlightClass();
  private flightClasses: FlightClass[];

  setter(tt: FlightClass) {
    this.flightClass = tt;
  }

  getter() {
    return this.flightClass;
  }

  set_flightClasses( flightClasses: FlightClass[]) {
    this.flightClasses = flightClasses;
  }

  getFlightClasses() {
    return this.flightClasses;
  }
  constructor(private http: HttpClient) { }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  GetFlightClassList() {
    const body = {
      ID: "",
      Name: "INTERNATIONAL",
      IsActive: "1",
      OperationType: "listing"
    };
    return this.http.post(this.rootUrl + 'flightclass', JSON.stringify(body), { headers: reqHeader });
  }

  InsertFlightClass(fc: FlightClass) {
    const body = {
      ID: "",
      Name: fc.Name,
      IsActive: fc.IsActive == true ? 1 : 0,
      OperationType: "INSERT"
    };

    return this.http.post(this.rootUrl + 'flightclass', JSON.stringify(body), { headers: reqHeader });
  }

  UpdateFlightClass(fc: FlightClass) {
    const body = {
      ID: fc.ID,
      Name: fc.Name,
      IsActive: fc.IsActive == true ? 1 : 0,
      OperationType: "update"
    };
    
    return this.http.post(this.rootUrl + 'flightclass', JSON.stringify(body), { headers: reqHeader });
  }

  DeleteFlightClass(fc: FlightClass) {

    const body = {
      ID: fc.ID,
      Name: "INTERNATIONAL",
      IsActive: "1",
      OperationType: "delete"
    };
    return this.http.post(this.rootUrl + 'flightclass', JSON.stringify(body), { headers: reqHeader });
  }

  GetFlightClassByID(fc: FlightClass) {

    const body = {
      ID: fc.ID,
      Name: "INTERNATIONAL",
      IsActive: "1",
      OperationType: "view"
    };
    return this.http.post(this.rootUrl + 'flightclass', JSON.stringify(body), { headers: reqHeader })
      .map((response: Response) => response.json())
      .catch(this.handleError);

  }

  // UploadImage(id: number, formData: FormData) {
  //   var reqHeader = new HttpHeaders({
  //     'Content-Type': 'multipart/form-data'
  //   });
  //   return this.http.post(this.rootUrl + 'facilitytypeimageupload/' + id + '/image', formData, { headers: reqHeader });
  // }

  ActionStatus(id: string, isActive: boolean) {
    const body = {
      ID: id,
      Name: "",
      IsActive:  isActive == true ? 1 : 0,
      OperationType: "actionstatus"
    };

    return this.http.post(this.rootUrl + 'flightclass', JSON.stringify(body), { headers: reqHeader });
  }

  ActionDelete(id: string) {
    const body = {
      ID: id,
      Name: "",
      Description: "",
      IsActive: 0,
      OperationType: "actiondelete"
    };

    return this.http.post(this.rootUrl + 'flightclass', JSON.stringify(body), { headers: reqHeader });
  }
}
