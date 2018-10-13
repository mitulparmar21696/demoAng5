import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Packagesupport } from './packagesupport.model';
import { environment } from '../../../../environments/environment';

@Injectable()
export class PackagesupportService {


  readonly rootUrl = environment.WebAPIUrl;
  private packageSupport = new Packagesupport();

  setter(p: Packagesupport) {
    this.packageSupport = p;
  }

  getter() {
    return this.packageSupport;
  }

  constructor(private http: HttpClient) { }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  GetPackageSupportList(packageId : number, destinationId : number) {
    const body = {
      ID: 0,
      PackageID: packageId, 
      DestinationID: destinationId,
      SupportName : "",
      MobileNo : "",
      EmailID : "",
      CityID : 0,
      Remakrs : "",     
      IsActive: 1,
      OperationType: "listing",
    };
    var reqHeader = new HttpHeaders({    
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'DestinationSupport', JSON.stringify(body), { headers: reqHeader });
  }

  InsertUpdatePackageSupport(ps : Packagesupport, operationType : string){
    const body = {
      ID: ps.ID,
      PackageID: ps.PackageID, 
      DestinationID: ps.DestinationID,
      SupportName : ps.SupportName,
      MobileNo : ps.MobileNo,
      EmailID : ps.EmailID,
      CityID : ps.CityID,
      Remakrs : ps.Remarks == undefined ? "" : ps.Remarks,     
      IsActive: ps.IsActive == true ? 1 : 0,
      OperationType: operationType,
    };
    var reqHeader = new HttpHeaders({    
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'DestinationSupport', JSON.stringify(body), { headers: reqHeader });
  }

  DeletePackageSupport(id : number, packageId : number, destinationId : number){
    const body = {
      ID: id,
      PackageID: packageId, 
      DestinationID: destinationId,
      SupportName : "",
      MobileNo : "",
      EmailID : "",
      CityID : 0,
      Remakrs : "",     
      IsActive: 1,
      OperationType: "delete",
    };
    var reqHeader = new HttpHeaders({    
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'DestinationSupport', JSON.stringify(body), { headers: reqHeader });
  }

  GetCountryList(){
    const body = {
      ID: 0,
      Name: "", 
      ShortName: "",     
      IsActive: 1,
      OperationType: "listing",
    };
    var reqHeader = new HttpHeaders({    
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'country', JSON.stringify(body), { headers: reqHeader });
  }

  GetStateList(countryId : number ){
    const body = {
      CountryID: countryId
    };
    var reqHeader = new HttpHeaders({    
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'CountryWiseState', JSON.stringify(body), { headers: reqHeader });
  }

  GetCityList(stateId : number ){
    const body = {
      StateID: stateId
    };
    var reqHeader = new HttpHeaders({    
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'StateWiseCity', JSON.stringify(body), { headers: reqHeader });
  }
}
