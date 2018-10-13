import { Component, OnInit, ViewChild } from '@angular/core';
import { Cartype } from '../shared/cartype.model';
import { CartypeService } from '../shared/cartype.service';
import { AleartService } from '../../../core/service/alert.service';
// import { AleartService } from '../../../core/service/alert.service.spec';
import { Router } from '@angular/router';

// import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';

import { environment } from '../../../../environments/environment';
import { SelectItem } from 'primeng/components/common/selectitem';
import { Alert } from 'selenium-webdriver';


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
  loading:any;
  constructor(private _ttService: CartypeService, private _router: Router, private  alert: AleartService) {    
    this.loading=false;
  }

  ngOnInit(): void {
    this.loading=true;
    this.GetCartypeList();    
    this.nameId = '1';
  }
  CustomAction() {
    //console.log(this.nameId);
    // if( this.selectedFTs == null) {
    //   this.aleart.showError("please select the values where you want changes!")
    // }
    if (this.nameId && this.selectedTTs && this.selectedTTs.length > 0) {
      this.alert.confirm("Are you sure you want to perform this action?").then(decision => {
        if((decision && true === decision.value)){
          this.selectedTTs.forEach(element => {
            this.selectedCartypeString += element.ID + ",";
          });
          this.selectedCartypeString = this.selectedCartypeString.length > 0 ? this.selectedCartypeString.substring(0, this.selectedCartypeString.length - 1) : ""
          //console.log(this.selectedTourtypeString);
          
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
      })
    }

    else {
      alert('Please select atleast one car type');
      // this.alert.showInfo('Please select atleast one tour category');
    }
  }
  // CustomAction() {
  //   //console.log(this.nameId);
  //   if (this.nameId && this.selectedTTs && this.selectedTTs.length > 0) {
  //     // this.alert
  //     // .confirm('Are you sure you want to Delete?')
  //     // .then(decision => {
  //     //   if (decision && true === decision.value) {
        
        

  //       this.selectedTTs.forEach(element => {
  //         this.selectedCartypeString += element.ID + ",";
  //       });
  //       this.selectedCartypeString = this.selectedCartypeString.length > 0 ? this.selectedCartypeString.substring(0, this.selectedCartypeString.length - 1) : ""
  //       //console.log(this.selectedCartypeString);


  //       if (this.nameId == 1 || this.nameId == 2) {
  //         if (this.nameId == 1)
  //           this.actionStatus = true;
  //         else
  //           this.actionStatus = false;
  //         this._ttService.ActionStatus(this.selectedCartypeString, this.actionStatus).subscribe((data: any) => {
  //           this.GetCartypeListFromService();
  //         }, (error) => {
  //           console.log(error);
  //         });
  //       }
  //       else if (this.nameId == 3) {
  //         this._ttService.ActionDelete(this.selectedCartypeString).subscribe((data: any) => {
  //           this.GetCartypeListFromService();
  //         }, (error) => {
  //           console.log(error);
  //         });
  //       }
  //       else {
  //         console.log('select valid action');
  //       }
  //       this.selectedCartypeString = "";
  //       this.nameId = -1;


  //   //   }

  //   // })
     


  //   }
  //   else{
  //     alert('Please select atleast one car type');
  //   }
  //   this.nameId = '1';
  // }

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
        this.imageExists(element.Image, function (exists) {
          if (!exists) {
            element.Image = environment.DefaultImageTourtype;
          }
        });
      });
      this.carTypes = data.data;
      this.loading=false;
    }, (error) => {
      this.loading=false;
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
    this._router.navigate(['/manage/cartype/form'])
  }


  UpdateCartype(tt) {
    this._ttService.setter(tt);
    this._router.navigate(['/manage/cartype/form'])
  }

  imageExists(url, callback) {
    var img = new Image();
    img.onload = function () { callback(true); };
    img.onerror = function () { callback(false); };
    img.src = url;
  }
  Status(changeTo, ft: Cartype) {
    this.alert.confirm("Are you sure you want to change the status?").then(decision => {
      if (decision && true === decision.value){
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
    })
    
    

    
  }
}
