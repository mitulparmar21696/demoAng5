import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PackageinfoService } from '../shared/packageinfo.service';
import { CommonService } from '../shared/common.service';

@Component({
  selector: 'app-package-info',
  templateUrl: './package-info.component.html',
  styleUrls: ['./package-info.component.css']
})
export class PackageInfoComponent implements OnInit {

  private tePackageInfo: string = "";
  constructor(private _router: Router, private _pService: PackageinfoService
    , private _cService: CommonService) { }

  ngOnInit() {
    if (this._cService.packageId > 0) {
      this.GetPackageInfo(this._cService.packageId);
    }
    else {
      $(document).ready(function () {
        $("#packageNav li").removeClass("active");
        $("#packageNav li:nth-child(1)").addClass("active");
      });
      this._router.navigate(['packages/list/form/package']);
    }
  }

  GetPackageInfo(id) {
    this._pService.GetPackageInfoList(id).subscribe((data: any) => {
      if (data && data.data && data.data.length > 0) {
        this.tePackageInfo = data.data[0].Info;
      }
    }, (error) => {
      console.log(error);
    });
  }

  SavePackageInfo() {
    this._pService.InsertPackageInfo(this._cService.packageId, this.tePackageInfo).subscribe((data: any) => {
      if (data && data.data && data.data.length > 0) {
        this.tePackageInfo = data.data[0].Info;
      }
    }, (error) => {
      console.log(error);
    });
  }

  CancelPackageInfo() {
    this.PreviousPackageInfo();
  }

  PreviousPackageInfo() {
    $(document).ready(function () {
      $("#packageNav li").removeClass("active");
      $("#packageNav li:nth-child(7)").addClass("active");
    });
    this._router.navigate(['packages/list/form/packagefaq']);
  }

  NextPackageInfo() {
    $(document).ready(function () {
      $("#packageNav li").removeClass("active");
      $("#packageNav li:nth-child(9)").addClass("active");
    });
    this._router.navigate(['packages/list/form/packagesupport']);
  }

}
