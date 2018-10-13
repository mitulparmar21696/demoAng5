import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Setting } from './setting.model';
import { environment } from '../../../../environments/environment';

@Injectable()
export class SettingService {

  readonly rootUrl = environment.WebAPIUrl;
  private setting = new Setting();

  setter(tt: Setting) {
    this.setting = tt;
  }

  getter() {
    return this.setting;
  }
  
  constructor(private http: HttpClient) { }
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  GetSettingList() {
    const body = {
      ID: "0",
      Name: "INTERNATIONAL",
      IsActive: "1",
      OperationType: "listing"
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'Settings', JSON.stringify(body), { headers: reqHeader });
    // .map((response: Response) => response.json())
    // .catch(this.handleError);
  }

  InsertSetting(tt: Setting) {
    const body = {
      ID: "",
      Key: tt.SettingKey,
      Value: tt.Value,
      IsActive: tt.IsActive == true ? 1 : 0,
      OperationType: "insert"
    };

    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'settings', JSON.stringify(body), { headers: reqHeader });
    // .map((response: Response) => response.json())
    // .catch(this.handleError);
  }

  UpdateSetting(tt: Setting) {
    const body = {
      ID: tt.ID,
      Key: tt.SettingKey,
      Value: tt.Value,
      IsActive: tt.IsActive == true ? 1 : 0,
      OperationType: "update"
    };

    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'settings', JSON.stringify(body), { headers: reqHeader });
    // .map((response: Response) => response.json())
    // .catch(this.handleError);
  }

  // DeleteSetting(tt: Setting) {

  //   const body = {
  //     ID: tt.ID,
  //     Name: "INTERNATIONAL",
  //     IsActive: "1",
  //     OperationType: "delete"
  //   };
  //   var reqHeader = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });
  //   return this.http.post(this.rootUrl + 'Setting', JSON.stringify(body), { headers: reqHeader });
  //   // .map((response: Response) => response.json())
  //   // .catch(this.handleError);

  // }

  GetSettingByID(tt: Setting) {

    const body = {
      ID: tt.ID,
      Name: "INTERNATIONAL",
      IsActive: "1",
      OperationType: "view"
    };
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'settings', JSON.stringify(body), { headers: reqHeader })
      .map((response: Response) => response.json())
      .catch(this.handleError);

  }

 

  ActionStatus(id: string, isActive: boolean) {
    const body = {
      ID: id,
      Name: "",
      Description: "",
      IsActive:  isActive == true ? 1 : 0,
      OperationType: "actionstatus"
    };

    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'settings', JSON.stringify(body), { headers: reqHeader });
  }

  // ActionDelete(id: string) {
  //   const body = {
  //     ID: id,
  //     Name: "",
  //     IsActive: 0,
  //     OperationType: "actiondelete"
  //   };

  //   var reqHeader = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });
  //   return this.http.post(this.rootUrl + 'Setting', JSON.stringify(body), { headers: reqHeader });
  // }

}
