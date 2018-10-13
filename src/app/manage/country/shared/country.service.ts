import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { environment } from '../../../../environments/environment';
import { Country } from './country.model';
import { Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../../../environments/environment';

const reqHeaders = new HttpHeaders({'Content-Type':'application/json'})

@Injectable()
export class CountryService {

  readonly rootUrl = environment.WebAPIUrl;
  private country = new Country();
  private countries: Country[];
  private buttonName: string;

  set_country(country: Country) {
    this.country = country;
  }

  get_country() {
    return this.country;
  }

  set_countries( countries: Country[]) {
    this.countries = countries;
  }

  get_countries() {
    return this.countries;
  }

  constructor(private http: HttpClient) { }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  GetCountryList() {
    const body = {
      OperationType: "Listing"
    };
    
    return this.http.post(this.rootUrl + 'country', JSON.stringify(body), { headers: reqHeaders });
    
    }
    Getlistingcountry() {
      const body = {
        OperationType: "listingcountry"
      };
      return this.http.post(this.rootUrl + 'country', JSON.stringify(body), { headers: reqHeaders });
    
    }
    GetActiveCountryList() {
      const body = {
        OperationType: "listingcountry"
      };
      return this.http.post(this.rootUrl + 'country', JSON.stringify(body), {headers: reqHeaders});
    }
  InsertCountry(country: Country) {
    const body = {
      ID: country.ID,
      Name: country.Name,
      ShortName: country.ShortName,
      IsActive: country.IsActive ,
      OperationType: "INSERT"
    };
    return this.http.post(this.rootUrl + 'country', JSON.stringify(body), { headers: reqHeaders });
  }

  UpdateCountry(country: Country) {
    const body = {
      ID: country.ID,
      Name: country.Name,
      ShortName: country.ShortName,
      IsActive: country.IsActive,
      OperationType: "UPDATE"
    };

    return this.http.post(this.rootUrl + 'country', JSON.stringify(body), { headers: reqHeaders });
  }

  DeleteCountry(country: Country) {

    const body = {
      ID: country.ID,
      OperationType: "DELETE"
    };
    return this.http.post(this.rootUrl + 'country', JSON.stringify(body), { headers: reqHeaders });
    
  }

  GetCountryByID(country: Country) {

    const body = {
      ID: country.ID,
      OperationType: "VIEW"
    };
    
    return this.http.post(this.rootUrl + 'country', JSON.stringify(body), { headers: reqHeaders })
      // .map((response: Response) => response.json())
      // .catch(this.handleError);

  }

  ActionStatus(id: string, isActive: string) {
    const body = {
      ID: id,
      Name: "",
      ShortName: "",
      IsActive:  isActive == "Active" ? 1: 0 ,
      OperationType: "actionstatus"
    };
    return this.http.post(this.rootUrl + 'country', JSON.stringify(body), { headers: reqHeaders });
  }

  ActionDelete(id: string) {
    const body = {
      ID: id,
      Name: "",
      ShortName: "",
      IsActive: 0,
      OperationType: "actiondelete"
    };

    return this.http.post(this.rootUrl + 'country', JSON.stringify(body), { headers: reqHeaders });
  }

}
