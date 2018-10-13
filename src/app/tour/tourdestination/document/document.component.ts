import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DestinationtermsService } from '../shared/destinationterms.service';
import { CommonService } from '../shared/common.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  private tcText: string;

  private loading = false;

  constructor(private _router: Router, private _iService: DestinationtermsService
    , private _cService: CommonService) { }

  ngOnInit() {
    // this.tcText ="<h1><strong>This is Prakash Modi</strong></h1>";
    if (this._cService.destinationId > 0) {
      this.loading = true;
      this.GetDestinationTerms(this._cService.destinationId);
    }
    else {
      $(document).ready(function () {
        $("#destinationNav li").removeClass("active");
        $("#destinationNav li:nth-child(1)").addClass("active");
      });
      this._router.navigate(['tour/tourdestination/form/destination']);
    }
  }

  GetDestinationTerms(id) {
    this._iService.GetDestinationTermsList(id).subscribe((data: any) => {
      if (data.data && data.data.length > 0) {
        this.tcText = data.data[0].Description;
      }
      this.loading = false;
    }, (error) => {
      console.log(error);
      this.loading = false;
    });
  }

  PreviousDocument() {
    $(document).ready(function () {
      $("#destinationNav li").removeClass("active");
      $("#destinationNav li:nth-child(4)").addClass("active");
    });
    this._router.navigate(['tour/tourdestination/form/faq']);
  }

  SaveTermsAndConditions() {
    this.loading = true;
    this._iService.InsertDestinationTerms(this._cService.destinationId, this.tcText).subscribe((data: any) => {
      if (data.status && data.status == 200) {
        if (data.data && data.data.length > 0) {
          this.tcText = data.data[0].Description;
        }
        this.loading = false;
        alert(data.message);
      }
      else {
        this.loading = false;
        alert(data.message);
      }

    }, (error) => {
      console.log(error);
      this.loading = false;
    });
  }

  navigateToDestination() {
    this._cService.destinationId = 0;
    this._router.navigate(['tour/tourdestination']);
  }

}
