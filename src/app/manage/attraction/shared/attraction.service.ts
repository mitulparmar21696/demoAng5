import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.prod';
import { Attraction } from './attraction.model';
import { Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


const reqHeader = new HttpHeaders({
  'Content-Type': 'application/json'
});

@Injectable()
export class AttractionService {

  readonly rootUrl = environment.WebAPIUrl;
  private attractionType = new Attraction();
  private attractions: Attraction[];

  setter(attraction: Attraction) {
    this.attractionType = attraction;
  }

  getter() {
    return this.attractionType
  }

  set_attractions( attractions: Attraction[]) {
    this.attractions = attractions;
  }

  getAttractions() {
    return this.attractions;
  }
  constructor(private http: HttpClient) { }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  GetAttractionList() {
    const body = {
      ID: "",
      Name: "INTERNATIONAL",
      Description: "INTERNATIONAL",
      IsActive: "1",
      OperationType: "listing"
    };
    return this.http.post(this.rootUrl + 'AttractionType', JSON.stringify(body), { headers: reqHeader });
    // .map((response: Response) => response.json())
    // .catch(this.handleError);
  }

  InsertAttraction(attraction: Attraction) {
    const body = {
      ID: "",
      Name: attraction.Name,
      Description: attraction.Description,
      IsActive: attraction.IsActive,
      OperationType: "INSERT"
    };

    return this.http.post(this.rootUrl + 'AttractionType', JSON.stringify(body), { headers: reqHeader });
  }

  UpdateAttraction(attraction: Attraction) {
    const body = {
      ID: attraction.ID,
      Name: attraction.Name,
      Description: attraction.Description,
      IsActive: attraction.IsActive,
      OperationType: "update"
    };

    return this.http.post(this.rootUrl + 'AttractionType', JSON.stringify(body), { headers: reqHeader });
  }

  DeleteAttraction(attraction: Attraction) {

    const body = {
      ID: attraction.ID,
      Name: "INTERNATIONAL",
      Description: "INTERNATIONAL",
      IsActive: "1",
      OperationType: "delete"
    };
    return this.http.post(this.rootUrl + 'AttractionType', JSON.stringify(body), { headers: reqHeader });
  }

  GetAttractionByID(attraction: Attraction) {

    const body = {
      ID: attraction.ID,
      Name: "INTERNATIONAL",
      Description: "INTERNATIONAL",
      IsActive: "1",
      OperationType: "view"
    };
    return this.http.post(this.rootUrl + 'AttractionType', JSON.stringify(body), { headers: reqHeader })
      .map((response: Response) => response.json())
      .catch(this.handleError);

  }

  UploadImage(id: number, formData: FormData) {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    });
    return this.http.post(this.rootUrl + 'attractiontypeimageupload/' + id + '/image', formData, { headers: reqHeader });
  }

  ActionStatus(id: string, isActive: string) {
    const body = {
      ID: id,
      Name: "",
      Description: "",
      IsActive:  isActive == "Active" ? 1: 0 ,
      OperationType: "actionstatus"
    };

    return this.http.post(this.rootUrl + 'AttractionType', JSON.stringify(body), { headers: reqHeader });
  }

  ActionDelete(id: string) {
    const body = {
      ID: id,
      Name: "",
      Description: "",
      IsActive: 0,
      OperationType: "actiondelete"
    };

    return this.http.post(this.rootUrl + 'AttractionType', JSON.stringify(body), { headers: reqHeader });
  }
  
}
