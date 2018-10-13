import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IsActive } from '../../../shared/models/dd-isactive/IsActive.model';
import { environment } from '../../../../environments/environment';
import { SelectItem } from 'primeng/components/common/selectitem';
import { Packagesupport } from '../shared/packagesupport.model';
import { PackagesupportService } from '../shared/packagesupport.service';
import { CommonService } from '../shared/common.service';

@Component({
  selector: 'app-package-support',
  templateUrl: './package-support.component.html',
  styleUrls: ['./package-support.component.css']
})
export class PackageSupportComponent implements OnInit {

  private DropdownIsActiveList = [
    new IsActive(true, "Active"),
    new IsActive(false, "Inactive")
  ];
  private isActiveId: any;

  private packageSupports: Packagesupport[] = [];

  //private packageSupport: Packagesupport;

  private buttonName: string = "ADD";

  private objPackageSupport = new Packagesupport();

  private countries: any = [];
  private countryId: any;

  private states: any = [];
  private stateId: any;

  private cities: any = [];
  private cityId: any;


  cols: any[] = [
    { field: 'SupportName', header: 'Title' },
    { field: 'MobileNo', header: 'Mobile No' },
    { field: 'Email', header: 'Email' },
    { field: 'Remarks', header: 'Remarks' },
    { field: 'IsActive', header: 'Status' },

  ];

  private loading = false;

  constructor(private _router: Router
    , private _cService: CommonService
    , private _pService: PackagesupportService) { }

  ngOnInit() {
    this.loading = true;
    this.isActiveId = true;
    this.countryId = 0;
    this.stateId = 0;
    this.cityId = 0;
    this.GetCountyList();
    if (this._cService.packageId > 0) {
      this.GetPackageSupportList();
    }
    else {
      this.loading = false;      
      $(document).ready(function () {
        $("#packageNav li").removeClass("active");
        $("#packageNav li:nth-child(1)").addClass("active");
      });
      this._router.navigate(['packages/list/form/package']);
    }
  }

  GetPackageSupportList() {
    this._pService.GetPackageSupportList(this._cService.packageId, this._cService.destinationId).subscribe((data: any) => {
      this.packageSupports = data.data;
      this.loading = false;
    }, (error) => {
      console.log(error);
      this.loading = false;
    });
  }

  SavePackageSupport() {
    this.objPackageSupport.Remarks
    this.objPackageSupport.IsActive = this.isActiveId;
    this.objPackageSupport.CityID = this.cityId
    this.objPackageSupport.StateID = this.stateId;
    this.objPackageSupport.CountryID = this.countryId;
    this.objPackageSupport.PackageID = this._cService.packageId;
    this.objPackageSupport.DestinationID = this._cService.destinationId;
    if (this.objPackageSupport.Remarks == undefined || this.objPackageSupport.Remarks == null) {
      this.objPackageSupport.Remarks == "";
    }
    if (this.objPackageSupport.SupportName && this.objPackageSupport.SupportName == "") {
      alert('Please enter support name');
    }
    else if (this.objPackageSupport.MobileNo && this.objPackageSupport.MobileNo == "") {
      alert('Please enter mobile number');
    }
    else if (this.objPackageSupport.MobileNo.length < 10 && this.objPackageSupport.MobileNo.length > 13) {
      alert('Invalid mobile number');
    }
    else if (this.objPackageSupport.EmailID && this.objPackageSupport.EmailID == "") {
      alert('Please enter email');
    }
    else if (!this.validateEmail(this.objPackageSupport.EmailID)) {
      alert('Invalid Email');
    }
    else if(this.objPackageSupport.CountryID == "" || this.objPackageSupport.CountryID =="0"){
      alert('Please select country');
    }
    else if(this.objPackageSupport.StateID == "" || this.objPackageSupport.StateID =="0"){
      alert('Please select state');
    }
    else if(this.objPackageSupport.CityID == "" || this.objPackageSupport.CityID =="0"){
      alert('Please select city');
    }
    else {
      this.loading = true;
      let operationType: string = "";
      if (this.objPackageSupport.ID != undefined && this.objPackageSupport.ID > 0) {
        operationType = "update";
      }
      else {
        this.objPackageSupport.ID = 0;
        operationType = "insert";
      }
      this._pService.InsertUpdatePackageSupport(this.objPackageSupport, operationType).subscribe((data: any) => {
        if (data.status == 200) {
          this.packageSupports = data.data;
          this.loading = false;
        }
        else {
          this.loading = false;
          alert(data.message);
        }
      }, (error) => {
        console.log(error);
        this.loading = false;
      });
      this.CancelForm();
    }
  }

