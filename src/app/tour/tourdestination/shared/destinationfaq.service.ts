import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Destinationfaq } from './destinationfaq.model';
import { environment } from '../../../../environments/environment';

@Injectable()
export class DestinationfaqService {

  readonly rootUrl = environment.WebAPIUrl;
  private df = new Destinationfaq();

  setter(d: Destinationfaq) {
    this.df = d;
  }

  getter() {
    return this.df;
  }

  constructor(private http: HttpClient) { }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  GetDestinationFAQList(destinationId : number) {
    const body = {
      ID: "0",
      DestinationID: destinationId,
      Question: "",
      Answer: "",
      OrderNo: 1,
      IsActive: 1,
      OperationType: "listing",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'destinationFAQ', JSON.stringify(body), { headers: reqHeader });
  }

  InsertDestinationFAQ(df: Destinationfaq) {
    const body = {
      ID: "0",
      DestinationID: df.DestinationID,
      Question: df.Question,
      Answer: df.Answer,
      OrderNo: df.OrderNo,
      IsActive: df.IsActive == true ? 1 :0,
      OperationType: "INSERT",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'destinationFAQ', JSON.stringify(body), { headers: reqHeader });
  }

  UpdateDestinationFAQ(df: Destinationfaq) {
    const body = {
      ID: df.ID,
      DestinationID: df.DestinationID,
      Question: df.Question,
      Answer: df.Answer,
      OrderNo: df.OrderNo,
      IsActive: df.IsActive == true ? 1 :0,
      OperationType: "update",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'destinationFAQ', JSON.stringify(body), { headers: reqHeader });
  }

  DeleteDestinationFAQ(df: Destinationfaq) {
    const body = {
      ID: df.ID,
      DestinationID: df.DestinationID,
      Question: "",
      Answer: "",
      OrderNo: 1,
      IsActive: 1,
      OperationType: "delete",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'destinationFAQ', JSON.stringify(body), { headers: reqHeader });
  }

  GetDestinationFAQByID(df: Destinationfaq) {
    const body = {
      ID: df.ID,
      DestinationID: df.DestinationID,
      Question: "",
      Answer: "",
      OrderNo: 1,
      IsActive: 1,
      OperationType: "view",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'destinationFAQ', JSON.stringify(body), { headers: reqHeader });
  }


}
