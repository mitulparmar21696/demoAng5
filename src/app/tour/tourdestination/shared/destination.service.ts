import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Destination } from './destination.model';
import { environment } from '../../../../environments/environment';

@Injectable()
export class DestinationService {

  readonly rootUrl = environment.WebAPIUrl;
  private destination = new Destination();

  setter(d: Destination) {
    this.destination = d;
  }

  getter() {
    return this.destination;
  }

  constructor(private http: HttpClient) { }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  GetDestinationList() {
    const body = {
      ID: "0",
      TourTypeID: "1",
      TourCategory: "",
      CountryID: "",
      DestinationName: "",
      BestTimeToVisit: "",
      Description: "",
      HotelID: "",
      Document: "",
      IsCustomize: 0,
      CurrencyID: 0,
      Priority: 1,
      MetaDescription: "",
      MetaTitle: "",
      MetaKeywords: "",
      IsActive: 1,
      OperationType: "listing",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'destination', JSON.stringify(body), { headers: reqHeader });
  }

  InsertDestination(d: Destination) {
    const body = {
      ID: "0",
      TourTypeID: d.TourTypeID,
      TourCategory: d.TourCategory,
      CountryID: d.CountryID,
      DestinationName: d.DestinationName,
      BestTimeToVisit: d.BestTimeToVisit,
      Description: d.Description,
      HotelID: d.HotelID,
      Document: "", //always pass blank
      IsCustomize: 0, //always pass 0
      CurrencyID: d.CurrencyID,
      Priority: d.Priority,
      MetaDescription: d.MetaDescription,
      MetaTitle: d.MetaTitle,
      MetaKeywords: d.MetaKeywords,
      IsActive: d.IsActive == true ? 1 : 0,
      OperationType: "INSERT",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'destination', JSON.stringify(body), { headers: reqHeader });
  }

  UpdateDestination(d: Destination) {
    const body = {
      ID: d.ID,
      TourTypeID: d.TourTypeID,
      TourCategory: d.TourCategory,
      CountryID: d.CountryID,
      DestinationName: d.DestinationName,
      BestTimeToVisit: d.BestTimeToVisit,
      Description: d.Description,
      HotelID: d.HotelID,
      Document: "", //always pass blank
      IsCustomize: 0, //always pass 0
      CurrencyID: d.CurrencyID,
      Priority: d.Priority,
      MetaDescription: d.MetaDescription,
      MetaTitle: d.MetaTitle,
      MetaKeywords: d.MetaKeywords,
      IsActive: d.IsActive == true ? 1 : 0,
      OperationType: "update",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'destination', JSON.stringify(body), { headers: reqHeader });
  }

  DeleteDestination(d: Destination) {
    const body = {
      ID: d.ID,
      TourTypeID: "1",
      TourCategory: "",
      CountryID: "",
      DestinationName: "",
      BestTimeToVisit: "",
      Description: "",
      HotelID: "",
      Document: "",
      IsCustomize: 0,
      CurrencyID: 0,
      Priority: 1,
      MetaDescription: "",
      MetaTitle: "",
      MetaKeywords: "",
      IsActive: 1,
      OperationType: "delete",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'destination', JSON.stringify(body), { headers: reqHeader });
  }

  GetDestinationByID(dId: number) {
    const body = {
      ID: dId,
      TourTypeID: 0,
      TourCategory: "",
      CountryID: "",
      DestinationName: "",
      BestTimeToVisit: "",
      Description: "",
      HotelID: "",
      Document: "",
      IsCustomize: 0,
      CurrencyID: 0,
      Priority: 0,
      MetaDescription: "",
      MetaTitle: "",
      MetaKeywords: "",
      IsActive: 1,
      OperationType: "view"
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'destination', JSON.stringify(body), { headers: reqHeader });
  } 

}
