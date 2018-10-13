import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../../../environments/environment';
import { City } from './city.model';


const reqHeader = new HttpHeaders({
  'Content-Type': 'application/json'
});
@Injectable()
export class CityService {

  readonly rootUrl = environment.WebAPIUrl;
  private city = new City();
  private cities: City[];

  setter(tt: City) {
    this.city = tt;
  }

  getter() {
    return this.city;
  }

  set_cities( cities: City[]) {
    this.cities = cities;
  }

  getCities() {
    return this.cities;
  }
  constructor(private http: HttpClient) { }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  GetCityList() {
    const body = {
      OperationType: "LISTING"
    };
    return this.http.post(this.rootUrl + 'city', JSON.stringify(body), { headers: reqHeader });
  }

  InsertCity(ft: City) {
    
    const body = {
      ID: "0",
      Name: ft.Name,
      StateID: ft.stateID,
      // CountryID: ft.CountryID.toString(),
      IsActive: ft.IsActive ,
      OperationType: "INSERT"
    };

    return this.http.post(this.rootUrl + 'city', JSON.stringify(body), { headers: reqHeader });
  }

  UpdateCity(ft: City) {
    const body = {
      ID: ft.ID,
      Name: ft.Name,
     StateID: ft.stateID,
     CountryID: ft.CountryID,
      IsActive: ft.IsActive,
      OperationType: "update"
    };

    return this.http.post(this.rootUrl + 'city', JSON.stringify(body), { headers: reqHeader });
  }

  DeleteCity(ft: City) {
    
    const body = {
      ID: ft.ID,
      OperationType: "delete"
    };
    return this.http.post(this.rootUrl + 'city', JSON.stringify(body), { headers: reqHeader });
  }

  GetCityByID(ft: City) {

    const body = {
      ID: ft.ID,
      OperationType: "view"
    };
    return this.http.post(this.rootUrl + 'city', JSON.stringify(body), { headers: reqHeader })
      .map((response: Response) => response.json())
      .catch(this.handleError);

  }


  ActionStatus(id: string, isActive: string) {
    const body = {
      ID: id,
      IsActive:  isActive == "Active" ? 1: 0 ,
      OperationType: "actionstatus"
    };

    return this.http.post(this.rootUrl + 'city', JSON.stringify(body), { headers: reqHeader });
  }

  ActionDelete(id: string) {
    const body = {
      ID: id,
      OperationType: "actiondelete"
    };

    return this.http.post(this.rootUrl + 'city', JSON.stringify(body), { headers: reqHeader });
  }

  GetStatesByCountryID(countryID){
    const body = {
      CountryID: countryID
    }

    return this.http.post(this.rootUrl + 'CountryWiseState', JSON.stringify(body), {headers : reqHeader});
  }
}
