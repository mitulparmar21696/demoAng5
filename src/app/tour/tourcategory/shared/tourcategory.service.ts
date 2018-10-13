import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Tourcategory } from './tourcategory.model';
import { environment } from '../../../../environments/environment';

@Injectable()
export class TourcategoryService {

  readonly rootUrl = environment.WebAPIUrl;
  private tourCategory = new Tourcategory();
  tourTypeCats: Tourcategory[] = [];
  
  setter(tc: Tourcategory) {
    this.tourCategory = tc;
  }

  getter() {
    return this.tourCategory;
  }


  constructor(private http: HttpClient) { }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  GetTourtypeCateoryList() {
    const body = {
      ID: "0",
      TourTypeID: "0",
      Name: "",
      Description: "",
      IsActive: "1",
      OperationType: "listing"
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'tourcategory', JSON.stringify(body), { headers: reqHeader });
    // .map((response: Response) => response.json())
    // .catch(this.handleError);
  }

  InsertTourtypeCategory(ttc: Tourcategory) {
    const body = {
      ID: "0",
      TourTypeID: ttc.TourTypeID,
      Name: ttc.Name,
      Description: ttc.Description,
      IsActive: ttc.IsActive == true ? 1 : 0,
      OperationType: "INSERT"
    };

    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'tourcategory', JSON.stringify(body), { headers: reqHeader });
    // .map((response: Response) => response.json())
    // .catch(this.handleError);
  }

  UpdateTourtypeCategory(ttc: Tourcategory) {
    const body = {
      ID: ttc.ID,
      TourTypeID: ttc.TourTypeID,
      Name: ttc.Name,
      Description: ttc.Description,
      IsActive: ttc.IsActive == true ? 1 : 0,
      OperationType: "update"
    };

    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'tourcategory', JSON.stringify(body), { headers: reqHeader });
    // .map((response: Response) => response.json())
    // .catch(this.handleError);
  }

  DeleteTourtypeCategory(ttc: Tourcategory) {

    const body = {
      ID: ttc.ID,
      TourTypeID: ttc.TourTypeID,
      Name: "INTERNATIONAL",
      Description: "INTERNATIONAL",
      IsActive: "1",
      OperationType: "delete"
    };
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'tourcategory', JSON.stringify(body), { headers: reqHeader });
    // .map((response: Response) => response.json())
    // .catch(this.handleError);

  }

  GetTourtypeByID(tt: Tourcategory) {

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
    return this.http.post(this.rootUrl + 'tourcategory', JSON.stringify(body), { headers: reqHeader })
      .map((response: Response) => response.json())
      .catch(this.handleError);

  }

  UploadImage(id: number, formData: FormData) {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    });
    return this.http.post(this.rootUrl + '/tourcategoryimageupload/' + id + '/image', formData, { headers: reqHeader });
    // .map((response: Response) => response.json())
    // .catch(this.handleError);
  }

  ActionStatus(id: string, isActive: boolean) {
    const body = {
      ID: id,
      Name: "",
      Description: "",
      IsActive: isActive == true ? 1 : 0,
      OperationType: "actionstatus"
    };

    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'tourcategory', JSON.stringify(body), { headers: reqHeader });
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
    return this.http.post(this.rootUrl + 'tourcategory', JSON.stringify(body), { headers: reqHeader });
  }

}
