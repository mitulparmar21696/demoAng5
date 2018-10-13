import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Country } from './country.model';
import { environment } from '../../../../environments/environment';

@Injectable()
export class CountryService {

  
  readonly rootUrl = environment.WebAPIUrl;
  private country = new Country();

  setter(c: Country) {
    this.country = c;
  }

  getter() {
    return this.country;
  }

  constructor(private http: HttpClient) { }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  GetCountryList() {
    const body = {
      ID: "0",
      Name: "",
      ShortName: "",     
      IsActive : "1", 
      OperationType: "listing",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'country', JSON.stringify(body), { headers: reqHeader });
  }

  InsertCountryList(c : Country) {
    const body = {
      ID: "0",
      Name: c.Name,
      ShortName: c.ShortName,  
      IsActive : c.IsActive,     
      OperationType: "INSERT",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'country', JSON.stringify(body), { headers: reqHeader });
  }

  UpdateCountryList(c : Country) {
    const body = {
      ID: c.ID,
      Name: c.Name,
      ShortName: c.ShortName,  
      IsActive : c.IsActive,     
      OperationType: "update",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'country', JSON.stringify(body), { headers: reqHeader });
  }

  DeleteCountryList(c : Country) {
    const body = {
      ID: c.ID,
      Name: "",
      ShortName: "",  
      IsActive : "1",     
      OperationType: "delete",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'country', JSON.stringify(body), { headers: reqHeader });
  }

  GetCountryByID(c : Country) {
    const body = {
      ID: c.ID,
      Name: "",
      ShortName: "",  
      IsActive : "1",     
      OperationType: "view",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'country', JSON.stringify(body), { headers: reqHeader });
  }

}
