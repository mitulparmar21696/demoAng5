import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Packagerate } from './packagerate.model';
import { environment } from '../../../../environments/environment';

@Injectable()
export class PackagerateService {

  readonly rootUrl = environment.WebAPIUrl;
  private packageRate = new Packagerate();

  setter(p: Packagerate) {
    this.packageRate = p;
  }

  getter() {
    return this.packageRate;
  }

  constructor(private http: HttpClient) { }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  GetPackageRateList(packageId: number) {
    const body = {
      ID: 0,
      PackageID: packageId,
      CurrencyID: 1,
      PersonType: 1,
      Rate: 0,
      RateDescription: "",
      ThreeSharingRate: 0,
      ThreeSharingRateDescription: "",
      FourSharingRate: 0,
      FourSharingRateDescription: "",
      PackageRateTypeID: 0,
      PackageRateTypeDescription: "",
      FromDate: "",
      ToDate: "",
      Childrate_bed: 0,
      Childrate_BedDescription: "",
      Childrate: 0,
      ChildrateDescription: "",
      Infant: 0,
      InfantDescription: "",
      IsActive: 1,
      OperationType: "listing",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'packagerate', JSON.stringify(body), { headers: reqHeader });
  }

  InsertPackageRate(pr: Packagerate) {
    const body = {
      ID: 0,
      PackageID: pr.PackageID,
      CurrencyID: pr.CurrencyID,
      PersonType: pr.PersonType == true ? 1 : 0,
      Rate: pr.Rate,
      RateDescription: pr.RateDescription,
      ThreeSharingRate: pr.ThreeSharingRate,
      ThreeSharingRateDescription: pr.ThreeSharingRateDescription,
      FourSharingRate: pr.FourSharingRate,
      FourSharingRateDescription: pr.FourSharingRateDescription,
      PackageRateTypeID: pr.PackageRateTypeID,
      PackageRateTypeDescription: pr.PackageRateTypeDescription,
      FromDate: pr.FromDate,
      ToDate: pr.ToDate,
      Childrate_bed: pr.Childrate_bed,
      Childrate_BedDescription: pr.Childrate_BedDescription,
      Childrate: pr.Childrate,
      ChildrateDescription: pr.ChildrateDescription,
      Infant: pr.Infant,
      InfantDescription: pr.InfantDescription,
      IsActive: pr.IsActive == true ? 1 : 0,
      OperationType: "INSERT",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'packagerate', JSON.stringify(body), { headers: reqHeader });
  }

  UpdatePackageRate(pr: Packagerate) {
    const body = {
      ID: pr.ID,
      PackageID: pr.PackageID,
      CurrencyID: pr.CurrencyID,
      PersonType: pr.PersonType == true ? 1 : 0,
      Rate: pr.Rate,
      RateDescription: pr.RateDescription == undefined ? "" : pr.RateDescription ,
      ThreeSharingRate: pr.ThreeSharingRate,
      ThreeSharingRateDescription: pr.ThreeSharingRateDescription == undefined ? "" : pr.ThreeSharingRateDescription,
      FourSharingRate: pr.FourSharingRate,
      FourSharingRateDescription: pr.FourSharingRateDescription == undefined ? "" : pr.FourSharingRateDescription,
      PackageRateTypeID: pr.PackageRateTypeID,
      PackageRateTypeDescription: pr.PackageRateTypeDescription == undefined ? "" : pr.PackageRateTypeDescription,
      FromDate: pr.FromDate,
      ToDate: pr.ToDate,
      Childrate_bed: pr.Childrate_bed,
      Childrate_BedDescription: pr.Childrate_BedDescription == undefined ? "" : pr.Childrate_BedDescription,
      Childrate: pr.Childrate,
      ChildrateDescription: pr.ChildrateDescription == undefined ? "" : pr.ChildrateDescription,
      Infant: pr.Infant,
      InfantDescription: pr.InfantDescription == undefined ? "" : pr.InfantDescription,
      IsActive: pr.IsActive == true ? 1 : 0,
      OperationType: "update",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'packagerate', JSON.stringify(body), { headers: reqHeader });
  }

  DeletePackageRate(rateId: number, packageId: number) {
    const body = {
      ID: rateId,
      PackageID: packageId,
      CurrencyID: 1,
      PersonType: 1,
      Rate: 0,
      RateDescription: "",
      ThreeSharingRate: 0,
      ThreeSharingRateDescription: "",
      FourSharingRate: 0,
      FourSharingRateDescription: "",
      PackageRateTypeID: 0,
      PackageRateTypeDescription: "",
      FromDate: "",
      ToDate: "",
      Childrate_bed: 0,
      Childrate_BedDescription: "",
      Childrate: 0,
      ChildrateDescription: "",
      Infant: 0,
      InfantDescription: "",
      IsActive: 1,
      OperationType: "delete",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'packagerate', JSON.stringify(body), { headers: reqHeader });
  }

  GetPackageRateByID(rateId: number, packageId: number) {
    const body = {
      ID: rateId,
      PackageID: packageId,
      CurrencyID: 1,
      PersonType: 1,
      Rate: 0,
      RateDescription: "",
      ThreeSharingRate: 0,
      ThreeSharingRateDescription: "",
      FourSharingRate: 0,
      FourSharingRateDescription: "",
      PackageRateTypeID: 0,
      PackageRateTypeDescription: "",
      FromDate: "",
      ToDate: "",
      Childrate_bed: 0,
      Childrate_BedDescription: "",
      Childrate: 0,
      ChildrateDescription: "",
      Infant: 0,
      InfantDescription: "",
      IsActive: 1,
      OperationType: "view",
    };
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.rootUrl + 'packagerate', JSON.stringify(body), { headers: reqHeader });
  }

  GetPackageRateTypeList() {  
    var reqHeader = new HttpHeaders({
      //'No-Auth': 'True',
      'Accept': 'application/json'
    });
    return this.http.get(this.rootUrl + 'PackageRateTypeList', { headers: reqHeader });
  }

}
