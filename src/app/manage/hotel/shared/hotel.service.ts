import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Hotel } from './hotel.model';
import { environment } from '../../../../environments/environment';

@Injectable()
export class HotelService {
  readonly rootUrl = environment.WebAPIUrl;
  private hotel = new Hotel();

  setter(tt: Hotel) {
    this.hotel = tt;
  }

  getter() {
    return this.hotel;
  }
  
  constructor(private http: HttpClient) { }
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
  GetfacilityList() {
    const body = {
      OperationType: "Listing"
    };
    
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'facility', JSON.stringify(body), { headers: reqHeader });
    
    }
  GetHotelList() {
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
    return this.http.post(this.rootUrl + 'hotel', JSON.stringify(body), { headers: reqHeader });
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
  InsertHotel(tt: Hotel) {
    const body = {
      ID:"0",
      PackageID:"0",
      DestinationID:"0",
      Name: tt.Name,
      Description: tt.Description,
      Address: tt.Address,
      Landmark: tt.Landmark,
      CountryID: tt.CountryID,
      CityID: tt.CityID,
      Zipcode: tt.ZipCode,
      MobileNo: tt.Mobile,
      Website: tt.Website,
      Landline: tt.Landline,
      Email: tt.Email,
      Rating: tt.Rating,
      Star: tt.Star,
      FacilityID: '1',
    
      FacilityType: '0',
      IsActive: tt.IsActive == true ? 1 : 0,
      OperationType: "INSERT"
    };

    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'hotel', JSON.stringify(body), { headers: reqHeader });
    // .map((response: Response) => response.json())
    // .catch(this.handleError);
  }

  UpdateHotel(tt: Hotel) {
    const body = {
      ID:tt.ID,
      PackageID:"0",
      DestinationID:"0",
      Name: tt.Name,
      Description: tt.Description,
      Address: tt.Address,
      Landmark: tt.Landmark,
      CountryID: tt.CountryID,
      CityID: tt.CityID,
      Zipcode: tt.ZipCode,
      MobileNo: tt.Mobile,
      Website: tt.Website,
      Landline: tt.Landline,
      Email: tt.Email,
      Rating: tt.Rating,
      Star: tt.Star,
      FacilityID: '1',
    
      FacilityType: '0',
      IsActive: tt.IsActive == true ? 1 : 0,
      OperationType: "update"
    };

    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'hotel', JSON.stringify(body), { headers: reqHeader });
    // .map((response: Response) => response.json())
    // .catch(this.handleError);
  }
//  ActionStatus(tt: Hotel) {
//     const body = {
      
//       IsActive: tt.IsActive == true ? 1 : 0,
//       OperationType: "actionstatus"
//     };

//     var reqHeader = new HttpHeaders({
//       'Content-Type': 'application/json'
//     });
//     return this.http.post(this.rootUrl + 'hotel', JSON.stringify(body), { headers: reqHeader });
//     // .map((response: Response) => response.json())
//     // .catch(this.handleError);
//   }
  DeleteHotel(tt: Hotel) {

    const body = {
      ID: tt.ID,
      Name: "INTERNATIONAL",
      IsActive: "1",
      OperationType: "delete"
    };
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'hotel', JSON.stringify(body), { headers: reqHeader });
    // .map((response: Response) => response.json())
    // .catch(this.handleError);

  }

  GetHotelByID(tt: Hotel) {

    const body = {
      ID: tt.ID,
      Name: "INTERNATIONAL",
      IsActive: "1",
      OperationType: "view"
    };
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'hotel', JSON.stringify(body), { headers: reqHeader })
      .map((response: Response) => response.json())
      .catch(this.handleError);

  }

  UploadImage(id: number, formData: FormData) {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    });
    return this.http.post(this.rootUrl + 'hotelimageupload/' + id + '/image', formData, { headers: reqHeader });
    // .map((response: Response) => response.json())
    // .catch(this.handleError);
  }
  UploadHotelImage(toSendObj:any,formData: FormData){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    });
    var url=this.rootUrl + 'hotelimage/0/'+toSendObj.Hotelid+'/'+toSendObj.hotelName+'/1/'+toSendObj.operationtype;
    return this.http.post(url, formData, { headers: reqHeader });
  }
  SubActionStatus(ft, isActive: boolean) {
    const body = {
      ID: ft.ID,
      Name: "",
      Description: "",
      IsActive:  isActive == true ? 1 : 0,
      OperationType: "actionstatus"
    };

    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'hotel', JSON.stringify(body), { headers: reqHeader });
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
    return this.http.post(this.rootUrl + 'hotel', JSON.stringify(body), { headers: reqHeader });
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
    return this.http.post(this.rootUrl + 'hotel', JSON.stringify(body), { headers: reqHeader });
  }

}
