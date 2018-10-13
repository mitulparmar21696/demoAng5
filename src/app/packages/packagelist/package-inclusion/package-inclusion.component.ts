import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../shared/common.service';
import { DestinationinclusionService } from '../../../tour/tourdestination/shared/destinationinclusion.service';
import { PackageinclusionService } from '../shared/packageinclusion.service';
import { ArrayToStringService } from '../../../shared/services/ArrayToString.service';
import { DestinationInclusion } from '../../../tour/tourdestination/shared/destinationinclusion.model';

@Component({
  selector: 'app-package-inclusion',
  templateUrl: './package-inclusion.component.html',
  styleUrls: ['./package-inclusion.component.css']
})
export class PackageInclusionComponent implements OnInit {

  private allInclusions: DestinationInclusion[] = [];

  private destinationInclusions: DestinationInclusion[] = [];
  private destinationInclusionId: any;

  private destinationExclusions: DestinationInclusion[] = [];
  private destinationExclusionId: any;

  private packageInclusions: DestinationInclusion[] = [];
  private packageInclusionId: any;

  private packageExclusions: DestinationInclusion[] = [];
  private packageExclusionId: any;

  private pqId: number = 0;

  private isClicked: boolean = false;

  private loading = false;

  constructor(private _router: Router
    , private _cService: CommonService
    , private _dService: DestinationinclusionService
    , private _pService: PackageinclusionService
    , private _arrayService: ArrayToStringService) { }

  ngOnInit() {
    this.loading = true;
    this.GetAllInclusionList(this._cService.destinationId);
    if (this._cService.packageId > 0) {
      this.GetPackageInclusionExclusion(this._cService.packageId);
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

  GetAllInclusionList(destinationId: number) {
    this._dService.GetDestinationInclusionList(destinationId).subscribe((data: any) => {
      data.data.forEach(element => {
        if (element.TypeName === "Inclusion" && element.IsActive === 1) {
          this.destinationInclusions.push(element);
        }
        else if (element.TypeName === "Exclusion" && element.IsActive === 1) {
          this.destinationExclusions.push(element);
        }
      });
    }, (error) => {
      console.log(error);
    });
  }

  GetPackageInclusionExclusion(packageId: number) {
    this._pService.GetPackageInclusionList(packageId).subscribe((data: any) => {
      if (data && data.ID) {
        this.pqId = data.ID;
      }
      if (data.data && data.data.length > 0) {
        if (data.data[0].inclusion && data.data[0].inclusion.length > 0) {
          data.data[0].inclusion.forEach(element => {
            this.packageInclusions.push(element);
          });
        }
        if (data.data[0].exclusion && data.data[0].exclusion.length > 0) {
          data.data[0].exclusion.forEach(element => {
            this.packageExclusions.push(element);
          });
        }
      }
      this.loading = false;
    }, (error) => {
      console.log(error);
      this.loading = false;
    });
  }

  SaveInclusion() {
    if (!this.isClicked) {
      this.loading = true;
      this.isClicked = true;
      if (this.destinationInclusionId.length > 0 && this.destinationExclusionId.length > 0) {
        let operationType: string = "";
        let inclusions: string = this._arrayService.ArrayToStringConvert(this.destinationInclusionId);
        let exclusions: string = this._arrayService.ArrayToStringConvert(this.destinationExclusionId);
        if (this.pqId == undefined) {
          this.pqId = 0;
        }
        if ((this.pqId > 0) && ((this.packageInclusions && this.packageInclusions.length > 0) || (this.packageExclusions && this.packageInclusions.length > 0))) {
          operationType = "update";
        }
        else {
          operationType = "insert";
        }
        this._pService.InsertPackageInclusion(this.pqId, this._cService.packageId, inclusions, exclusions, operationType).subscribe((data: any) => {
          if (data && data.data && data.data.length > 0) {
            this.packageInclusions = [];
            this.packageExclusions = [];
            if (data.data[0].inclusion && data.data[0].inclusion.length > 0) {
              data.data[0].inclusion.forEach(element => {
                this.packageInclusions.push(element);
              });
            }
            if (data.data[0].exclusion && data.data[0].exclusion.length > 0) {
              data.data[0].exclusion.forEach(element => {
                this.packageExclusions.push(element);
              });
            }
          }
          this.loading = false;
          this.isClicked = false;
          alert('Inclusion and Exclusion saved successfully.');          
        }, (error) => {
          console.log(error);
          this.isClicked = false;
          this.loading = false;
        });
      }
      else {
        alert('Please select destination inclusion and exclusion');
        this.isClicked = false;
        this.loading = false;
      }
    }
  }

  // SaveExclusion() {
  //   let operationType: string = "";
  //   let inclusions: string = this._arrayService.ArrayToStringConvert(this.destinationInclusionId);
  //   let exclusions: string = this._arrayService.ArrayToStringConvert(this.destinationExclusionId);
  //   if ((this.packageInclusions && this.packageInclusions.length > 0) || (this.packageExclusions && this.packageInclusions.length > 0)) {
  //     operationType = "update";
  //   }
  //   else {
  //     operationType = "insert";
  //   }
  //   this._pService.InsertPackageInclusion(this._cService.packageId, "", exclusions, operationType).subscribe((data: any) => {
  //     if (data && data.data && data.data.length > 0) {
  //       if (data.data[0].inclusion && data.data[0].inclusion.length > 0) {
  //         data.data[0].inclusion.forEach(element => {
  //           this.packageInclusions.push(element);
  //         });
  //       }
  //       if (data.data[0].exclusion && data.data[0].exclusion.length > 0) {
  //         data.data[0].exclusion.forEach(element => {
  //           this.packageExclusions.push(element);
  //         });
  //       }
  //     }
  //   }, (error) => {
  //     console.log(error);
  //   });
  // }

  DeleteInclusion() {
    if ((this.packageInclusionId && this.packageExclusionId.length > 0) || (this.packageExclusionId && this.packageExclusionId.length > 0)) {
      this.loading = true;
      this._pService.DeletePackageInclusion(0, this._cService.packageId).subscribe((data: any) => {
        if (data && data.data && data.data.length > 0) {
          if (data.data[0].inclusion && data.data[0].inclusion.length > 0) {
            data.data[0].inclusion.forEach(element => {
              this.packageInclusions.push(element);
            });
          }
          if (data.data[0].exclusion && data.data[0].exclusion.length > 0) {
            data.data[0].exclusion.forEach(element => {
              this.packageExclusions.push(element);
            });
          }
        }
        this.loading = false;
      }, (error) => {
        console.log(error);
        this.loading = false;
      });
    }
  }

  PreviousPackageinclusion() {
    $(document).ready(function () {
      $("#packageNav li").removeClass("active");
      $("#packageNav li:nth-child(5)").addClass("active");
    });
    this._router.navigate(['packages/list/form/packagehotel']);
  }

  NextPackageexclusion() {
    $(document).ready(function () {
      $("#packageNav li").removeClass("active");
      $("#packageNav li:nth-child(7)").addClass("active");
    });
    this._router.navigate(['packages/list/form/packagefaq']);
  }

}
