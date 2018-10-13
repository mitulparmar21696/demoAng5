import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Currency } from './currency.model';

const reqHeaders = new HttpHeaders({'Content-Type':'application/json'});

@Injectable()
export class CurrencyService {

  private countries: string[];
  readonly rootUrl = environment.WebAPIUrl;
  private currency = new Currency();
  private currencies: Currency[] = [];
  // private buttonName: string;

  set_currency(currency: Currency) {
    this.currency = currency;
  }

  get_currency() {
    return this.currency;
  }

  set_currencies( currencies: Currency[]) {
    this.currencies = currencies;
  }

  get_currencies() {
    return this.currencies;
  }

  set_CountriesArray(countries: string[]) {
    this.countries = countries;
  }

  get_countires() {
    return this.countries;
  }

  constructor(private http: HttpClient) { }


  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  GetCurrencyList() {
    const body = {
      OperationType: "Listing"
    };
    
    return this.http.post(this.rootUrl + 'currency', JSON.stringify(body), { headers: reqHeaders });
    
    }

  InsertCurrency(currency: Currency) {
    const body = {
      ID: currency.ID,
      CountryID: currency.CountryID,
      CountryName: currency.CountryName,
      CurrencyImage: currency.CurrencyImage,
      IsActive: currency.IsActive,
      IsDefault: currency.IsDefault,
      Name:currency.Name,
      Shortcode: currency.Shortcode,
      OperationType: "INSERT"
    };
    return this.http.post(this.rootUrl + 'currency', JSON.stringify(body), { headers: reqHeaders });
  }

  UpdateCurrency(currency: Currency) {
    const body = {
      ID: currency.ID,
      CountryID: currency.CountryID,
      // CountryName: currency.CountryName,
      CurrencyImage: currency.CurrencyImage,
      IsActive: currency.IsActive,
      IsDefault: currency.IsDefault,
      Name:currency.Name,
      Shortcode: currency.Shortcode,
      OperationType: "UPDATE"
    };

    return this.http.post(this.rootUrl + 'currency', JSON.stringify(body), { headers: reqHeaders });
  }

  DeleteCurrency(currency: Currency) {

    const body = {
      ID: currency.ID,
      OperationType: "DELETE"
    };
    return this.http.post(this.rootUrl + 'currency', JSON.stringify(body), { headers: reqHeaders });
    
  }

  GetCurrencyByID(currency: Currency) {

    const body = {
      ID: currency.ID,
      OperationType: "VIEW"
    };
    
    return this.http.post(this.rootUrl + 'currency', JSON.stringify(body), { headers: reqHeaders })
      .map((response: Response) => response.json())
      .catch(this.handleError);

  }

  ActionStatus(id: string, isActive: string) {
    const body = {
      ID: id,
      Name: "",
      // countryname: "",
      IsActive:  isActive == "Active" ? 1: 0 ,
      OperationType: "actionstatus"
    };
    return this.http.post(this.rootUrl + 'currency', JSON.stringify(body), { headers: reqHeaders });
  }

  ActionDelete(id: string) {
    const body = {
      ID: id,
      Name: "",
      // countryname: "",
      IsActive: 0,
      OperationType: "actiondelete"
    };

    return this.http.post(this.rootUrl + 'currency', JSON.stringify(body), { headers: reqHeaders });
  }

}
