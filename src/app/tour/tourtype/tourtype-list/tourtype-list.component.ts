import { Component, OnInit } from '@angular/core';
import { Tourtype } from '../shared/tourtype.model';
import { TourtypeService } from '../shared/tourtype.service';
import { Router } from '@angular/router';

// import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';

import { environment } from '../../../../environments/environment';
import { SelectItem } from 'primeng/components/common/selectitem';


@Component({
  selector: 'app-tourtype-list',
  templateUrl: './tourtype-list.component.html',
  styleUrls: ['./tourtype-list.component.css']
})
export class TourtypeListComponent implements OnInit {

  tourTypes: Tourtype[] = [];
  selectedTTs: Tourtype[];
  actions: SelectItem[] = [
    { label: 'Active', value: '1' },
    { label: 'Inactive', value: '2' },
    { label: 'Delete', value: '3' },
  ];
  cols: any[] = [
    { field: 'Name', header: 'Name' },
    { field: 'Description', header: 'Description' },
    { field: 'Image', header: 'Image' },
    { field: 'IsActive', header: 'Status' }
  ];
  selectedTourtypeString: string = "";
  nameId: any;
  actionStatus: boolean;

  loading = false;

  readonly defaultImageUrl = environment.DefaultImageTourtype;

  constructor(private _ttService: TourtypeService, private _router: Router) {    
  }

  ngOnInit(): void {
    this.loading = true;
    this.GetTourtypeList();    
    this.nameId = '1';
  }

  CustomAction() {
    //console.log(this.nameId);
    if (this.nameId && this.selectedTTs && this.selectedTTs.length > 0) {
      if (confirm('Are you sure to perform this action?') == true) {
        this.loading = true;
        this.selectedTTs.forEach(element => {
          this.selectedTourtypeString += element.ID + ",";
        });
        this.selectedTourtypeString = this.selectedTourtypeString.length > 0 ? this.selectedTourtypeString.substring(0, this.selectedTourtypeString.length - 1) : ""
        //console.log(this.selectedTourtypeString);


        if (this.nameId == 1 || this.nameId == 2) {
          if (this.nameId == 1)
            this.actionStatus = true;
          else
            this.actionStatus = false;
          this._ttService.ActionStatus(this.selectedTourtypeString, this.actionStatus).subscribe((data: any) => {
            this.GetTourtypeListFromService();
          }, (error) => {
            console.log(error);
            this.loading = false;
          });
        }
        else if (this.nameId == 3) {
          this._ttService.ActionDelete(this.selectedTourtypeString).subscribe((data: any) => {
            this.GetTourtypeListFromService();
          }, (error) => {
            console.log(error);
            this.loading = false;
          });
        }
        else {
          console.log('select valid action');
          this.loading = false;
        }
        this.selectedTourtypeString = "";
        this.nameId = -1;
      }
    }
    else{
      alert('Please select atleast one tour type');
    }
    this.nameId = '1';
  }

  GetTourtypeList() {
    this.GetTourtypeListFromService();
  }

  DeleteTourtype(tt) {
    if (confirm('Are you sure to delete this record?') == true) {
      this.loading = true;
      this.DeleteTourtypeFromService(tt);
      //this.GetTourtypeListFromService();
    }
  }

  GetTourtypeListFromService() {
    this._ttService.GetTourtypeList().subscribe((data: any) => {
      //console.log(data.data);
      data.data.forEach(element => {
        element.IsActive = element.IsActive == "True" ? true : false;
        this.imageExists(element.Image, function (exists) {
          if (!exists) {
            element.Image = environment.DefaultImageTourtype;
          }
        });
      });
      this.tourTypes = data.data;
      this.loading = false;
    }, (error) => {
      console.log(error);
      this.loading= false;
    });
  }

  DeleteTourtypeFromService(tt) {
    this._ttService.DeleteTourtype(tt).subscribe((data: any) => {
      this.GetTourtypeListFromService();
    }, (error) => {
      console.log(error);
    });
  }

  InsertTourtype() {
    let tourType = new Tourtype();
    this._ttService.setter(tourType);
    this._router.navigate(['/tour/tourtype/form'])
  }


  UpdateTourtype(tt) {
    this._ttService.setter(tt);
    this._router.navigate(['/tour/tourtype/form']);
  }

  imageExists(url, callback) {
    var img = new Image();
    img.onload = function () { callback(true); };
    img.onerror = function () { callback(false); };
    img.src = url;
  }
}