  validateEmail(supportEmail: string) {
    var atpos = supportEmail.indexOf("@");
    var dotpos = supportEmail.lastIndexOf(".");
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= supportEmail.length) {
      return false;
    }
    return true;

  }

  UpdatePackageSupport(ps: Packagesupport) {
    this.loading = true;
    this.objPackageSupport.ID = ps.ID;
    this.isActiveId = ps.IsActive == true ? true : false;
    this.objPackageSupport.IsActive = this.isActiveId;
    this.objPackageSupport.SupportName = ps.SupportName;
    this.objPackageSupport.MobileNo = ps.MobileNo;
    this.objPackageSupport.EmailID = ps.EmailID;
    this.objPackageSupport.Remarks = ps.Remarks;
    this.objPackageSupport.CountryID = ps.CountryID;
    this.objPackageSupport.StateID = ps.StateID;
    this.objPackageSupport.CityID = ps.CityID;
    this.countryId = +ps.CountryID;
    this.buttonName = "UPDATE";
    this.GetStateList(+ps.CountryID);
    this.GetCityList(+ps.StateID);    
  }

  DeletePackageSupport(ps: Packagesupport) {
    if (confirm('Are you sure to delete this record?') == true) {
      this._pService.DeletePackageSupport(ps.ID, this._cService.packageId, this._cService.destinationId).subscribe((data: any) => {
        this.GetPackageSupportList();
      }, (error) => {
        console.log(error);
      });
    }
  }

  GetCountyList() {
    this._pService.GetCountryList().subscribe((data: any) => {
      if (data.data && data.data.length > 0) {
        this.countries = data.data;
        if (this.objPackageSupport.ID == undefined || this.objPackageSupport.ID <= 0) {
          this.countryId = 0
        }
        else {
          if (this.objPackageSupport.CountryID && +this.objPackageSupport.CountryID >= 0)
            this.countryId = +this.objPackageSupport.CountryID;
          else
            this.countryId = 0;
        }
      }
      else {
        this.countryId = 0;
      }
    }, (error) => {
      console.log(error);
    });
  }

  onCountryChange() {
    this.loading = true;
    this.states = [];
    this.stateId = 0;
    this.cities = [];
    this.cityId = 0;
    this.GetStateList(this.countryId);
  }

  onStateChange() {
    this.loading = true;
    this.cities = [];
    this.cityId = 0;
    this.GetCityList(this.stateId);
  }

  GetStateList(cId: number) {
    this._pService.GetStateList(cId).subscribe((data: any) => {
      if (data.data && data.data.length > 0) {
        this.states = data.data;
        if (this.objPackageSupport.ID == undefined || this.objPackageSupport.ID <= 0) {
          this.stateId = 0
        }
        else {
          if (this.objPackageSupport.StateID && +this.objPackageSupport.StateID >= 0)
            this.stateId = this.objPackageSupport.StateID.toString();
          else
            this.stateId = 0;
        }
      }
      else {
        this.stateId = 0;
      }
      this.loading = false;
    }, (error) => {
      console.log(error);
      this.loading = false;
    });
  }

  GetCityList(sId: number) {
    this._pService.GetCityList(sId).subscribe((data: any) => {
      if (data.data && data.data.length > 0) {
        this.cities = data.data;
        if (this.objPackageSupport.ID == undefined || this.objPackageSupport.ID <= 0) {
          this.cityId = 0;
        }
        else {
          if (this.objPackageSupport.CityID && +this.objPackageSupport.CityID >= 0)
            this.cityId = this.objPackageSupport.CityID.toString();
          else
            this.cityId = 0;
        }
      }
      else {
        this.cityId = 0;
      }
      this.loading = false;
    }, (error) => {
      console.log(error);
      this.loading = false;
    });
  }

  PreviousPackageSupport() {
    $(document).ready(function () {
      $("#packageNav li").removeClass("active");
      $("#packageNav li:nth-child(7)").addClass("active");
    });
    this._router.navigate(['packages/list/form/packagefaq']);
  }

  CancelForm() {
    this.objPackageSupport = new Packagesupport();
    this.isActiveId = true;
    this.countryId = 0;
    this.stateId = 0;
    this.cityId = 0;
    this.buttonName = "ADD";
  }

}
