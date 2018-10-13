import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { State } from './state.model';
import { HttpClient } from '@angular/common/http';
import { Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const reqHeaders = new HttpHeaders({'Content-Type':'application/json'});


@Injectable()
export class StateService {

  private countries: string[];
  readonly rootUrl = environment.WebAPIUrl;
  private state = new State();
  private states: State[] = [];
  // private buttonName: string;

  set_state(state: State ) {
    this.state = state;
  }

  get_state() {
    return this.state;
  }

  set_states( states: State[]) {
    this.states = states;
  }

  get_states() {
    return this.states;
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

  GetStateList() {
    const body = {
      OperationType: "Listing"
    };
    
    return this.http.post(this.rootUrl + 'state', JSON.stringify(body), { headers: reqHeaders });
    
    }

  InsertState(state: State) {
    const body = {
      ID: state.ID,
      Name: state.Name,
      CountryID: state.countryID,
      // countryname: state.countryname,
      IsActive: state.IsActive,
      OperationType: "INSERT"
    };
    return this.http.post(this.rootUrl + 'state', JSON.stringify(body), { headers: reqHeaders });
  }

  UpdateState(state: State) {
    const body = {
      ID: state.ID,
      Name: state.Name,
      CountryID: state.countryID,
      // countryname: state.countryname,
      IsActive: state.IsActive,
      OperationType: "UPDATE"
    };

    return this.http.post(this.rootUrl + 'state', JSON.stringify(body), { headers: reqHeaders });
  }

  DeleteState(state: State) {

    const body = {
      ID: state.ID,
      OperationType: "DELETE"
    };
    return this.http.post(this.rootUrl + 'state', JSON.stringify(body), { headers: reqHeaders });
    
  }

  GetstateByID(state: State) {

    const body = {
      ID: state.ID,
      OperationType: "VIEW"
    };
    
    return this.http.post(this.rootUrl + 'state', JSON.stringify(body), { headers: reqHeaders })
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
    return this.http.post(this.rootUrl + 'state', JSON.stringify(body), { headers: reqHeaders });
  }

  ActionDelete(id: string) {
    const body = {
      ID: id,
      Name: "",
      // countryname: "",
      IsActive: 0,
      OperationType: "actiondelete"
    };

    return this.http.post(this.rootUrl + 'state', JSON.stringify(body), { headers: reqHeaders });
  }
}
