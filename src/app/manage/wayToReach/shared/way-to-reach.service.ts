import { Injectable } from '@angular/core';
import { Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { WayToReach } from './way-to-reach.model';

const reqHeader = new HttpHeaders({
  'Content-Type': 'application/json'
});

@Injectable()
export class WayToReachService {
  readonly rootUrl = environment.WebAPIUrl;
  private wayToReach = new WayToReach();
  private wayToReachcollection: WayToReach[];

  setter(wtr: WayToReach) {
    this.wayToReach = wtr;
  }

  getter() {
    return this.wayToReach;
  }

  set_wayToReachCollection( wayToReachcollection: WayToReach[]) {
    this.wayToReachcollection = wayToReachcollection;
  }

  getWayToReachCollection() {
    return this.wayToReachcollection;
  }
  constructor(private http: HttpClient) { }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  GetWayToReachCollection() {
    const body = {
      ID: "",
      Name: "INTERNATIONAL",
      IsActive: "1",
      OperationType: "listing"
    };
    return this.http.post(this.rootUrl + 'waytoreach', JSON.stringify(body), { headers: reqHeader });

  }

  InsertWayToReach(wtr: WayToReach) {
    const body = {
      ID: "",
      Name: wtr.Name,
      IsActive: wtr.IsActive ,
      OperationType: "INSERT"
    };

    return this.http.post(this.rootUrl + 'waytoreach', JSON.stringify(body), { headers: reqHeader });
  }

  UpdateWayToReach(wtr: WayToReach) {
    const body = {
      ID: wtr.ID,
      Name: wtr.Name,
      IsActive:wtr.IsActive,
      OperationType: "update"
    };

    return this.http.post(this.rootUrl + 'waytoreach', JSON.stringify(body), { headers: reqHeader });
  }

  DeleteWayToReach(wtr: WayToReach) {

    const body = {
      ID: wtr.ID,
      Name: "INTERNATIONAL",
      IsActive: "1",
      OperationType: "delete"
    };
    return this.http.post(this.rootUrl + 'waytoreach', JSON.stringify(body), { headers: reqHeader });
  }

  GetWayToReachByID(wtr: WayToReach) {

    const body = {
      ID: wtr.ID,
      Name: "INTERNATIONAL",
      IsActive: "1",
      OperationType: "view"
    };
    return this.http.post(this.rootUrl + 'waytoreach', JSON.stringify(body), { headers: reqHeader })
      .map((response: Response) => response.json())
      .catch(this.handleError);

  }
  //TO BE UPDATED ONCE I KNOW THE API ADDRESS 
  UploadImage(id: number, formData: FormData) {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    });
    return this.http.post(this.rootUrl + 'waytoreachimageupload/' + id + '/image', formData, { headers: reqHeader });
  }

  ActionStatus(id: string, isActive: string) {

    const body = {
      ID: id,
      Name: "",
      IsActive:  isActive == "Active" ? 1: 0 ,
      OperationType: "actionstatus"
    };

    return this.http.post(this.rootUrl + 'waytoreach', JSON.stringify(body), { headers: reqHeader });
  }

  ActionDelete(id: string) {
    const body = {
      ID: id,
      Name: "",
      IsActive: 0,
      OperationType: "actiondelete"
    };

    return this.http.post(this.rootUrl + 'waytoreach', JSON.stringify(body), { headers: reqHeader });
  }
}
