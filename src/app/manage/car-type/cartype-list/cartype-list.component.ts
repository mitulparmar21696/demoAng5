import { Component, OnInit, ViewChild } from '@angular/core';
import { Cartype } from '../shared/cartype.model';
import { CartypeService } from '../shared/cartype.service';
/// import { AleartService } from '../../../core/service/alert.service.spec';
import { Router } from '@angular/router';

// import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';

import { environment } from '../../../../environments/environment';
import { SelectItem } from 'primeng/components/common/selectitem';
import { Alert } from 'selenium-webdriver';
import { AleartService } from '../../facility-type/shared/aleart.service';


@Component({
  selector: 'app-cartype-list',
  templateUrl: './cartype-list.component.html',
  styleUrls: ['./cartype-list.component.css']
})
export class CartypeListComponent implements OnInit {
  carTypes: Cartype[] = [];
  selectedTTs: Cartype[];
  actions: SelectItem[] = [
    { label: 'Active', value: '1' },
    { label: 'Inactive', value: '2' },
    { label: 'Delete', value: '3' },
  ];
  cols: any[] = [
    { field: 'Name', header: 'Name' },
    // { field: 'Description', header: 'Description' },
    { field: 'Image', header: 'Image' },
    { field: 'IsActive', header: 'Active?' }
  ];
  selectedCartypeString: string = "";
  nameId: any;
  actionStatus: boolean;

  readonly defaultImageUrl = environment.DefaultImageTourtype;

  constructor(private _ttService: CartypeService, private _router: Router, private  alert: AleartService) {    
  }

  ngOnInit(): void {
    this.GetCartypeListFromService();
    // this.carTypes = this._ttService.getCarTypes();  
    this.nameId = '1';
  }
  CustomAction() {
  
    if (this.nameId && this.selectedTTs && this.selectedTTs.length > 0) {
      if (confirm('Are you sure to perform this action?') == true) {
      this.selectedTTs.forEach(element => {
            this.selectedCartypeString += element.ID + ",";
          });
          this.selectedCartypeString = this.selectedCartypeString.length > 0 ? this.selectedCartypeString.substring(0, this.selectedCartypeString.length - 1) : ""
          
          if (this.nameId == 1 || this.nameId == 2) {
            if (this.nameId == 1)
              this.actionStatus = true;
            else
              this.actionStatus = false;
            this._ttService.ActionStatus(this.selectedCartypeString, this.actionStatus).subscribe((data: any) => {
              this.GetCartypeListFromService();
            }, (error) => {
              console.log(error);
            });
          }
          
          else if (this.nameId == 3) {
            this._ttService.ActionDelete(this.selectedCartypeString).subscribe((data: any) => {
              this.GetCartypeListFromService();
            }, (error) => {
              console.log(error);
            });
          }

          else {
            console.log('select valid action');
          }

          this.selectedCartypeString = "";
          this.nameId = -1;

        } //if ends 
        else {
         console.log('nothing should happen')
        }
        this.nameId = '1';
    }

    else {
      alert('Please select atleast one car type');
    }
  }
  
  GetCartypeList() {
    this.GetCartypeListFromService();
  }

  DeleteCartype(tt) {
    if (confirm('Are you sure to delete this record?') == true) {
      this.DeleteCartypeFromService(tt);
      this.GetCartypeListFromService();
    }
  }

  GetCartypeListFromService() {
    this._ttService.GetCartypeList().subscribe((data: any) => {
      //console.log(data.data);
      data.data.forEach(element => {
        element.IsActive = element.IsActive == "True" ? true : false;
        // this.imageExists(element.Image, function (exists) {
        //   if (!exists) {
        //     element.Image = environment.DefaultImageTourtype;
        //   }
        // });
      });
      this._ttService.setCarTypes(data.data);
      this.carTypes = this._ttService.getCarTypes();
    }, (error) => {
      console.log(error);
    });
  }

  DeleteCartypeFromService(tt) {
    this._ttService.DeleteCartype(tt).subscribe((data: any) => {
      this.GetCartypeListFromService();
    }, (error) => {
      console.log(error);
    });
  }

  InsertCartype() {
    let carType = new Cartype();
    this._ttService.setter(carType);
    this._router.navigate(['/manage/car_type/form'])
  }


  UpdateCartype(tt) {
    this._ttService.setter(tt);
    this._router.navigate(['/manage/car_type/form'])
  }

  imageExists(url, callback) {
    var img = new Image();
    img.onload = function () { callback(true); };
    img.onerror = function () { callback(false); };
    img.src = url;
  }
 
  Status(changeTo, ft: Cartype) {
    if (confirm('Are you sure to perform this action?') == true) {
    console.log(changeTo, ft);
      
         ft.IsActive = changeTo;
         this._ttService.UpdateCartype(ft).subscribe((success:any) => {
           this._ttService.setter(success.data);
           success.data.forEach(element => {
            element.IsActive = element.IsActive == "True" ? true : false;
            this.imageExists(element.Image, function (exists) {
              if (!exists) {
                element.Image = environment.DefaultImageTourtype;
              }
            });
          });
          this.carTypes = success.data;
         });
      }
      else 
      {
        this.GetCartypeListFromService();
        console.log('dont do anything');
      }

    
  }
}
