import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { DestinationInclusion } from './destinationinclusion.model';
import { environment } from '../../../../environments/environment';

@Injectable()
export class DestinationinclusionService {

  readonly rootUrl = environment.WebAPIUrl;
  private dInclusion = new DestinationInclusion();

  setter(d: DestinationInclusion) {
    this.dInclusion = d;
  }

  getter() {
    return this.dInclusion;
  }

  constructor(private http: HttpClient) { }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  GetDestinationInclusionList(destinationId: number) {
    const body = {
      ID: "0",
      DestinationID: destinationId,
      Type: 1, // 1 means inclusion & 0 means exclusion
      Name: "",
      IsActive: 1,
      OperationType: "listing",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'destinationInclusion', JSON.stringify(body), { headers: reqHeader });
  }

  InsertDestinationInclusion(d: DestinationInclusion) {
    const body = {
      ID: "0",
      DestinationID: d.DestinationID,
      Type: d.Type == true ? 1 : 0, // 1 means inclusion & 0 means exclusion
      Name: d.Name,
      IsActive: d.IsActive == true ? 1 : 0,
      OperationType: "INSERT",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'destinationInclusion', JSON.stringify(body), { headers: reqHeader });
  }

  UpdateDestinationInclusion(d: DestinationInclusion) {
    const body = {
      ID: d.ID,
      DestinationID: d.DestinationID,
      Type: d.Type == true ? 1 : 0, // 1 means inclusion & 0 means exclusion
      Name: d.Name,
      IsActive: d.IsActive == true ? 1 : 0,
      OperationType: "update",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'destinationInclusion', JSON.stringify(body), { headers: reqHeader });
  }

  DeleteDestinationInclusion(d: DestinationInclusion) {
    const body = {
      ID: d.ID,
      DestinationID: d.DestinationID,
      Type: 1, // 1 means inclusion & 0 means exclusion
      Name: "",
      IsActive: 1,
      OperationType: "delete",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'destinationInclusion', JSON.stringify(body), { headers: reqHeader });
  }

  GetDestinationInclusionByID(d: DestinationInclusion) {
    const body = {
      ID: d.ID,
      DestinationID: d.DestinationID,
      Type: 1, // 1 means inclusion & 0 means exclusion
      Name: "",
      IsActive: 1,
      OperationType: "view",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'destinationInclusion', JSON.stringify(body), { headers: reqHeader });
  }

}
