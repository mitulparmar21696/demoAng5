import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PackageService } from '../shared/package.service';
import { Package } from '../shared/package.model';
import { SelectItem } from 'primeng/components/common/selectitem';
import { CommonService } from '../shared/common.service';

@Component({
  selector: 'app-package-listing',
  templateUrl: './package-listing.component.html',
  styleUrls: ['./package-listing.component.css']
})
export class PackageListingComponent implements OnInit {

  private packages: Package[] = [];
  private selectedPackages: Package[];
  private actions: SelectItem[] = [
    { label: 'Active', value: '1' },
    { label: 'Inactive', value: '2' },
    { label: 'Delete', value: '3' },
  ];
  private cols: any[] = [
    { field: 'PackageName', header: 'Packages Name' },
    { field: 'DestinationName', header: 'Destination' },
    { field: 'Day', header: 'Duration' },
    // { field: 'AddedOn', header: 'Added On' },
    // { field: 'Image', header: 'View Photo' },
    { field: 'IsActive', header: 'Status' }
  ];
  private selectedPackageString: string = "";
  private nameId: any;
  private actionStatus: boolean;

  private loading = false;

  constructor(private _router: Router, private _service: PackageService, private _cService: CommonService) { }

  ngOnInit() {
    this.loading = true;
    this.GetPackageList(0);
    this.nameId = '1';
  }

  GetPackageList(destinationId: number) {
    this._service.GetPackageList(destinationId).subscribe((data: any) => {
      this.packages = data.data;
      this.loading = false;
    }, (error) => {
      console.log(error);
      this.loading = false;
    });
  }

  InsertPackage() {
    this._cService.packageId = 0;
    this._service.setter(new Package());
    this.NavigateToForm();
  }

  UpdatePackage(p) {
    this._cService.packageId = p.ID;
    this._cService.destinationId = p.DestinationID;
    this._service.setter(p);
    this.NavigateToForm();
  }

  DeletePackage(p: Package) {
    if (confirm('Are you sure to delete this record?') == true) {
      this.loading = true;
      this._service.DeletePackage(p.ID, p.DestinationID).subscribe((data: any) => {
        this.GetPackageList(0);
      }, (error) => {
        console.log(error);
        this.loading = false;
      });
    }
  }

  CustomAction() {
    //console.log(this.nameId);
    if (this.nameId && this.selectedPackages && this.selectedPackages.length > 0) {
      if (confirm('Are you sure to perform this action?') == true) {
        this.loading = true;
        this.selectedPackages.forEach(element => {
          this.selectedPackageString += element.ID + ",";
        });
        this.selectedPackageString = this.selectedPackageString.length > 0 ? this.selectedPackageString.substring(0, this.selectedPackageString.length - 1) : ""

        if (this.nameId == 1 || this.nameId == 2) {
          if (this.nameId == 1)
            this.actionStatus = true;
          else
            this.actionStatus = false;
          this._service.ActionOperationPackage(this.selectedPackageString, this.actionStatus, "actionstatus").subscribe((data: any) => {
            this.GetPackageList(0);
          }, (error) => {
            console.log(error);
            this.loading = false;
          });
        }
        else if (this.nameId == 3) {
          this._service.ActionOperationPackage(this.selectedPackageString, this.actionStatus, "actiondelete").subscribe((data: any) => {
            this.GetPackageList(0);
          }, (error) => {
            console.log(error);
            this.loading = false;
          });
        }
        else {
          this.loading = false;
          console.log('select valid action');
        }
        this.selectedPackageString = "";
        this.nameId = -1;
      }
    }
    else {
      alert('Please select atleast one tour type');
    }
    this.nameId = '1';
  }

  NavigateToForm() {
    this._router.navigate(['/packages/list/form']);
  }

}
