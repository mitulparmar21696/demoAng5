import { Injectable } from '@angular/core';
import { FacilityType } from './facility-type.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../../../environments/environment';


const reqHeader = new HttpHeaders({
  'Content-Type': 'application/json'
});

@Injectable()
export class FacilityTypeService {

  readonly rootUrl = environment.WebAPIUrl;
  private facilityType = new FacilityType();
  private facilities: FacilityType[];

  setter(tt: FacilityType) {
    this.facilityType = tt;
  }

  getter() {
    return this.facilityType;
  }

  set_facilities( facilities: FacilityType[]) {
    this.facilities = facilities;
  }

  getFacilities() {
    return this.facilities;
  }
  constructor(private http: HttpClient) { }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  GetFacilityTypeList() {
    const body = {
      ID: "",
      Name: "INTERNATIONAL",
      Description: "INTERNATIONAL",
      IsActive: "1",
      OperationType: "listing"
    };
    return this.http.post(this.rootUrl + 'facility', JSON.stringify(body), { headers: reqHeader });
  }

  InsertFacilityType(ft: FacilityType) {
    const body = {
      ID: "",
      Name: ft.Name,
      Description: ft.Description,
      IsActive: ft.IsActive ,
      OperationType: "INSERT"
    };

    return this.http.post(this.rootUrl + 'facility', JSON.stringify(body), { headers: reqHeader });
  }

  UpdateFacilityType(ft: FacilityType) {
    const body = {
      ID: ft.ID,
      Name: ft.Name,
      Description: ft.Description,
      IsActive: ft.IsActive,
      OperationType: "update"
    };

    return this.http.post(this.rootUrl + 'facility', JSON.stringify(body), { headers: reqHeader });
  }

  DeleteFacilityType(ft: FacilityType) {

    const body = {
      ID: ft.ID,
      Name: "INTERNATIONAL",
      Description: "INTERNATIONAL",
      IsActive: "1",
      OperationType: "delete"
    };
    return this.http.post(this.rootUrl + 'facility', JSON.stringify(body), { headers: reqHeader });
  }

  GetFacilityTypeByID(ft: FacilityType) {

    const body = {
      ID: ft.ID,
      Name: "INTERNATIONAL",
      Description: "INTERNATIONAL",
      IsActive: "1",
      OperationType: "view"
    };
    return this.http.post(this.rootUrl + 'facility', JSON.stringify(body), { headers: reqHeader })
      .map((response: Response) => response.json())
      .catch(this.handleError);

  }

  UploadImage(id: number, formData: FormData) {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    });
    return this.http.post(this.rootUrl + 'facilitytypeimageupload/' + id + '/image', formData, { headers: reqHeader });
  }

  ActionStatus(id: string, isActive: string) {
    const body = {
      ID: id,
      Name: "",
      Description: "",
      IsActive:  isActive == "Active" ? 1: 0 ,
      OperationType: "actionstatus"
    };

    return this.http.post(this.rootUrl + 'facility', JSON.stringify(body), { headers: reqHeader });
  }

  ActionDelete(id: string) {
    const body = {
      ID: id,
      Name: "",
      Description: "",
      IsActive: 0,
      OperationType: "actiondelete"
    };

    return this.http.post(this.rootUrl + 'facility', JSON.stringify(body), { headers: reqHeader });
  }

}

