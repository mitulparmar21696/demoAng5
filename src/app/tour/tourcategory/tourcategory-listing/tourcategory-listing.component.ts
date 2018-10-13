import { Component, OnInit } from '@angular/core';
import { Tourcategory } from '../shared/tourcategory.model';
import { TourcategoryService } from '../shared/tourcategory.service';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { environment } from '../../../../environments/environment';
import { SelectItem } from 'primeng/components/common/selectitem';

@Component({
  selector: 'app-tourcategory-listing',
  templateUrl: './tourcategory-listing.component.html',
  styleUrls: ['./tourcategory-listing.component.css']
})
export class TourcategoryListingComponent implements OnInit {

  selectedTTcs: Tourcategory[];
  actions: SelectItem[] = [
    { label: 'Active', value: '1' },
    { label: 'Inactive', value: '2' },
    { label: 'Delete', value: '3' },
  ];
  cols: any[] = [
    { field: 'Name', header: 'Category Name' },
    { field: 'Description', header: 'Description' },
    { field: 'Image', header: 'Image' },
    { field: 'TourTypeName', header: 'Tour Type' },
    { field: 'IsActive', header: 'Status' }
  ];
  selectedTourCategoryString: string = "";
  nameId: any;
  actionStatus: boolean;

  loading = false;

  readonly defaultImageUrl = environment.DefaultImageTourtype;

  constructor(private _ttcService: TourcategoryService, private _router: Router) {
  }

  ngOnInit() {
    this.loading = true;
    this.GetTourCategoryList();
    this.nameId = '1';
  }

  CustomAction() {
    //console.log(this.nameId);
    if (this.nameId && this.selectedTTcs && this.selectedTTcs.length > 0) {
      if (confirm('Are you sure to perform this action?') == true) {
        this.loading = true;
        this.selectedTTcs.forEach(element => {
          this.selectedTourCategoryString += element.ID + ",";
        });
        this.selectedTourCategoryString = this.selectedTourCategoryString.length > 0 ? this.selectedTourCategoryString.substring(0, this.selectedTourCategoryString.length - 1) : ""
        //console.log(this.selectedTourtypeString);


        if (this.nameId == 1 || this.nameId == 2) {
          if (this.nameId == 1)
            this.actionStatus = true;
          else
            this.actionStatus = false;
          this._ttcService.ActionStatus(this.selectedTourCategoryString, this.actionStatus).subscribe((data: any) => {
            this.GetTourtypeCategoryFromService();
          }, (error) => {
            console.log(error);
            this.loading = false;
          });
        }
        else if (this.nameId == 3) {
          this._ttcService.ActionDelete(this.selectedTourCategoryString).subscribe((data: any) => {
            this.GetTourtypeCategoryFromService();
          }, (error) => {
            console.log(error);
            this.loading = false;
          });
        }
        else {
          console.log('select valid action');
          this.loading = false;
        }
        this.selectedTourCategoryString = "";
        this.nameId = -1;
      }
    }
    else {
      alert('Please select atleast one tour category');
    }
    this.nameId = '1';
  }

  GetTourCategoryList() {
    this.GetTourtypeCategoryFromService();
  }

  DeleteTourtypeCategory(ttc) {
    if (confirm('Are you sure to delete this record?') == true) {
      this.loading = true;
      this.DeleteTourCategoryFromService(ttc);
      //this.GetTourtypeCategoryFromService();
    }
  }

  GetTourtypeCategoryFromService() {
    this._ttcService.GetTourtypeCateoryList().subscribe((data: any) => {
      //console.log(data.data);
      data.data.forEach(element => {
        element.IsActive = element.IsActive == "True" ? true : false;
        this.imageExists(element.Image, function (exists) {
          if (!exists) {
            element.Image = environment.DefaultImageTourtype;
          }
        });
      });
      this._ttcService.tourTypeCats = data.data;     
      this.loading = false;
    }, (error) => {      
      console.log(error);
      this.loading = false;
    });
  }

  DeleteTourCategoryFromService(ttc) {
    this._ttcService.DeleteTourtypeCategory(ttc).subscribe((data: any) => {
      this.GetTourtypeCategoryFromService();
    }, (error) => {     
      console.log(error);
    });
  }

  InsertTourtypeCategory() {
    let tourTypeCategory = new Tourcategory();
    this._ttcService.setter(tourTypeCategory);
    this._router.navigate(['/tour/tourcategory/form'])
  }


  UpdateTourtypeCategory(ttc) {
    this._ttcService.setter(ttc);
    this._router.navigate(['/tour/tourcategory/form'])
  }

  imageExists(url, callback) {
    var img = new Image();
    img.onload = function () { callback(true); };
    img.onerror = function () { callback(false); };
    img.src = url;
  }


}
