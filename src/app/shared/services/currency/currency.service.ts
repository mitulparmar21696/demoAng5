import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Currency } from './currency.model';
import { environment } from '../../../../environments/environment';

@Injectable()
export class CurrencyService {

  readonly rootUrl = environment.WebAPIUrl;
  private currency = new Currency();

  setter(c: Currency) {
    this.currency = c;
  }

  getter() {
    return this.currency;
  }

  constructor(private http: HttpClient) { }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  GetCurrencyList() {
    const body = {
      ID: "0",
      CountryID: "1",
      Name: "",
      ShortCode: "",
      CurrencyImage: "",
      IsDefault: "1",
      IsActive: "1",
      OperationType: "listing",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'currency', JSON.stringify(body), { headers: reqHeader });
  }

  InsertCurrencyList(c : Currency) {
    const body = {
      ID: "0",
      CountryID: c.CountryID,
      Name: c.Name,
      ShortCode: c.ShortCode,
      CurrencyImage: c.CurrencyImage,
      IsDefault: c.IsDefault,
      IsActive: c.IsActive,
      OperationType: "INSERT",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'currency', JSON.stringify(body), { headers: reqHeader });
  }

  UpdateCurrencyList(c : Currency) {
    const body = {
      ID: c.ID,
      CountryID: c.CountryID,
      Name: c.Name,
      ShortCode: c.ShortCode,
      CurrencyImage: c.CurrencyImage,
      IsDefault: c.IsDefault,
      IsActive: c.IsActive,
      OperationType: "update",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'currency', JSON.stringify(body), { headers: reqHeader });
  }

  DeleteCurrencyList(c : Currency) {
    const body = {
      ID: c.ID,
      CountryID: c.CountryID,
      Name: "",
      ShortCode: "",
      CurrencyImage: "",
      IsDefault: 1,
      IsActive: 1,
      OperationType: "delete",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'currency', JSON.stringify(body), { headers: reqHeader });
  }

  GetCurrencyByID(c : Currency) {
    const body = {
      ID: c.ID,
      CountryID: c.CountryID,
      Name: "",
      ShortCode: "",
      CurrencyImage: "",
      IsDefault: 1,
      IsActive: 1,
      OperationType: "view",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'currency', JSON.stringify(body), { headers: reqHeader });
  }

}
