import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IsActive } from '../../../shared/models/dd-isactive/IsActive.model';
import { environment } from '../../../../environments/environment';
import { SelectItem } from 'primeng/components/common/selectitem';
import { Packagerate } from '../shared/packagerate.model';
import { PackagerateService } from '../shared/packagerate.service';
import { CommonService } from '../shared/common.service';

@Component({
  selector: 'app-packagerate',
  templateUrl: './packagerate.component.html',
  styleUrls: ['./packagerate.component.css']
})
export class PackagerateComponent implements OnInit {

  private DropdownIsActiveList = [
    new IsActive(true, "Active"),
    new IsActive(false, "Inactive")
  ];
  private isActiveId: any;

  private DropdownPersontypeList = [
    new IsActive(true, "Per Person"),
    new IsActive(false, "Per Couple")
  ];
  private isPersontypeId: any;

  private rateTypes: any = [];
  private isRatetypeId: any;

  private packageRates: Packagerate[] = [];

  private packageRate: Packagerate;

  private selectedPackageRates: Packagerate[];

  private actions: SelectItem[] = [
    { label: 'Active', value: '1' },
    { label: 'Inactive', value: '2' },
    { label: 'Delete', value: '3' },
  ];

  cols: any[] = [
    { field: 'FromDate', header: 'From Date' },
    { field: 'ToDate', header: 'To Date' },
    { field: 'PersonType', header: 'Person Type' },
    { field: 'Rate', header: 'Rate' },
    // { field: 'RateDescription', header: 'Rate Description' },
    { field: 'ThreeSharingRate', header: 'Three Sharing Rate' },
    //{ field: 'ThreeSharingRateDescription', header: 'Three Sharing Rate Description' },
    { field: 'FourSharingRate', header: 'Four Sharing Rate' },
    //{ field: 'FourSharingRateDescription', header: 'Four Sharing Rate Description' },
    { field: 'Childrate', header: 'Child Rate' },
    //{ field: 'ChildrateDescription', header: 'Child Rate Description' },
    { field: 'Childrate_bed', header: 'Child with bed Rate' },
    //{ field: 'Childrate_BedDescription', header: 'CWB Rate Description' },
    { field: 'Infant', header: 'Infant Rate' },
    //{ field: 'InfateDescription', header: 'Infant Rate Description' },
    { field: 'IsActive', header: 'Status' },

  ];

  selectedPackagerateString: string = "";
  nameId: any;
  actionStatus: boolean;
  private buttonName: string = "ADD";

  private objPackageRate = new Packagerate();

  private localFromDate: Date;

  private localToDate: Date;

  private minDate: Date;

  private loading = false;

  constructor(private _router: Router, private _rService: PackagerateService
    , private _cService: CommonService) { }

  ngOnInit() {
    this.loading = true;
    this.isActiveId = true;
    this.isPersontypeId = true;
    this.isRatetypeId = "1";
    this.nameId = '1';
    this.minDate = new Date();
    this.localFromDate = this.minDate;
    this.localToDate = this.minDate;
    this.GetPackageRateTypeList();
    if (this._cService.packageId > 0) {
      this.GetPackageRateList();
    }
    else {
      $(document).ready(function () {
        $("#packageNav li").removeClass("active");
        $("#packageNav li:nth-child(1)").addClass("active");
      });
      this._router.navigate(['packages/list/form/package']);
    }
  }

  GetPackageRateList() {
    this._rService.GetPackageRateList(this._cService.packageId).subscribe((data: any) => {
      //console.log(data.data);
      data.data.forEach(element => {
        element.IsActive = element.IsActive == 1 ? true : false;
      });
      this.packageRates = data.data;
      this.loading = false;
    }, (error) => {
      console.log(error);
      this.loading = false;
    });
  }

  GetPackageRateTypeList() {
    this._rService.GetPackageRateTypeList().subscribe((data: any) => {
      this.rateTypes = data.data;
    }, (error) => {
      console.log(error);
    });
  }

  SavePackagerateDetails() {
    //this.objPackageRate = this.getter();
    this.objPackageRate.IsActive = this.isActiveId;
    this.objPackageRate.PersonType = this.isPersontypeId
    this.objPackageRate.PackageRateTypeID = this.isRatetypeId;
    this.objPackageRate.PackageID = this._cService.packageId;
    let fromD = this.localFromDate;
    let fromDD: number = fromD.getDate();
    let fromMM: number = fromD.getMonth() + 1;
    let fromYY: number = fromD.getFullYear();
    this.objPackageRate.FromDate = fromDD + '/' + fromMM + '/' + fromYY;

    let toD = new Date(this.localToDate);
    let toDD: number = toD.getDate();
    let toMM: number = toD.getMonth() + 1;
    let toYY: number = toD.getFullYear();
    this.objPackageRate.ToDate = toDD + '/' + toMM + '/' + toYY;

    this.objPackageRate.CurrencyID = 1;
    this.objPackageRate.PackageRateTypeDescription = "";
    if (this.objPackageRate.FromDate && this.objPackageRate.FromDate == "") {
      alert('Please enter from date');
    }
    else if (this.objPackageRate.ToDate && this.objPackageRate.ToDate == "") {
      alert('Please enter to date');
    }
    else if (this.objPackageRate.PackageRateTypeID && this.objPackageRate.PackageRateTypeID <= 0) {
      alert('Please enter person type');
    }
    else if (this.objPackageRate.Rate && this.objPackageRate.Rate <= 0) {
      alert('Please enter package rate');
    }
    else {
      this.loading = true;
      if (this.objPackageRate.ID != undefined && this.objPackageRate.ID > 0) {
        this._rService.UpdatePackageRate(this.objPackageRate).subscribe((data: any) => {
          this.packageRates = data.data;
          this.loading = false;
        }, (error) => {
          console.log(error);
          this.loading = false;
        });
      }
      else {
        this._rService.InsertPackageRate(this.objPackageRate).subscribe((data: any) => {
          this.packageRates = data.data;
          this.loading = false;
        }, (error) => {
          console.log(error);
          this.loading = false;
        });
      }
      this.CancelForm();
    }
  }

