import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Attraction } from './attraction.model';
import { environment } from '../../../../environments/environment';

@Injectable()
export class AttractionService {

  readonly rootUrl = environment.WebAPIUrl;
  private attraction = new Attraction();

  setter(tt: Attraction) {
    this.attraction = tt;
  }

  getter() {
    return this.attraction;
  }
  
  constructor(private http: HttpClient) { }
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
  
  
  GetAttractionList() {
    const body = {
      ID:"34",
      PackageID:"33",
      DestinationID:"33",
      Name:"33",
      Description:"33",
      Address:"33",
      Landmark:"33",
      CountryID:"33",
      CityID:"33",
      Zipcode:"33",
      MobileNo:"33",
      Website:"33",
      Landline:"33",
      Email:"33",
      Rating:"33",
      Star:"33",
      FacilityID:"33",
      IsActive:"0",
      FacilityType:"33",
      OperationType:"listing"
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'attractionEntry', JSON.stringify(body), { headers: reqHeader });
    // .map((response: Response) => response.json())
    // .catch(this.handleError);
  }
  GetCountryWiseState(event) {
    const body = {
      CountryID:event,
     
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'CountryWiseState', JSON.stringify(body), { headers: reqHeader });
    // .map((response: Response) => response.json())
    // .catch(this.handleError);
  }
  Getstatewisecity(event) {
    const body = {
      StateID:event,
     
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'StateWiseCity', JSON.stringify(body), { headers: reqHeader });
    // .map((response: Response) => response.json())
    // .catch(this.handleError);
  }
  GetAttractionType() {
    
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.get(this.rootUrl + 'GetAttractionTypeList', { headers: reqHeader });
    // .map((response: Response) => response.json())
    // .catch(this.handleError);
  }
  InsertAttraction(tt: Attraction) {
    const body = {
      ID:"0",
     
      AttractionTypeID: tt.AttractionTypeID,
      CityID: tt.CityID,
      AttractionName: tt.AttractionName,
      Description: tt.Description,
      CountryID: tt.CountryID,
      IsActive: tt.IsActive == true ? 1 : 0,
      OperationType: "INSERT"
    };

    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'attractionEntry', JSON.stringify(body), { headers: reqHeader });
    // .map((response: Response) => response.json())
    // .catch(this.handleError);
  }

  UpdateAttraction(tt: Attraction) {
    const body = {
      ID:tt.ID,
      AttractionTypeID: tt.AttractionTypeID,
      CityID: tt.CityID,
      AttractionName: tt.AttractionName,
      Description: tt.Description,
      CountryID: tt.CountryID,
      IsActive: tt.IsActive == true ? 1 : 0,
    
      OperationType: "update"
    };

    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'attractionEntry', JSON.stringify(body), { headers: reqHeader });
    // .map((response: Response) => response.json())
    // .catch(this.handleError);
  }
//  ActionStatus(tt: attraction) {
//     const body = {
      
//       IsActive: tt.IsActive == true ? 1 : 0,
//       OperationType: "actionstatus"
//     };

//     var reqHeader = new HttpHeaders({
//       'Content-Type': 'application/json'
//     });
//     return this.http.post(this.rootUrl + 'attraction', JSON.stringify(body), { headers: reqHeader });
//     // .map((response: Response) => response.json())
//     // .catch(this.handleError);
//   }
  DeleteAttraction(tt: Attraction) {

    const body = {
      ID: tt.ID,
      Name: "INTERNATIONAL",
      IsActive: "1",
      OperationType: "delete"
    };
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'attractionEntry', JSON.stringify(body), { headers: reqHeader });
    // .map((response: Response) => response.json())
    // .catch(this.handleError);

  }

  GetAttractionByID(tt: Attraction) {

    const body = {
      ID: tt.ID,
      Name: "INTERNATIONAL",
      IsActive: "1",
      OperationType: "view"
    };
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'attractionEntry', JSON.stringify(body), { headers: reqHeader })
      .map((response: Response) => response.json())
      .catch(this.handleError);

  }

  UploadImage(id: number, formData: FormData) {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    });
    return this.http.post(this.rootUrl + 'attractionimageupload/' + id + '/image', formData, { headers: reqHeader });
    // .map((response: Response) => response.json())
    // .catch(this.handleError);
  }
  
  UploadAttractionImage(toSendObj:any,formData: FormData){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    });
    var url=this.rootUrl + 'attractionimage/0/'+toSendObj.attractionId+'/'+toSendObj.attractionName+'/'+toSendObj.Ismain+'/'+toSendObj.operationtype;
    return this.http.post(url, formData, { headers: reqHeader });
  }
  getAttractionImage(toSendObj:any){
    var data={}
    var reqHeader = new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    });
    var url=this.rootUrl + 'attractionimage/0/'+toSendObj.attractionId+'/'+toSendObj.attractionName+'/0/listing';
    return this.http.post(url,data, { headers: reqHeader });
  }
  deleteAttractionImage(toSendObj:any){
    var data={}
    var reqHeader = new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    });
    var url=this.rootUrl + 'attractionimage/'+toSendObj.imageId+'/'+toSendObj.attractionId+'/'+toSendObj.attractionName+'/0/delete';
    return this.http.post(url,data, { headers: reqHeader });
  }
  SubActionStatus(ft, isActive: boolean) {
    const body = {
      ID: ft,
      IsActive:  isActive == true ? 1 : 0,
      OperationType: "actionstatus"
    };

    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'attractionEntry', JSON.stringify(body), { headers: reqHeader });
  }

  ActionStatus(id: string, isActive: boolean) {
    const body = {
      ID: id,
      Name: "",
      Description: "",
      IsActive:  isActive == true ? 1 : 0,
      OperationType: "actionstatus"
    };

    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'attractionEntry', JSON.stringify(body), { headers: reqHeader });
  }

  ActionDelete(id: string) {
    const body = {
      ID: id,
      Name: "",
      IsActive: 0,
      OperationType: "actiondelete"
    };

    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'attractionEntry', JSON.stringify(body), { headers: reqHeader });
  }


}
