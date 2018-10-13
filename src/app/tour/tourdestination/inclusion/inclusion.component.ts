import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IsActive } from '../../../shared/models/dd-isactive/IsActive.model';
import { environment } from '../../../../environments/environment';
import { SelectItem } from 'primeng/components/common/selectitem';
import { DestinationInclusion } from '../shared/destinationinclusion.model';
import { DestinationinclusionService } from '../shared/destinationinclusion.service';
import { CommonService } from '../shared/common.service';

@Component({
  selector: 'app-inclusion',
  templateUrl: './inclusion.component.html',
  styleUrls: ['./inclusion.component.css']
})
export class InclusionComponent implements OnInit {

  //selectedDropwdownValue: IsActive = new IsActive(true, "Active");

  private DropdownIsActiveList = [
    new IsActive(true, "Active"),
    new IsActive(false, "Inactive")
  ];

  private DropdownInclsionList = [
    new IsActive(true, "Inclusion"),
    new IsActive(false, "Exclusion")
  ];

  private isActiveId: any;

  private inclusionId: any;

  private inclusions: DestinationInclusion[] = [];

  private inclusion: DestinationInclusion;

  private selectedInclusions: DestinationInclusion[];

  private actions: SelectItem[] = [
    { label: 'Active', value: '1' },
    { label: 'Inactive', value: '2' },
    { label: 'Delete', value: '3' },
  ];

  cols: any[] = [
    { field: 'Name', header: 'Name' },
    { field: 'TypeName', header: 'Inclusion or Exclusion' },
    { field: 'IsActive', header: 'Status' }
  ];

  private isEqualName: boolean = false;

  selectedInclusionString: string = "";
  nameId: any;
  actionStatus: boolean;
  private buttonName: string = "ADD";

  private inclusionExcluson = new DestinationInclusion();

  private loading = false;

  // setter(d: DestinationInclusion) {
  //   this.inclusionExcluson = d;
  // }

  // getter() {
  //   return this.inclusionExcluson;
  // }


  readonly defaultImageUrl = environment.DefaultImageTourtype;

  constructor(private _router: Router, private _iService: DestinationinclusionService
    , private _cService: CommonService) { }

  ngOnInit() {
    this.isActiveId = true;
    this.inclusionId = true;
    this.nameId = '1';
    if (this._cService.destinationId > 0) {
      this.loading = true;
      this.GetInclusionList();
    }
    else {
      $(document).ready(function () {
        $("#destinationNav li").removeClass("active");
        $("#destinationNav li:nth-child(1)").addClass("active");
      });
      this._router.navigate(['tour/tourdestination/form/destination']);
    }
  }

  PreviousInclucion() {
    $(document).ready(function () {
      $("#destinationNav li").removeClass("active");
      $("#destinationNav li:nth-child(2)").addClass("active");
    });
    this._router.navigate(['tour/tourdestination/form/images']);
  }
  NextInclucion() {
    $(document).ready(function () {
      $("#destinationNav li").removeClass("active");
      $("#destinationNav li:nth-child(4)").addClass("active");
    });
    this._router.navigate(['tour/tourdestination/form/faq']);
  }

  CustomAction() {
    //console.log(this.nameId);
    if (this.nameId && this.selectedInclusions && this.selectedInclusions.length > 0) {
      if (confirm('Are you sure to perform this action?') == true) {
        this.loading = true;
        this.selectedInclusions.forEach(element => {
          this.selectedInclusionString += element.ID + ",";
        });
        this.selectedInclusionString = this.selectedInclusionString.length > 0 ? this.selectedInclusionString.substring(0, this.selectedInclusionString.length - 1) : ""

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
          console.log('select valid action');
          this.loading = false;
        }
        this.selectedInclusionString = "";
        this.nameId = -1;
      }
    }
    else {
      alert('Please select atleast one inclusion');
    }
    this.nameId = '1';
  }

  GetInclusionList() {
    this._iService.GetDestinationInclusionList(this._cService.destinationId).subscribe((data: any) => {
      data.data.forEach(element => {
        element.IsActive = element.IsActive == 1 ? true : false;
        element.Type = element.Type == "1" ? true : false;
      });
      this.inclusions = data.data;
      this.loading = false;
    }, (error) => {
      console.log(error);
      this.loading = false;
    });
  }

  DeleteInclusion(tt) {
    if (confirm('Are you sure to delete this record?') == true) {
      this._iService.DeleteDestinationInclusion(tt).subscribe((data: any) => {
        this.loading = true;
        this.GetInclusionList();
      }, (error) => {
        console.log(error);
        this.loading = false;
      });
    }
  }

  SaveInclusionDetails() {
    //this.inclusionExcluson = this.getter();
    this.inclusionExcluson.Type = this.inclusionId;
    this.inclusionExcluson.IsActive = this.isActiveId;
    this.inclusionExcluson.DestinationID = this._cService.destinationId;
    if (this.inclusionExcluson.Name && this.inclusionExcluson.Name.trim() === "") {
      alert('Please enter inclusion name');
    }
    else {
      this.loading = true;
      if (this.inclusionExcluson.ID != undefined && this.inclusionExcluson.ID > 0) {
        this._iService.UpdateDestinationInclusion(this.inclusionExcluson).subscribe((data: any) => {
          data.data.forEach(element => {
            element.IsActive = element.IsActive == 1 ? true : false;
            element.Type = element.Type == "1" ? true : false;
          });
          this.inclusions = data.data;
          this.loading = false;
        }, (error) => {
          console.log(error);
          this.loading = false;
        });
      }
      else {
        if (this.inclusionExcluson.Name && this.inclusionExcluson.Name != "" && this.inclusions && this.inclusions.length > 0) {
          this.inclusions.forEach(element => {
            if (element.Name === this.inclusionExcluson.Name) {
              this.isEqualName = true;
            }
          });
        }
        if (this.isEqualName) {
          this.loading = false;
          alert('Please enter different name');
          this.isEqualName = false;
        }
        else {
          this._iService.InsertDestinationInclusion(this.inclusionExcluson).subscribe((data: any) => {
            data.data.forEach(element => {
              element.IsActive = element.IsActive == 1 ? true : false;
              element.Type = element.Type == "1" ? true : false;
            });
            this.inclusions = data.data;
            this.loading = false;
          }, (error) => {
            console.log(error);
            this.loading = false;
          });
        }
      }
      this.CancelForm();
    }
  }


  UpdateInclusion(incl) {
    //this.setter(incl);
    this.isEqualName = false;
    if (incl.Type === true || incl.Type === 1)
      this.inclusionId = true;
    else
      this.inclusionId = false;
    //this.inclusionId = incl.Type == 1 || true ? true : false;
    if (incl.IsActive === true || incl.IsActive === 1)
      this.isActiveId = true;
    else
      this.isActiveId = false;
    //this.isActiveId = incl.IsActive == 1 || true ? true : false;
    this.inclusionExcluson.Type = this.inclusionId;
    this.inclusionExcluson.Name = incl.Name;
    this.inclusionExcluson.IsActive = this.isActiveId;
    this.inclusionExcluson.ID = incl.ID;
    this.buttonName = "UPDATE";
  }

  CancelForm() {
    this.inclusionExcluson = new DestinationInclusion();
    this.inclusionId = true;
    this.isActiveId = true;
    this.buttonName = "ADD";
  }

}
