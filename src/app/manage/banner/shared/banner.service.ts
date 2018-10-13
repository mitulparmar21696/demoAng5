import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Banner } from './banner.model';
import { environment } from '../../../../environments/environment';

@Injectable()
export class BannerService {
  readonly rootUrl = environment.WebAPIUrl;
  private banner = new Banner();
  banners: Banner[] = [];

getbanners(){
  return this.banners;
}
setbanners(tt: Banner[]){
  this.banners = tt;
}
  setter(tt: Banner) {
    this.banner = tt;
  }

  getter() {
    return this.banner;
  }
  
  constructor(private http: HttpClient) { }
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
  
  GetBannerList() {
    const body = {
     
      OperationType:"listing"
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'banners', JSON.stringify(body), { headers: reqHeader });
    // .map((response: Response) => response.json())
    // .catch(this.handleError);
  }
  GetDestination() {
    const body = {
      
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.get(this.rootUrl + 'GetBannerDestinationList', { headers: reqHeader });
    // .map((response: Response) => response.json())
    // .catch(this.handleError);
  }
  GetPackageList(tttype) {
    const body = {
     
      DestinationID:tttype
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'GetBannerPackageList', JSON.stringify(body), { headers: reqHeader });
    // .map((response: Response) => response.json())
    // .catch(this.handleError);
  }
  InsertBanner(tt: Banner) {
   if (tt.BannerType =='1') {
    const body = {
      ID:"0",
      BannerID: tt.DestinationID,
      BannerType: tt.BannerType,
      BannerTitle:tt.BannerTitle,
      BannerKey: '2',
      BannerImage: tt.BannerImage,
      BannerFor: tt.BannerFor,
      FromDate: tt.FromDate,
      ToDate: tt.ToDate,
      AltTag: tt.AltTag,
      TitleTag: tt.TitleTag,
      IsPackage: '1',
      IsActive: tt.IsActive == true ? 1 : 0,
      OperationType: "INSERT"
    };
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'banners', JSON.stringify(body), { headers: reqHeader });
   }
   else if (tt.BannerType =='2'){
    const body1 = {
      ID:"0",
      BannerID: tt.PackageID,
      BannerType: tt.BannerType,
      BannerTitle:tt.BannerTitle,
      BannerKey: '2',
      BannerImage: tt.BannerImage,
      BannerFor: tt.BannerFor,
      FromDate: tt.FromDate,
      ToDate: tt.ToDate,
      AltTag: tt.AltTag,
      TitleTag: tt.TitleTag,
      IsPackage: '2',
      IsActive: tt.IsActive == true ? 1 : 0,
      OperationType: "INSERT"
    };
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'banners', JSON.stringify(body1), { headers: reqHeader });
  }
  else if (tt.BannerType =='3'){
    const body2 = {
      ID:"0",
      BannerID: '0',
      BannerTitle:tt.BannerTitle,
      BannerType: tt.BannerType,
      BannerKey: '2',
      BannerImage: tt.BannerImage,
      BannerFor: tt.BannerFor,
      FromDate: tt.FromDate,
      ToDate: tt.ToDate,
      AltTag: tt.AltTag,
      TitleTag: tt.TitleTag,
      IsPackage: '0',
      IsActive: tt.IsActive == true ? 1 : 0,
      OperationType: "INSERT"
    };
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'banners', JSON.stringify(body2), { headers: reqHeader });
  }
    // .map((response: Response) => response.json())
    // .catch(this.handleError);
  }

  UpdateBanner(tt: Banner) {
    if (tt.BannerType =='1') {
      const body = {
        ID:tt.ID,
        BannerID: tt.DestinationID,
        BannerType: tt.BannerType,
        BannerTitle:tt.BannerTitle,
        BannerKey: '2',
        BannerImage: tt.BannerImage,
        BannerFor: tt.BannerFor,
        FromDate: tt.FromDate,
        ToDate: tt.ToDate,
        AltTag: tt.AltTag,
        TitleTag: tt.TitleTag,
        IsPackage: '2',
        IsActive: tt.IsActive == true ? 1 : 0,
        OperationType: "update"
      };
      var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      return this.http.post(this.rootUrl + 'banners', JSON.stringify(body), { headers: reqHeader });
     }
     else if (tt.BannerType =='2'){
      const body1 = {
        ID:tt.ID,
        BannerID: tt.PackageID,
        BannerType: tt.BannerType,
        BannerTitle:tt.BannerTitle,
        BannerKey: '2',
        BannerImage: tt.BannerImage,
        BannerFor: tt.BannerFor,
        FromDate: tt.FromDate,
        ToDate: tt.ToDate,
        AltTag: tt.AltTag,
        TitleTag: tt.TitleTag,
        IsPackage: '2',
        IsActive: tt.IsActive == true ? 1 : 0,
        OperationType: "update"
      };
      var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      return this.http.post(this.rootUrl + 'banners', JSON.stringify(body1), { headers: reqHeader });
    }
    else if (tt.BannerType =='3'){
      const body2 = {
        ID:tt.ID,
        BannerID: '0',
        BannerTitle:tt.BannerTitle,
        BannerType: tt.BannerType,
        BannerKey: '2',
        BannerImage: tt.BannerImage,
        BannerFor: tt.BannerFor,
        FromDate: tt.FromDate,
        ToDate: tt.ToDate,
        AltTag: tt.AltTag,
        TitleTag: tt.TitleTag,
        IsPackage: '0',
        IsActive: tt.IsActive == true ? 1 : 0,
        OperationType: "update"
      };
      var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      return this.http.post(this.rootUrl + 'banners', JSON.stringify(body2), { headers: reqHeader });
    }
    
    // .map((response: Response) => response.json())
    // .catch(this.handleError);
  }
//  ActionStatus(tt: Banner) {
//     const body = {
      
//       IsActive: tt.IsActive == true ? 1 : 0,
//       OperationType: "actionstatus"
//     };

//     var reqHeader = new HttpHeaders({
//       'Content-Type': 'application/json'
//     });
//     return this.http.post(this.rootUrl + 'Banner', JSON.stringify(body), { headers: reqHeader });
//     // .map((response: Response) => response.json())
//     // .catch(this.handleError);
//   }
  DeleteBanner(tt: Banner) {

    const body = {
      ID: tt.ID,
      Name: "INTERNATIONAL",
      IsActive: "1",
      OperationType: "delete"
    };
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'banners', JSON.stringify(body), { headers: reqHeader });
    // .map((response: Response) => response.json())
    // .catch(this.handleError);

  }

  GetBannerByID(tt: Banner) {

    const body = {
      ID: tt.ID,
      Name: "INTERNATIONAL",
      IsActive: "1",
      OperationType: "view"
    };
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'banners', JSON.stringify(body), { headers: reqHeader })
      .map((response: Response) => response.json())
      .catch(this.handleError);

  }

  UploadImage(id: number, formData: FormData) {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    });
    return this.http.post(this.rootUrl + 'bannersimageupload/' + id + '/image', formData, { headers: reqHeader });
    // .map((response: Response) => response.json())
    // .catch(this.handleError);
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
    return this.http.post(this.rootUrl + 'banners', JSON.stringify(body), { headers: reqHeader });
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
    return this.http.post(this.rootUrl + 'banners', JSON.stringify(body), { headers: reqHeader });
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
    return this.http.post(this.rootUrl + 'banners', JSON.stringify(body), { headers: reqHeader });
  }
}