  CancelForm() {
    this.objPackageRate = new Packagerate();
    this.isActiveId = true;
    this.isPersontypeId = true;
    this.isRatetypeId = "1";
    this.localFromDate = new Date();
    this.localToDate = new Date();
    this.buttonName = "ADD";
  }

  UpdatePackagerate(pr: Packagerate) {
    this.loading = true;
    this.objPackageRate.ID = pr.ID;
    this.objPackageRate.PackageID = this._cService.packageId;    
    this.isActiveId = pr.IsActive;
    this.objPackageRate.IsActive = pr.IsActive;
    this.isPersontypeId = pr.PersonType == true ? true : false;
    this.objPackageRate.PersonType = pr.PersonType;
    this.isRatetypeId = pr.PackageRateTypeID.toString();
    this.objPackageRate.PackageRateTypeID = pr.PackageRateTypeID;
    this.objPackageRate.Rate = pr.Rate;
    this.objPackageRate.RateDescription = pr.RateDescription;
    this.objPackageRate.ThreeSharingRate = pr.ThreeSharingRate;
    this.objPackageRate.ThreeSharingRateDescription = pr.ThreeSharingRateDescription;
    this.objPackageRate.FourSharingRate = pr.FourSharingRate;
    this.objPackageRate.FourSharingRateDescription = pr.FourSharingRateDescription;
    this.objPackageRate.Childrate = pr.Childrate;
    this.objPackageRate.ChildrateDescription = pr.ChildrateDescription;
    this.objPackageRate.Childrate_bed = pr.Childrate_bed;
    this.objPackageRate.Childrate_BedDescription = pr.Childrate_BedDescription;
    this.objPackageRate.Infant = pr.Infant;
    this.objPackageRate.InfantDescription = pr.InfantDescription;
    this.localFromDate = this.ConvertDatetoMDYFormat(pr.FromDate);
    this.localToDate = this.ConvertDatetoMDYFormat(pr.ToDate);
    this.buttonName = "UPDATE";
    this.loading = false;
  }

  DeletePackagerate(pr: Packagerate) {
    if (confirm('Are you sure to delete this record?') == true) {
      this.loading = true;
      this._rService.DeletePackageRate(pr.ID, this._cService.packageId).subscribe((data: any) => {        
        this.GetPackageRateList();
      }, (error) => {
        console.log(error);
        this.loading = false;
      });
    }
  }


  PreviousPackagerate() {
    $(document).ready(function () {
      $("#packageNav li").removeClass("active");
      $("#packageNav li:nth-child(1)").addClass("active");
    });
    this._router.navigate(['packages/list/form/package']);
  }
  NextPackagerate() {
    $(document).ready(function () {
      $("#packageNav li").removeClass("active");
      $("#packageNav li:nth-child(3)").addClass("active");
    });
    this._router.navigate(['packages/list/form/itinerary']);
  }

  CustomAction() {
    //console.log(this.nameId);
    if (this.nameId && this.selectedPackageRates && this.selectedPackageRates.length > 0) {
      if (confirm('Are you sure to perform this action?') == true) {
        this.loading = true;
        this.selectedPackageRates.forEach(element => {
          this.selectedPackagerateString += element.ID + ",";
        });
        this.selectedPackagerateString = this.selectedPackagerateString.length > 0 ? this.selectedPackagerateString.substring(0, this.selectedPackagerateString.length - 1) : ""

        if (this.nameId == 1 || this.nameId == 2) {
          if (this.nameId == 1)
            this.actionStatus = true;
          else
            this.actionStatus = false;
          // this._iService.ActionStatus(this.selectedInclusionString, this.actionStatus).subscribe((data: any) => {
          //   this.GetInclusionList();
          // }, (error) => {
          //   console.log(error);
          // });
          this.loading = false;
        }
        else if (this.nameId == 3) {
          // this._iService.ActionDelete(this.selectedInclusionString).subscribe((data: any) => {
          //   this.GetInclusionList();
          // }, (error) => {
          //   console.log(error);
          // });
          this.loading = false;
        }
        else {
          this.loading = false;
          console.log('select valid action');
        }
        this.selectedPackagerateString = "";
        this.nameId = -1;
      }
    }
    else {
      alert('Please select atleast one from package rates');
    }
    this.nameId = '1';
  }

  ConvertDatetoMDYFormat(yourDate) {
    if (yourDate && yourDate.length > 0) {
      let fDay: number = +yourDate.substring(0, 2);
      let fMonth: number = +yourDate.substring(3, 5);
      let fyyyy: number = +yourDate.substring(6, 10);
      return new Date(fyyyy, fMonth - 1, fDay);
    }
  }

}
