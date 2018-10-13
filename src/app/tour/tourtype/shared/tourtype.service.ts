import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Tourtype } from './tourtype.model';
import { environment } from '../../../../environments/environment';

@Injectable()
export class TourtypeService {

  readonly rootUrl = environment.WebAPIUrl;
  private tourType = new Tourtype();

  //loading = false;

  setter(tt: Tourtype) {
    this.tourType = tt;
  }

  getter() {
    return this.tourType;
  }


  constructor(private http: HttpClient) { }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  GetTourtypeList() {
    const body = {
      ID: "",
      Name: "INTERNATIONAL",
      Description: "INTERNATIONAL",
      IsActive: "1",
      OperationType: "listing"
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'tourtype', JSON.stringify(body), { headers: reqHeader });
    // .map((response: Response) => response.json())
    // .catch(this.handleError);
  }

  InsertTourtype(tt: Tourtype) {
    const body = {
      ID: "",
      Name: tt.Name,
      Description: tt.Description,
      IsActive: tt.IsActive == true ? 1 : 0,
      OperationType: "INSERT"
    };

    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'tourtype', JSON.stringify(body), { headers: reqHeader });
    // .map((response: Response) => response.json())
    // .catch(this.handleError);
  }

  UpdateTourtype(tt: Tourtype) {
    const body = {
      ID: tt.ID,
      Name: tt.Name,
      Description: tt.Description,
      IsActive: tt.IsActive == true ? 1 : 0,
      OperationType: "update"
    };

    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'tourtype', JSON.stringify(body), { headers: reqHeader });
    // .map((response: Response) => response.json())
    // .catch(this.handleError);
  }

  DeleteTourtype(tt: Tourtype) {

    const body = {
      ID: tt.ID,
      Name: "INTERNATIONAL",
      Description: "INTERNATIONAL",
      IsActive: "1",
      OperationType: "delete"
    };
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'tourtype', JSON.stringify(body), { headers: reqHeader });
    // .map((response: Response) => response.json())
    // .catch(this.handleError);

  }

  GetTourtypeByID(tt: Tourtype) {

    const body = {
      ID: tt.ID,
      Name: "INTERNATIONAL",
      Description: "INTERNATIONAL",
      IsActive: "1",
      OperationType: "view"
    };
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'tourtype', JSON.stringify(body), { headers: reqHeader })
      .map((response: Response) => response.json())
      .catch(this.handleError);

  }

  UploadImage(id: number, formData: FormData) {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    });
    return this.http.post(this.rootUrl + 'tourtypeimageupload/' + id + '/image', formData, { headers: reqHeader });
    // .map((response: Response) => response.json())
    // .catch(this.handleError);
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
    return this.http.post(this.rootUrl + 'tourtype', JSON.stringify(body), { headers: reqHeader });
  }

  ActionDelete(id: string) {
    const body = {
      ID: id,
      Name: "",
      Description: "",
      IsActive: 0,
      OperationType: "actiondelete"
    };

    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'tourtype', JSON.stringify(body), { headers: reqHeader });
  }

}
