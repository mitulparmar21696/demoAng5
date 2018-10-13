import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../../../environments/environment';
@Injectable()
export class BranchService {
  readonly rootUrl = environment.WebAPIUrl;
  private branch:any;
  constructor(private http: HttpClient) { 
    this.branch={}
  }
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
  setter(dt:any){
    this.branch=dt;
  }
  getter(){
    return this.branch;
  }
  getBranchList() {
    const body = {"OperationType":"listing"}
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'branch', body, { headers: reqHeader })
    // .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  deleteBranch(id) {
    const body = {
      "OperationType":"delete",
      "ID":id,
    }
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'branch', body, { headers: reqHeader })
    // .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  getCityList() {
    const body = {
      "OperationType":"LISTING"
    }
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'city', body, { headers: reqHeader })
    // .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  getCountryList() {
    const body = { 
    "OperationType":"LISTING"}
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'country', body, { headers: reqHeader })
    // .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  getStateList(id:any) {
    const body = { 
    "CountryID":id}
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'CountryWiseState', body, { headers: reqHeader })
    // .map((response: Response) => response.json())
    .catch(this.handleError);
  }
  saveBranch(data:any){
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'branch', data, { headers: reqHeader })
    // .map((response: Response) => response.json())
    .catch(this.handleError);
  }
}
