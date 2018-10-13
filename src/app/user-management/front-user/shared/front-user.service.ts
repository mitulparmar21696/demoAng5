import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../../../environments/environment';
import { FrontUser } from './front-user.model';


const reqHeader = new HttpHeaders({
  'Content-Type': 'application/json'
});

@Injectable()
export class FrontUserService {

  readonly rootUrl = environment.WebAPIUrl;
  readonly webappsvc = environment.WebAPIUrl2;
  private frontUser = new FrontUser();
  private frontUsers: FrontUser[];

  setter(tt: FrontUser) {
    this.frontUser = tt;
  }

  getter() {
    return this.frontUser;
  }

  set_frontUsers( frontUsers: FrontUser[]) {
    this.frontUsers = frontUsers;
  }

  getfrontUsers() {
    return this.frontUsers;
  }
  constructor(private http: HttpClient) { }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  GetFrontUserList() {
    const body = {
      OperationType: "listing"
    };
    return this.http.post(this.rootUrl + 'userregistrations', JSON.stringify(body), { headers: reqHeader });
  }

  InsertFrontUser(ft: FrontUser) {
    const body = {
    ID:"0",
    FirstName: ft.FirstName,
    LastName: ft.LastName,
    EmailID: ft.EmailID,
    Password: ft.Password,
    Address1: ft.Address1,
    Address2: ft.Address2,
    CityName: ft.CityName,
    Pincode: ft.Pincode,
    MobileNo: ft.MobileNo,
    Landline: ft.Landline,
    OfficeAddress1: ft.OfficeAddress1,
    OfficeAddress2: ft.OfficeAddress2,
    OfficeCity: ft.OfficeCity,
    OfficePincode: ft.OfficeCity,
    TypeofMeal: ft.TypeofMeal,
    SeatPreference: ft.SeatPreference,
    DOB: ft.DOB,
    Anniversary: ft.Anniversary,
    MyInterest: ft.MyInterest,
     Others: ft.Others,
    Alergy:ft.Alergy,
    IsActive:ft.IsActive,
    OperationType: "INSERT",

    };

    return this.http.post(this.rootUrl + 'userregistrations', JSON.stringify(body), { headers: reqHeader });
  }

  UpdateFrontUser(ft: FrontUser) {
    const body = {
      ID: ft.ID,
      FirstName: ft.FirstName,
      LastName: ft.LastName,
      EmailID: ft.EmailID,
      Password: ft.Password,
      Address1: ft.Address1,
      Address2: ft.Address2,
      CityName: ft.CityName,
      Pincode: ft.Pincode,
      MobileNo: ft.MobileNo,
      Landline: ft.Landline,
      OfficeAddress1: ft.OfficeAddress1,
      OfficeAddress2: ft.OfficeAddress2,
      OfficeCity: ft.OfficeCity,
      OfficePincode: ft.OfficeCity,
      TypeofMeal: ft.TypeofMeal,
      SeatPreference: ft.SeatPreference,
      DOB: ft.DOB,
      Anniversary: ft.Anniversary,
      MyInterest: ft.MyInterest,
       Others: ft.Others,
      Alergy:ft.Alergy,
      IsActive:ft.IsActive,
      OperationType: "update"
    };

    return this.http.post(this.rootUrl + 'userregistrations', JSON.stringify(body), { headers: reqHeader });
  }

  DeleteFrontUser(ft: FrontUser) {

    const body = {
      ID: ft.ID,
      OperationType: "delete"
    };
    return this.http.post(this.rootUrl + 'userregistrations', JSON.stringify(body), { headers: reqHeader });
  }

  GetFrontUserByID(ft: FrontUser) {

    const body = {
      ID: ft.ID,
      OperationType: "view"
    };
    return this.http.post(this.rootUrl + 'userregistrations', JSON.stringify(body), { headers: reqHeader })
      .map((response: Response) => response.json())
      .catch(this.handleError);

  }

  UploadImage(id: number, formData: FormData) {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    });
    return this.http.post(this.webappsvc + 'profileimageUpload/' + id , formData, { headers: reqHeader });
  }

  ActionStatus(id: string, isActive: string) {
    const body = {
      ID: id,
      IsActive:  isActive == "Active" ? 1: 0 ,
      OperationType: "actionstatus"
    };

    return this.http.post(this.rootUrl + 'userregistrations', JSON.stringify(body), { headers: reqHeader });
  }

  ActionDelete(id: string) {
    const body = {
      ID: id,
      IsActive: 0,
      OperationType: "actiondelete"
    };

    return this.http.post(this.rootUrl + 'userregistrations', JSON.stringify(body), { headers: reqHeader });
  }
}
