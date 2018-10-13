import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/forkJoin';
import { Package } from './package.model';
import { environment } from '../../../../environments/environment';
import { NumberFormatStyle } from '@angular/common';
import { PackageImageOperations } from './package-image-operations.model';


@Injectable()
export class PackageService {

  readonly rootUrl = environment.WebAPIUrl;
  private package = new Package();

  setter(p: Package) {
    this.package = p;
  }

  getter() {
    return this.package;
  }

  constructor(private http: HttpClient) { }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  GetPackageList(destinationId: number) {
    const body = {
      ID: 0,
      DestinationID: destinationId,
      PackageName: "",
      Day: 0,
      Night: 0,
      Description: "",
      Notes: "",
      IsDiscount: 0,
      Discount: 0,
      IsRupees: 0,
      FacilityID: "1,2",
      UserID: 0,
      IsCustomize: 0,
      IsFixedDate: 0,
      IsGroupPackage: 0,
      MinAmountPaid: 0,
      FixedDate: "",
      IsActive: 1,
      OperationType: "listing",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'package', JSON.stringify(body), { headers: reqHeader });
  }

  InsertPackage(p: Package) {
    const body = {
      ID: 0,
      DestinationID: p.DestinationID,
      PackageName: p.PackageName,
      Day: p.Day,
      Night: p.Night,
      Description: p.Description,
      Notes: p.Notes,
      IsDiscount: p.IsDiscount === true ? 1 : 0,
      Discount: p.Discount,
      IsRupees: p.IsRupees === true ? 1 : 0,
      FacilityID: p.FacilityID,
      UserID: 0,
      IsCustomize: 0,
      IsFixedDate: p.IsFixedDate === true ? 1 : 0,
      FixedDate: p.FixedDate,
      IsGroupPackage: p.IsGroupPackage === true ? 1 : 0,
      MinAmountPaid: p.MinAmountPaid,
      IsActive: p.IsActive === true ? 1 : 0,
      OperationType: "INSERT",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'package', JSON.stringify(body), { headers: reqHeader });
  }

  UpdatePackage(p: Package) {
    const body = {
      ID: p.ID,
      DestinationID: p.DestinationID,
      PackageName: p.PackageName,
      Day: p.Day,
      Night: p.Night,
      Description: p.Description,
      Notes: p.Notes,
      IsDiscount: p.IsDiscount === true ? 1 : 0,
      Discount: p.Discount,
      IsRupees: p.IsRupees === true ? 1 : 0,
      FacilityID: p.FacilityID,
      UserID: 0,
      IsCustomize: 0,
      IsFixedDate: p.IsFixedDate === true ? 1 : 0,
      FixedDate: p.FixedDate,
      IsGroupPackage: p.IsGroupPackage === true ? 1 : 0,
      MinAmountPaid: p.MinAmountPaid,
      IsActive: p.IsActive === true ? 1 : 0,
      OperationType: "update",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'package', JSON.stringify(body), { headers: reqHeader });
  }

  DeletePackage(packageId: number, destinationId: number) {
    const body = {
      ID: packageId,
      DestinationID: destinationId,
      PackageName: "",
      Day: 0,
      Night: 0,
      Description: "",
      Notes: "",
      IsDiscount: 0,
      Discount: 0,
      IsRupees: 0,
      FacilityID: "1,2",
      UserID: 0,
      IsCustomize: 0,
      IsFixedDate: 0,
      FixedDate: "",
      IsGroupPackage: 0,
      MinAmountPaid: 0,
      IsActive: 1,
      OperationType: "delete",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'package', JSON.stringify(body), { headers: reqHeader });
  }

  ActionOperationPackage(packageId: string, actionStatus: boolean, operationType: string) {
    const body = {
      ID: packageId,
      DestinationID: 0,
      PackageName: "",
      Day: 0,
      Night: 0,
      Description: "",
      Notes: "",
      IsDiscount: 0,
      Discount: 0,
      IsRupees: 0,
      FacilityID: "1,2",
      UserID: 0,
      IsCustomize: 0,
      IsFixedDate: 0,
      FixedDate: "",
      IsGroupPackage: 0,
      MinAmountPaid: 0,
      IsActive: actionStatus == true ? 1 : 0,
      OperationType: operationType,
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'package', JSON.stringify(body), { headers: reqHeader });
  }

  GetPackageByID(packageId: number, destinationId: number) {
    const body = {
      ID: packageId,
      DestinationID: destinationId,
      PackageName: "",
      Day: 0,
      Night: 0,
      Description: "",
      Notes: "",
      IsDiscount: 0,
      Discount: 0,
      IsRupees: 0,
      FacilityID: "1,2",
      UserID: 0,
      IsCustomize: 0,
      IsFixedDate: 0,
      IsGroupPackage: 0,
      MinAmountPaid: 0,
      FixedDate: "",
      IsActive: 1,
      OperationType: "view",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'package', JSON.stringify(body), { headers: reqHeader });
  }

  UploadPackageDocumentImage(packageId: number, operationType: string, formData: FormData) {
    var url = this.rootUrl + 'packagedocument/' + packageId + '/' + operationType;
    var reqHeader = new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    });
    return this.http.post(url, formData, { headers: reqHeader });
  }

  PackageImageOperations(id: number, imageId: number, packageId: number, isMain: boolean, operationType: string) {
    const body = {
      ID: id,
      ImageID: imageId,
      PackageID: packageId,
      IsMain: isMain == true ? 0 : 1,
      OperationType: operationType,
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'packageimage', JSON.stringify(body), { headers: reqHeader });
  }

  
  MultiplePackageOperations(piOperation : PackageImageOperations[]) {
    let index = 0
    let urls : any[] = [];
    piOperation.forEach(element => {
      const body = {
        ID: element.ID,
        ImageID: element.ImageID,
        PackageID: element.PackageID,
        IsMain: element.IsMain == true ? 1 : 0,
        OperationType: element.operationName,
      };
      var reqHeader = new HttpHeaders({
        //'No-Auth': 'True',
        'Content-Type': 'application/json'
      });
      urls.push(this.http.post(this.rootUrl + 'packageimage', JSON.stringify(body), { headers: reqHeader }).map(res => JSON.stringify(res)));      
    });
    return Observable.forkJoin(urls);
  }

  GetFacility(id: number, name: string, description: string, isActive: boolean, operationType: string) {
    const body = {
      ID: id,
      Name: name,
      Description: description,
      IsActive: isActive == true ? 0 : 1,
      OperationType: operationType, //listingfacility
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'facility', JSON.stringify(body), { headers: reqHeader });
  }
}

