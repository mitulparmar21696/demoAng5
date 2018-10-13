import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../shared/common.service';
import { DestinationfaqService } from '../../../tour/tourdestination/shared/destinationfaq.service';
import { Destinationfaq } from '../../../tour/tourdestination/shared/destinationfaq.model';
import { Packagefaq } from '../shared/packagefaq.model';
import { PackagefaqService } from '../shared/packagefaq.service';
import { ArrayToStringService } from '../../../shared/services/ArrayToString.service';


@Component({
  selector: 'app-package-faq',
  templateUrl: './package-faq.component.html',
  styleUrls: ['./package-faq.component.css']
})
export class PackageFaqComponent implements OnInit {

  private destinationFAQs: Destinationfaq[] = [];
  private destinationFAQId: any;

  private packageFAQs: Packagefaq[] = [];
  private packageFAQId: any;

  private fId: number = 0;

  private isClicked: boolean = false;

  private loading = false;

  constructor(private _router: Router
    , private _cService: CommonService
    , private _dService: DestinationfaqService
    , private _pService: PackagefaqService
    , private _arrayService: ArrayToStringService) { }

  ngOnInit() {
    this.loading = true;
    this.GetAllFAQQuestionsList(this._cService.destinationId);
    if (this._cService.packageId > 0) {
      this.GetPackageFAQList(this._cService.packageId);
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

  GetAllFAQQuestionsList(destinationId: number) {
    this._dService.GetDestinationFAQList(destinationId).subscribe((data: any) => {
      data.data.forEach(element => {
        if (element.IsActive && element.IsActive === 1) {
          this.destinationFAQs.push(element);
        }
        //element.IsActive = element.IsActive == 1 ? true : false;
      });

    }, (error) => {
      console.log(error);
    });
  }

  GetPackageFAQList(packageId: number) {
    this._pService.GetPackageFAQList(packageId).subscribe((data: any) => {
      if (data && data.PackageID) {
        this.fId = data.PackageID;
      }
      data.data.forEach(element => {
        element.IsActive = element.IsActive == 1 ? true : false;
      });
      this.packageFAQs = data.data;
      this.loading = false;
    }, (error) => {
      console.log(error);
      this.loading = false;
    });
  }

  SaveAllQuestions() {
    if (!this.isClicked) {
      this.loading = true;
      this.isClicked = true;
      if (this.destinationFAQId && this.destinationFAQId.length > 0) {
        let selectedFAQ: string = this._arrayService.ArrayToStringConvert(this.destinationFAQId);
        let operationType: string;
        if (this.fId == undefined) {
          this.fId = 0;
        }
        if (this.fId > 0 && this.packageFAQs && this.packageFAQs.length > 0) {
          operationType = "update";
        }
        else {
          operationType = "insert";
        }
        this._pService.PackageFAQOPeraions(this._cService.packageId, selectedFAQ, operationType).subscribe((data: any) => {
          if (data && data.PackageID) {
            this.fId = data.PackageID;
          }
          if (data.data && data.data.length > 0) {
            data.data.forEach(element => {
              element.IsActive = element.IsActive == 1 ? true : false;
            });
            this.packageFAQs = data.data;
          }
          this.loading = false;
          this.isClicked = false;
          alert('FAQs saved successfully.');          
        }, (error) => {
          console.log(error);
          this.loading = false;
          this.isClicked = false;
        });
      }
      else {
        alert('Please select atleast one question.');
        this.isClicked = false;
        this.loading = false;
      }
    }
  }

  PreviousPackagefaq() {
    $(document).ready(function () {
      $("#packageNav li").removeClass("active");
      $("#packageNav li:nth-child(6)").addClass("active");
    });
    this._router.navigate(['packages/list/form/packageinclusion']);
  }
  NextPackagefaq() {
    $(document).ready(function () {
      $("#packageNav li").removeClass("active");
      $("#packageNav li:nth-child(8)").addClass("active");
    });
    this._router.navigate(['packages/list/form/packagesupport']);
  }

}
