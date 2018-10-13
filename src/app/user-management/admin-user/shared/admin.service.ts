import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AdminUser } from './admin-user.model';
import { environment } from '../../../../environments/environment';


const reqHeader = new HttpHeaders({
  'Content-Type': 'application/json'
});

@Injectable()
export class AdminService {

  readonly rootUrl = environment.WebAPIUrl;
  readonly webappsvc = environment.WebAPIUrl2;
  readonly imageUrl = environment.DefaultImageTourtype;
  private adminUser = new AdminUser();
  private adminUsers: AdminUser[];

  setter(tt: AdminUser) {
    this.adminUser = tt;
  }

  getter() {
    return this.adminUser;
  }

  set_adminUsers( adminUsers: AdminUser[]) {
    this.adminUsers = adminUsers;
  }

  getAdminUsers() {
    return this.adminUsers;
  }
  constructor(private http: HttpClient) { }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  GetAdminUserList() {
    const body = {
      ID: "",
      OperationType: "listing"
    };
    return this.http.post(this.rootUrl + 'employee', JSON.stringify(body), { headers: reqHeader });
  }

  InsertAdminUser(ft: AdminUser) {
    const body = {
      ID:"0",
      BranchID:ft.BranchID,
      FirstName:ft.FirstName,
      LastName:ft.LastName,
      EmailID:ft.EmailID,
      Password:ft.Password,
      Address:ft.Address,
      CityID:ft.CityID,
      Pincode:ft.Pincode,
      MobileNo:ft.MobileNo,
      AlternetEmailID:ft.AlternetEmailID,
      RoleID:ft.RoleID,
      SecurityQuestion:ft.SecurityQuestion,
      SecurityAnswer:ft.SecurityAnswer,
      IsActive:ft.IsActive,
      OperationType: "INSERT"
    };

    return this.http.post(this.rootUrl + 'employee', JSON.stringify(body), { headers: reqHeader });
  }

  UpdateAdminUser(ft: AdminUser) {
    const body = {
      ID: ft.ID,
      BranchID:ft.BranchID,
      FirstName:ft.FirstName,
      LastName:ft.LastName,
      EmailID:ft.EmailID,
      Password:ft.Password,
      Address:ft.Address,
      CityID:ft.CityID,
      Pincode:ft.Pincode,
      MobileNo:ft.MobileNo,
      AlternetEmailID:ft.AlternetEmailID,
      RoleID:ft.RoleID,
      SecurityQuestion:ft.SecurityQuestion,
      SecurityAnswer:ft.SecurityAnswer,
      IsActive:ft.IsActive,
      OperationType: "update"
    };

    return this.http.post(this.rootUrl + 'employee', JSON.stringify(body), { headers: reqHeader });
  }

  DeleteAdminUser(ft: AdminUser) {

    const body = {
      ID: ft.ID,
      OperationType: "delete"
    };
    return this.http.post(this.rootUrl + 'employee', JSON.stringify(body), { headers: reqHeader });
  }

  GetAdminUserByID(ft: AdminUser) {

    const body = {
      ID: ft.ID,
      OperationType: "view"
    };
    return this.http.post(this.rootUrl + 'employee', JSON.stringify(body), { headers: reqHeader })
      .map((response: Response) => response.json())
      .catch(this.handleError);

  }

  UploadImage(id: number, formData: FormData) {
    
    var reqHeader = new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    });
    return this.http.post(this.webappsvc + 'employeeprofileimageUpload/' + id , formData, { headers: reqHeader });
  }

  ActionStatus(id: string, isActive: string) {
    const body = {
      ID: id,
      IsActive:  isActive == "Active" ? 1: 0 ,
      OperationType: "actionstatus"
    };

    return this.http.post(this.rootUrl + 'employee', JSON.stringify(body), { headers: reqHeader });
  }

  ActionStatusCopy(id: string, isActive: string) {
    const body = {
      ID: id,
      IsActive:  isActive ,
      OperationType: "actionstatus"
    };

    return this.http.post(this.rootUrl + 'employee', JSON.stringify(body), { headers: reqHeader });
  }


  ActionDelete(id: string) {
    const body = {
      ID: id,
      OperationType: "actiondelete"
    };

    return this.http.post(this.rootUrl + 'employee', JSON.stringify(body), { headers: reqHeader });
  }

  GetAllBranchs() {
    return this.http.get(this.rootUrl + 'GetBranchList');
  }

  GetAllRoles() {
    return this.http.get(this.rootUrl + 'GetRoleList');
  }

  GetActiveCities(stateId) {
    const body ={
      StateID: stateId
    }
    return this.http.post(this.rootUrl + 'StateWiseCity', JSON.stringify(body) , {headers: reqHeader})
  }
}
