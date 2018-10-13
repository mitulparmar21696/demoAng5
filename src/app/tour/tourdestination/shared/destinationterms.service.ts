import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Destinationterms } from './destinationterms.model';
import { environment } from '../../../../environments/environment';

@Injectable()
export class DestinationtermsService {

  readonly rootUrl = environment.WebAPIUrl;
  private dt = new Destinationterms();

  setter(d: Destinationterms) {
    this.dt = d;
  }

  getter() {
    return this.dt;
  }

  constructor(private http: HttpClient) { }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  GetDestinationTermsList(destinationId : number) {
    const body = {
      ID: destinationId,
      Terms: "required",
      OperationType: "view",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'destinationterms', JSON.stringify(body), { headers: reqHeader });
  }

  InsertDestinationTerms(destinationId : number, termsText : string) {
    const body = {
      ID: destinationId,
      Terms: termsText,
      OperationType: "insert",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'destinationterms', JSON.stringify(body), { headers: reqHeader });
  }

}
