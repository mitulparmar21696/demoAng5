import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Cartype } from './cartype.model';
import { environment } from '../../../../environments/environment';

@Injectable()
export class CartypeService {
  readonly rootUrl = environment.WebAPIUrl;
  private cartype = new Cartype();
  private carTypes: Cartype[];

  setter(tt: Cartype) {
    this.cartype = tt;
  }

  getter() {
    return this.cartype;
  }

  setCarTypes(cts: Cartype[]){
    
    this.carTypes = cts
  }

  getCarTypes() {
    
    return this.carTypes;
  }
  
  constructor(private http: HttpClient) { }
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  GetCartypeList() {
    const body = {
      ID: "",
      Name: "INTERNATIONAL",
      IsActive: "1",
      OperationType: "listing"
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'cartype', JSON.stringify(body), { headers: reqHeader });
    // .map((response: Response) => response.json())
    // .catch(this.handleError);
  }

  InsertCartype(tt: Cartype) {
    const body = {
      ID: "",
      Name: tt.Name,
      IsActive: tt.IsActive == true ? 1 : 0,
      OperationType: "INSERT"
    };

    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'cartype', JSON.stringify(body), { headers: reqHeader });
    // .map((response: Response) => response.json())
    // .catch(this.handleError);
  }

  UpdateCartype(tt: Cartype) {
    const body = {
      ID: tt.ID,
      Name: tt.Name,
      IsActive: tt.IsActive == true ? 1 : 0,
      OperationType: "update"
    };

    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'cartype', JSON.stringify(body), { headers: reqHeader });
    // .map((response: Response) => response.json())
    // .catch(this.handleError);
  }

  DeleteCartype(tt: Cartype) {

    const body = {
      ID: tt.ID,
      Name: "INTERNATIONAL",
      IsActive: "1",
      OperationType: "delete"
    };
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'cartype', JSON.stringify(body), { headers: reqHeader });
    // .map((response: Response) => response.json())
    // .catch(this.handleError);

  }

  GetCartypeByID(tt: Cartype) {

    const body = {
      ID: tt.ID,
      Name: "INTERNATIONAL",
      IsActive: "1",
      OperationType: "view"
    };
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'cartype', JSON.stringify(body), { headers: reqHeader })
      .map((response: Response) => response.json())
      .catch(this.handleError);

  }

  UploadImage(id: number, formData: FormData) {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    });
    
    return this.http.post(this.rootUrl + 'cartypeimageupload/' + id + '/image', formData, { headers: reqHeader });
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
    return this.http.post(this.rootUrl + 'cartype', JSON.stringify(body), { headers: reqHeader });
  }

  ActionDelete(id: string) {
    const body = {
      ID: id,
      Name: "",
      IsActive: 0,
      OperationType: "actiondelete"
    };

    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'cartype', JSON.stringify(body), { headers: reqHeader });
  }
}
